// server/config.js
module.exports = {
    AUTH0_DOMAIN: 'mystocksentiment.auth0.com', // e.g., kmaida.auth0.com
    AUTH0_API_AUDIENCE: 'http://localhost:8083/api/', // e.g., 'http://localhost:8083/api/'
    //MONGO_URI: process.env.MONGO_URI || 'mongodb://[USER]:[PASSWORD]@[DS######].mlab.com:[PORT]/[DB_NAME]'
    MONGO_URI: process.env.MONGO_URI || 'mongodb://dbUser:Pass_2017@localhost:27017/StockDB'
  };