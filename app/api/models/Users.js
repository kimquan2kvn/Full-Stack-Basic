/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const { resOK, resErr } = require('../res/responses');
// var db = require('sails-mongo');
// const {Schema} = db;

module.exports = {

  attributes: {
    firstName:{
      type: 'string',
      required: true
    },

    lastName:{
      type: 'string',
      required: true
    },

    email:{
      type: 'string',
      required: true,
      unique: true,
    },

    password:{
      type: 'string',
      required: true,
      minLength: 6
    },

    students: {
      collection: 'student',
      via: 'teacher'
    },

    tokens: {
      collection: 'token',
      via: 'userId'
    },

    role:{
      type: 'string',
      required: true
    },

    token:{
      type: 'string',
    },

    verified: {
      type: 'boolean'
    },



  },

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, salt, (err, hash) => {
      if (err) {return next(err);}
      values.password = hash;
      next();
    });
  },

  validPassword: function(password, user, done) {
    bcrypt.compare(password, user.password, (err, matched)=>{
      if(err) {return err;}
      if(matched){
        return done(null,user);
      } else {
        return done(null, false,{code:1, message: 'Incorrect password.'});
      }
    });
  },

  validRegister: function(firstName,lastName,email,password,passwordConfirm) {
    if (!firstName) {
      return resErr(req,res,'Enter Firstname');
    }
    if (!lastName) {
      return resErr(req,res,'Enter Lastname');
    }
    if (!email) {
      return resErr(req,res,'Enter Email');
    }
    if (!password) {
      return resErr(req,res,'Enter Password');
    }
    if (!passwordConfirm) {
      return resErr(req,res,'Enter PasswordConfirm');
    }
    if (password !== passwordConfirm) {
      return resErr(req,res,'Password doesn\'t match');
    }
  }
};

