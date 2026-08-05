require('dotenv').config();
const express = require('express');
const logger = require('morgan');
// const multer = require('multer')
// const upload = multer()
const passport = require('passport');

const app = express(); 

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(passport.initialize());

require('./app/auth/passport')


app.use(require('./app/auth/routes'))

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
}) 
