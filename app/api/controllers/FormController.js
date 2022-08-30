/* eslint-disable camelcase */
const { resOK, resErr } = require('../res/responses');
const {v4 : uuidv4} = require('uuid');
const moment = require( 'moment');


module.exports = {

  createForm: async function (req, res) {
    try {
      const { name,desc,listschema,nameOfSchema,typeOfWidget } = req.body;
      let newForm = {
        name: name,
        desc: desc,
        listschema: listschema,
      }
      // const { name,desc,datawidget,label,typewidget,valuewidget } = req.body;
      // let newForm = {
      //   name: name,
      //   desc: desc,
      //   date: moment().format("MMMM Do YYYY"),
      //   listschema: [{
      //     id: uuidv4(),
      //     datawidget: datawidget,
      //     label: label,
      //     widget: [{
      //       typewidget:typewidget,
      //       valuewidget:valuewidget
      //     }]
      //   }]
      // };
      await Form.create(newForm);
      resOK(req,res,newForm);
    } catch (error) {
      console.log(error);
    }
  },


  listForm: async function (req, res) {
    try {
      await Form.find({}).then(forms=>{
        if(forms){
          resOK(req,res,forms);
        }
        else{
          resErr(req,res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteForm: async function(req,res) {
    try {
      let formId = req.params.id;
      let result=await Form.destroyOne({_id:formId});
      if(result){
        return resOK(req,res, result);
      }else{
        return resErr(req,res,'Data not found');
      }
    } catch (error) {
      console.log(error)
    }
  },

  findForm: async function(req,res) {
    try {
      let formId = req.params.id;
      await Form.find({id:formId}).then(form=> {
        if(form) {
          resOK(req,res,form)
        }
        else{
          resErr(req,res,'Error')
        }
      })
    } catch (error) {
      console.log(error)
    }
  },

  // updateForm: async function(req,res) {
  //   let formId = req.params.id;
  //   await Form.updateOne({id:formId}).set({})
  // }
};
