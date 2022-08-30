module.exports = {

  attributes: {
    userId:{
      model:'users',
      // type:'string'
    },

    token:{
      type: 'string',
    },

    createdAt: {
      type: 'string',

    },

    expiresAt: {
      type: 'string'
    }

  }
};
