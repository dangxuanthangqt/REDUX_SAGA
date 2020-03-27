var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/AuthMiddleware');
var jwtHelper = require('../Helpers/jwt.helper');
require('dotenv').config();
var refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ;
var accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
var accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
/* GET users listing. */
router.post('/', async (req, res, next) => {
    
  var refreshTokenFromClient = req.body.refreshToken;
  //console.log(refreshTokenFromClient);
        if(refreshTokenFromClient){
            try{
                const decode = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
                const dataToken =decode.data;
                const accessToken = await jwtHelper.generateToken(dataToken, accessTokenSecret, parseInt(accessTokenLife));
                res.status(200).send(accessToken);
                
            }catch(e){
                res.status(403).json({
                    message: "Refresh Token invalid !"
                })
            }
        }else {
            res.status(403).json({
                message:"No refresh token provided !"
            })
        }
            
});

module.exports = router;