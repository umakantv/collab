const dotenv = require('dotenv')

const NODE_ENV = process.env.NODE_ENV || 'dev'

dotenv.config({
    path: `./environment/${NODE_ENV}.env`
})

/**
 * App-wide configuration, mostly loaded from ENV variables
 */
const config = {
    PORT: process.env.PORT,
    DATABASE_URI: process.env.DATABASE_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
}

module.exports = config;