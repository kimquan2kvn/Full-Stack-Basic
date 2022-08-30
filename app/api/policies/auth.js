/* eslint-disable callback-return */
const { resOK, resErr } = require('../res/responses');
var jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid');
const expriedTimeToken = require('../service/expriedTimeToken');
const auth = async function (req, res, next){

  try {
    const token = req.headers['basic']
    if(token === null) {
      return res.sendStatus(401);
    }
   
    await Users.findOne({token:token}).then(data=>{
      if(!data) {
        resErr(req,res,'Error')
      }
      req.data = data;
      req.token = token;
      console.log(data)
      next();
    }).catch(err=>{
      console.log(err);
    })


  } catch (error) {
    console.log(error)
  }

};

module.exports = auth;

// const authHeader = req.headers['Basic'];
// const token = authHeader && authHeader.split(' ')[1];
// const token = authHeader && authHeader.split(' ')[1];
// console.log(authHeader)
// console.log(token)
// const auth = async function (req, res, next) {
//   try {
//     const newId = uuidv4()
//     console.log(newId)
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token === null) {
//       return res.sendStatus(401);
//     }
//     var id = jwt.verify(token,'sails.config.custom.jwt');
//     var idUser= id._id;
//     await Users.find({_id:idUser}).limit(1).then(data=>{
//       if(!data) {
//         res.json('Error');
//       }
//       req.data = data;
//       req.token = token;
//       next();
//     }).catch(err=>{
//       console.log(err);
//     });
//   }catch(error) {
//     console.log(error)
//   }
// };


