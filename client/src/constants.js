const dev = {
  REDIRECT_URL: "http://localhost:3000/postAuth",
};

const prod = {
  REDIRECT_URL: "https://pokepokebp.netlify.app/postAuth",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
