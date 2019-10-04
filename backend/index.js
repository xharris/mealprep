// @flow
const path = require('path');
const express = require('express')

// eslint-disable-next-line no-native-reassign
require = require('esm')(module);
require('dotenv').config()

const helmet = require('helmet') // creates headers to protect from attacks
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors') // allows/disables cross-site communication
const morgan = require('morgan') // logs requests. ok??

const db_heroku = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
}

const db_local = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'test'
    }
}

const whitelist = ['http://localhost:3000','http://localhost:3001']
const corsOptions = {
    origin: (origin, callback) => {
        console.log('origin',origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

var db = require('knex')(db_local)

const main = require('./controllers/ingredient') // db queries
const app = express()


app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // tiny/combined

app.get('/api', (req, res) => res.send('Welcome to mealprep'))
app.get('/api/ingredient', require('./routes/ingredient'))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
});