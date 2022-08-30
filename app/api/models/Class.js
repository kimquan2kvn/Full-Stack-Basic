/**
 * Class.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type:'string',

    },

    students: {
      collection: 'student',
      via: 'classlists'
    }
  },
     
  validParams: function(params) {
    if(!params) {
      return res.json({code: 1, message:'Params Error'});
    }
  }
};

