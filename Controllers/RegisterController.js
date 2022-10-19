
const Register = require('../models/registers');
const bcrypt = require('bcryptjs');



const RegisterController = {

     /* get all users */
    async home(req, res) {
        try {
            res.render("index");
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
       
    },
    async login(req, res) {
        try {
            res.render("login");
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
       
    },
    async register(req, res) {
        try {
            res.render("register");
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
       
    },
    /* Submit Registration Form */
    async registerSubmit(req,res) {
        try{
            const addEmp = new Register(req.body);
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
    },
    async loginSubmit(req, res) {
        try{
            const email = req.body.email;
            const password = req.body.password;
            const emp = await Register.findOne({email});

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
    },
    async logout(req,res){
        try {
            console.log(req);
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

            res.redirect('/login');
            // res.render("login");
            
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = RegisterController; 