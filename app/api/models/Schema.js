module.exports = {
  attributes: {
    nameOfSchema:{
      type:'string',
    },

    typeOfWidget: {
        type: 'string'
    },

    valueOfWidget: {
        type:'json',
        columnType:'array'
    }
  }
};
