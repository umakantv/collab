const config = require('./../config')
const mongoose = require('mongoose');

async function getConnection() {
    await mongoose.connect(config.DATABASE_URI).then(() => {
        console.log('Database connection is setup.');
    });
}

module.exports = getConnection;