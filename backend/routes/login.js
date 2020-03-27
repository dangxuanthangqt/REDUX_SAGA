var express = require('express');
var router = express.Router();
require('dotenv').config()
var modelUsers = require('../model/model_users')
var bcrypt = require('bcrypt')
var tokenList={};
var jwtHelper = require('../Helpers/jwt.helper')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
/* GET users listing. */
router.post('/', async (req, res, next)=> {
 var email = req.body.email;
 var password = req.body.password;
 modelUsers.findOne({email}).then(
     (user)=>{
         if(!user){
             return res.status(404).json({
                 message: "User doesn't exist !"
             })
         }else{
            bcrypt.compare(password, user.password).then(
               async (isMatch)=>{
                    if(isMatch){
                        var dataInToken ={
                            _id: user._id,
                            email: user.email
                        }
                        try{ 
                            const accessToken = await jwtHelper.generateToken(dataInToken,accessTokenSecret, parseInt(accessTokenLife))
                           // console.log(accessToken)
                            const refreshToken = await jwtHelper.generateToken(dataInToken, process.env.REFRESH_TOKEN_SECRET, parseInt(process.env.REFRESH_TOKEN_LIFE));
                            tokenList[refreshToken] = {dataInToken};
                          //  console.log(tokenList);
                            res.send({
                                accessToken,
                                refreshToken
                            })
                
                        }catch(err){
                            res.status(500).send(err);
                        }


                    }else{
                        return res.status(400).json({
                            message:"Password incorrect !"
                        })
                    }
                }
            )
         }

     }
 )
    
    
        
    
     
  

 


});

module.exports = router;