require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoString = process.env.REACT_APP_MONGO_URI
const routes = require('./routes/routes')
const app = express()
const port = 4000

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

app.use('/api', routes);
app.use(express.json());

app.listen(port, () => console.log('Server is running...'))