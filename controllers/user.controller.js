const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup function
function signUp(req, res) {

    //here password save as plain text

    // const user = {
    //     name: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    //
    // models.User.create(user).then(result => {
    //     res.status(201).json({
    //         message: 'User created successfully',
    //         userId: result.id
    //     });
    // }).catch(error=> {
    //     res.status(500).json({
    //         message: 'Something went wrong',
    //         error: error
    //     });
    // });

    //findOne -> we can check whether user alredy exist
    models.User.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message: 'Email already exists'
            });
        }else{
            //for hasing password
            bcrypt.genSalt(10, function(err,salt) {                          //function to genrate salt :> genSalt 10 -> no of rounds ; function()-> callback function
                bcrypt.hash(req.body.password, salt, function(err, hash){                    //hashing password with salt
                    const user = {
                        name: req.body.username,
                        email: req.body.email,
                        password: hash                                      // hashed password
                    }
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: 'User created successfully',
                            userId: result.id
                        });
                    }).catch(error=> {
                        res.status(500).json({
                            message: 'Something went wrong',
                            error: error
                        });
                    });
                });
            });         
        }             
    }).catch(error=> {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}
    

//login function
function login(req, res){
    models.User.findOne({where:{email:req.body.email}}).then(user=>{                                            // first check user exist with the email
        if(user === null){
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }else{
            bcrypt.compare(req.body.password, user.password, function(err, result){                              //compare -> compare password
                if(result){                                                                                      // first argument -> password entered by the user, second argument -> hashed password
                    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_KEY, function(err, token){             //JWT_KEY from nodemon.json, env
                        res.status(200).json({
                            message: 'Logged in successfully',
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: 'Invalid credentials'
                    });
                }
            });
        }
    }).catch(error =>{
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    });
}

module.exports ={
    signUp: signUp,
    login: login
}