import { gql } from "@apollo/client";

export const GET_POKEMON_DETAILS = gql`
  query($pokemon: Pokemon!) {
    getPokemonDetailsByName(pokemon: $pokemon, reverse: true, take: 1) {
      num
      species
      flavorTexts {
        game
        flavor
      }
      sprite
      shinySprite
      types
    }
  }
`;
