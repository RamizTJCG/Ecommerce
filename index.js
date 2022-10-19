const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const bcrypt = require('bcryptjs');
const axios = require('axios');


const hbs = require('hbs');
const path = require('path');

/* Path Insitlization */
const static_path = path.join(__dirname,"./public");
const templete_path = path.join(__dirname,"./templetes/views");
const partials_path = path.join(__dirname,"./templetes/partials");

app.set('view engine','hbs');
app.set('views',templete_path);
hbs.registerPartials(partials_path);

/* Use as middleware */
app.use(cookieParser());

/* Connect to DB */
require('./db/conn');  

/* Serve on port */
const port = process.env.PORT || 3000;

/* configure body-parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const { register_route } = require('./routes');

app.use('/', register_route);
app.listen(port,() => {
    console.log(`server is running on ${port}`);
});
