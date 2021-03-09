const express = require('express')
const app = express()
const port = process.env.PORT || 3001

var bodyParser = require('body-parser')
const handleErrors = require('./middleware/handleErrors');
const { BadRequest, NotFound } = require('./utils/errors');
var cors = require('cors')

const mongoose = require('mongoose');
// require('dotenv').config()

//Connect to MongoDB
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.hlkjo.mongodb.net/pokemon-adoption-db?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

//Model Mongo document (User)
const User = mongoose.model('User',
 { 
    email: String,
    pokemon: [{
        name: String,
        nickname: String,
        shiny: Boolean,
        health: Number,
        adopted: {
            type: Date,
            default: Date.now
        }
    }],
    startDate: {
        type: Date,
        default: Date.now
    },
    expenses: {
        type: Array,
        default: [0]
    },
    items: [{
      item: String,
      character: String,
      unicodeValue: String,
      value: Number,
      dateGiven: Date,
      pokemon: {
          type: String,
          default: "__open__"
      }
    }]
 }
);

app.use(bodyParser.json());

var corsOptions = {
    methods: "GET, POST"
}
app.use(cors(corsOptions));

//Calculate currency remaining from info 
const calculateRemainingCurrency = (startDate, expenses) => {
    const reducer = (accum, currentValue) => accum + currentValue;
    let difference = Math.floor((Date.now() - startDate) / (1000*24*60*60))
    let currencyRemaining = 200 + (50*difference) - expenses.reduce(reducer)
    return currencyRemaining;
}

//Calculate pokemon health
const calculatePokemonHealth = (items, adopted) => {

    let initialHealthDifference = 10 + Math.floor((Date.now() - adopted) / (1000*60*60))

    let accumTotal = 0;
    if (items.length > 0) {
        const currentTotals = items.map((item) => {
            let difference = Math.floor((Date.now() - item.dateGiven) / (1000*60*60))
            return (item.value - difference)
        })
    
        const reducer = (accum, currentValue) => accum + currentValue;
        let currentTotal = currentTotals.reduce(reducer);
        accumTotal += currentTotal
    }
    return accumTotal + initialHealthDifference
}

//Create New User or return user if exists
app.post('/createUser', (req, res) => {
    User.find({email: req.body.email}, (err, users) => {
        try {
            if (err) throw new BadRequest("Database error");

            //If user exists
            if (users.length > 0) {
                res.send(users[0]);
            } else {
                const newUser = new User({ email: req.body.email });
                newUser.save().then((user) => {
                    res.send(user)
                }).catch(() => {
                    throw new BadRequest("Database error");
                });
            }
        } catch (err) {
            next(err)
        }
        
    });
})

//Add pokemon to user
app.post('/adoptPokemon', (req, res, next) => {
    let pokemon = {
        name: req.body.species,
        nickname: req.body.nickname,
        shiny: false,
        items: {
            item: "defaultHealthItem",
            value: 10
        }
    }

    User.find({email: req.body.email}, (error, users) => {
        try {
            //If user exists
            if (users.length > 0) {
                //If user has enough currency
                let currencyRemaining = calculateRemainingCurrency(users[0].startDate, users[0].expenses)
                if (currencyRemaining >= 50) {
                    User.updateOne({ email: req.body.email }, { $push: {pokemon: pokemon, expenses: 50}}, (error, pokemon) => {
                        try {
                            if (error) throw new BadRequest("Database error");
                            else if (pokemon.nModified === 0) {
                                console.log("ok")
                                throw new BadRequest("No changes made");
                            } else {
                                res.send(pokemon)
                            }
                        } catch (err) {
                            next(err)
                        }
                    })
                } else {
                    throw new BadRequest(`Not enough funds`);
                }
            } else {
                throw new NotFound(`User with email ${req.body.email} not found`);
            }
        } catch (err) {
            next(err)
        }
    })
})

//View user's pokemon
app.post('/viewPokemon', (req, res, next) => {
    User.findOne({email: req.body.email}, (error, user) => {
        try {
            //If user exists
            if (user) {
                res.send(user.pokemon)
            } else {
                throw new NotFound(`User with email ${req.body.email} not found`);
            }
        } catch (err) {
            next(err)
        }

    })
})

//View user's single pokemon
app.post('/viewSinglePokemon', (req, res, next) => {
    User.findOne({email: req.body.email}, (error, user) => {
        try {
            //If user exists
            if (user) {
                let single = user.pokemon.filter((pokemon) => {
                    return pokemon._id.toString() === req.body.id
                })
                let pokemonHeldItems = null;
                if (user.items) {
                    pokemonHeldItems = user.items.filter((item) => item.pokemon === req.body.id);
                }
                let health = calculatePokemonHealth(pokemonHeldItems, single[0].adopted)
                single[0]["health"] = health
                console.log(single[0]);
                res.send(single);
            } else {
                throw new NotFound(`User with email ${req.body.email} not found`);
            }
        } catch (err) {
            next(err)
        }

    })
})

//View user's current currency
app.post('/viewCurrency', (req, res, next) => {
    User.find({email: req.body.email}, (error, users) => {
        try {
            if (users.length > 0) {
                let currencyRemaining = calculateRemainingCurrency(users[0].startDate, users[0].expenses)
                res.send({
                    currency: currencyRemaining
                })
            } else {
                throw new NotFound(`User with email ${req.body.email} not found`);
            }
        } catch (err) {
            next(err)
        }
    })
})

//Add item to user
app.post('/addItem', (req, res, next) => {
    let item = {
      item: req.body.item,
      character: req.body.character,
      unicodeValue: req.body.unicodeValue,
      value: req.body.value,
    }

    User.find({email: req.body.email}, (error, users) => {
        try {
            //If user exists
            if (users.length > 0) {
                //If user has enough currency
                let currencyRemaining = calculateRemainingCurrency(users[0].startDate, users[0].expenses)
                if (currencyRemaining >= item.value) {
                    User.updateOne({ email: req.body.email }, { $push: {items: item, expenses: item.value}}, (error, items) => {
                        try {
                            if (error) throw new BadRequest("Database error");
                            else if (items.nModified === 0) {
                                console.log("ok")
                                throw new BadRequest("No changes made");
                            } else {
                                res.send(items)
                            }
                        } catch (err) {
                            next(err)
                        }
                    })
                } else {
                    throw new BadRequest(`Not enough funds`);
                }
            } else {
                throw new NotFound(`User with email ${req.body.email} not found`);
            }
        } catch (err) {
            next(err)
        }
    })
})

//View user's items
app.post('/viewItems', (req, res, next) => {
    User.findOne({email: req.body.email}, (error, user) => {
        try {
            //If user exists
            if (user) {
                let openItems = user.items.filter((item) => item.pokemon === "__open__")
                res.send(openItems)
            } else {
                throw new NotFound(`User with email ${req.body.email} not found`);
            }
        } catch (err) {
            next(err)
        }

    })
})

//Add item to pokemon
app.post('/giveItem', (req, res, next) => {

    User.updateOne(
        { "email" : req.body.email, "items._id": req.body.itemID }, 
        { "$set": { "items.$.dateGiven": Date.now(),  "items.$.pokemon": req.body.pokemonID}}, 
        function(err, user) {
          res.send(user);
      })
      
})

app.use(handleErrors);

//Configure app
app.listen(port, () => {
    console.log("we running baby");
})
