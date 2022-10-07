const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todos = require('./routes/todo');
const signUp = require('./routes/signUp');
const signIn = require('./routes/signIn');

const app = express();
require('dotenv').config()
const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use('/', todos);
app.use('/signup', signUp);
app.use('/signin', signIn);

mongoose.connect(connection_string)
    .then(() => console.log("DB connection established"))
    .catch((error) => console.error("DB connection failed: ", error.message))

app.listen(port, () => console.log(`Server running on ${port}`));