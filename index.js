const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/* Connect to DB */
require('./db/conn');  

const app = express();

/* configure body-parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const {test} = require('./routes/register');



