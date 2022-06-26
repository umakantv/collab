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
}

module.exports = config;