const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

/* Connect to DB */
require('../src/db/conn');  

/* Serve on port */
const port = process.env.PORT || 3000;

/* Require Modules */
const EmployeDetails = require('../src/models/registers');

/* Path Insitlization */
const static_path = path.join(__dirname,"../public");
const templete_path = path.join(__dirname,"../templetes/views");
const partials_path = path.join(__dirname,"../templetes/partials");

/* static web if rount  */
app.use(express.static(static_path));   
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Use as middleware */
app.use(cookieParser());

app.set('view engine','hbs');
app.set('views',templete_path);
hbs.registerPartials(partials_path);

// app.set('views',view_path);
app.get('/',(req,res) => {
    res.render("index");
});

app.get('/myprofile',auth,(req,res) => {
    res.render("myprofile");
});

app.get('/logout',auth, async (req,res) => {
    try {

        const token = req.cookies.jwt;
        // req.user & req.tooken coming from middleware

        /* to logout from single device */
        // req.user.tokens = req.user.tokens.filter((currElem) => {
        //     return currElem.token !== req.token             
        // });

        /* to logout from all devices */
        req.user.tokens = [];

        res.clearCookie("jwt");
        await req.user.save();        
        res.render("login");
        
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Get Registration Form */
// app.get('/register',(req,res) => {
//     res.render("register");
// });

app.get('/login',(req,res) => {
    res.render("login");
});

/* Submit Registration Form */
app.post('/register',async(req,res) => {
    try{
        const addEmp = new EmployeDetails(req.body);
        const token = await addEmp.genrateAuthToken();

        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 300),
            httpOnly:true
        });
        const saveEmp = await addEmp.save();

        res.status(201).render('index');
        // res.status(201).send(saveEmp);
    }catch(e){
        res.status(400).send(e);
    }
});

app.get('/login',(req,res) => {
    res.render("login");
});

/* Check Login Details */
app.post('/login',async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const emp = await EmployeDetails.findOne({email});
        
        const isMatch = await bcrypt.compare(password,emp.password);
        const token = await emp.genrateAuthToken();

        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 30000000),
            httpOnly:true,
        });
        
        if(isMatch){
            return res.render("index");
        }else{
            res.send('invalid username and password');
        }
        
    }catch(e){
        res.status(400).send(e);
    }
});

app.listen(port,() => {
    console.log(`server is running on ${port}`);
});