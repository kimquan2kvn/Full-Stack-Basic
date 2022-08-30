/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
const { beforeCreate } = require('../models/Users');
const auth = require('../policies/auth');
const { resOK, resErr } = require('../res/responses');
const nodemailer = require('nodemailer')
const {v4 : uuidv4} = require('uuid')
const moment = require('moment');
const {sendEmail} = require('../service/sendEmail');
const expriedTimeToken = require('../service/expriedTimeToken');

module.exports = {

  
  checkAuth: function (req, res) {
    try {
      const user = req.data;
      if(user) {
        resOK(req,res,user);
      }
			return res.status(400).json({ success: false, message: 'User not found' });
    } catch (error) {
      console.log(error);
    }
  },

  login: async function (req, res) {

    await Users.findOne({ email: req.body.email }).then(user => {
      if(user.verified === true) {
        let idUser = user.id;
        let token = uuidv4();
        Users.validPassword(req.body.password, user, async(err, valid) => {
          if (err) {
            return resErr(req,res,'Forbidden');
          }
          if (!valid) {
            return resErr(req,res,'Invalid username or password');
          }
          else {
            await Users.updateOne({id:idUser}).set({
              token: token
            })
            let newToken = {
              userId: idUser,
              token: token,
              createdAt: moment().format("hh:mm:ss a"),
              expiresAt: moment().add(4, 'hours').format('hh:mm:ss a')
            }
            await Token.create(newToken)
            res.status(200).json({ code: 0 , message: 'Success', token: newToken});
            
            

            // var token = jwt.sign({_id:id}, 'sails.config.custom.jwt', { expiresIn: '1h' });
            // let id = jwt.verify(token,'sails.config.custom.jwt');
            // let idUser= id._id;
            //}
            //  res.cookie('access_token', token, {
            //    httpOnly: true,
            // }) 
          }
        });
      } else {
        // resErr(req,res,'Check email to verified user');
        resErr(req,res,'Email does not exist, pls register');
      }
    }).catch(err => {
      resErr(req,res,'Email does not exist, pls register');
      console.log(err);
    });
  },

  logout: async function (req,res) {
    try {
      let id = req.data.id;
      await Users.updateOne({id:id}).set({
        token: ''
      });
      await Token.destroy({userId:id});
      resOK(req,res,'Logout');
    } catch (error) {
      console.log(error)
    }
  },

  register: async function (req, res) {
    try {
      await Users.findOne({ email: req.body.email }).then(result => {
        if (result) {
          resErr(req,res,'Email already exist');
        }
      }); 
      const { firstName, lastName, email, password,passwordConfirm } = req.body;
      Users.validRegister(firstName,lastName,email,password,passwordConfirm );
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role:'teacher',
        verified: true,
      };
      // await mailer.sendMail(email);   
      await Users.create(newUser);

      // await sendEmail(email,newUser._id);

      resOK(req,res,newUser);
    } catch (error) {
      console.log(error);
    }


  },


  listusers: async function (req, res) {
    try {
      await Users.find({}).populate('students').then(user=>{
        if(user){
          resOK(req,res,user);
        }
        else{
          resErr(req,res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  useractive: async function(req,res) {
    try {
      let userId = req.params.id
      const data = await Users.updateOne({id:userId}).set({
        verified: true,
      })
      resOK(req,res,data)
    } catch (error) {
      console.log(error)
    }
  }

};
