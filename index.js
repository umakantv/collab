const config = require('./config');

const express = require('express');
const getConnection = require('./database');
const userRouter = require('./routes/user');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.use(auth)

app.use(userRouter);

async function serve() {
    await getConnection().catch(err => {
        console.error('Error in connecting database', err.message())
        process.exit(1);
    });

    app.listen(config.PORT, () => {
        console.log(`🚀 Starting listening to http://localhost:${config.PORT}`)
    })
}

serve()