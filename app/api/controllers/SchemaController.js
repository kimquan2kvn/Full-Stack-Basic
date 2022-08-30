/* eslint-disable camelcase */
const { resOK, resErr } = require('../res/responses');
const {v4 : uuidv4} = require('uuid');
const moment = require( 'moment');


module.exports = {

  createSchema: async function (req, res) {
    try {
      const { nameOfSchema,typeOfWidget,valueOfWidget } = req.body;
      let newSchema = {
        nameOfSchema: nameOfSchema,
        typeOfWidget: typeOfWidget,
        valueOfWidget: [valueOfWidget],
      };
      await Schema.create(newSchema);
      resOK(req,res,newSchema);
    } catch (error) {
      console.log(error);
    }
  },


  listSchema: async function (req, res) {
    try {
      await Schema.find({}).then(schemas=>{
        if(schemas){
          resOK(req,res,schemas);
        }
        else{
          resErr(req,res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
