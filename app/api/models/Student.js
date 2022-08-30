/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const { resOK, resErr } = require('../res/responses');
module.exports = {

  attributes: {
    name:{
      type: 'string',
      required: true
    },

    classroom:{
      type:'string',
      columnType:'array'
    },

    birthday:{
      type:'string',
      required: true
    },

    city:{
      type:'string',
      required: true
    },

    file:{
      type:'string',
    },

    district:{
      type:'string',
      required: true
    },

    village:{
      type:'string',
      required: true
    },

    role:{
      type: 'string',
      required: true
    },

    teacher: {
      model:'users'
    },

    classlists:{
      collection: 'class',
      via: 'students'
    }

  },
  validParams: function(params) {
    if(!params) {
      return res.json({code: 1, message:'Params Error'});
    }
  },

  validStudent: function(name,birthday,city, district, village) {
    if(!name || !birthday || !city || !district || !village) {
      return resErr(req,res,'Add Information!,pls');
    }
  }
};

