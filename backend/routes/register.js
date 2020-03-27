var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
var isAuth = require('../middleware/AuthMiddleware')
var modelUsers = require('../model/model_users')
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  var password = req.body.password;
  var user ={
      email : req.body.email,
      password : req.body.password
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
        
        user.password = hash;
        var data = new modelUsers(user);
        data.save().then(()=>{
            res.json({
                message:"Register user successfully!"
            })
        }).catch((err)=>{
            res.status(500).json({
                message:"Register user fail!",
                err
            })
        })
        
    })})


 
});
router.post('/check-exist-account',(req, res, nex)=>{
   
    var email = req.body.email;
    modelUsers.findOne({email:email}).then((data)=>{
        console.log(data);
        if(data === null){
            res.send("You can use this email !")
           
        }else{
            res.status(400).send("Account does exist");
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send("fail")
    })
})

module.exports = router;
