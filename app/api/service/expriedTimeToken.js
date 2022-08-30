const moment = require('moment');
const { resOK } = require('../res/responses');

module.exports = {
  expriedTimeToken: async (expiresAt) => {
    try {
      const timeNow = moment().format('hh:mm:ss a');
      if(timeNow = expiresAt) {
        await Users.updateOne({id:idUser}).set({
          token: ''
        });
        return true
      }
    } catch (error) {
      console.log(error);
    }
  }
};
