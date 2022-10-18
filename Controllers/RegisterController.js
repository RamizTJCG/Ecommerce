const User = require('../models/User');

const RegisterController = {

     /* get all users */
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

};

module.exports = RegisterController; 