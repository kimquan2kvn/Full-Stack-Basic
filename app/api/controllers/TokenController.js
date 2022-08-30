const expriedTimeToken = require('../service/expriedTimeToken');
const moment = require('moment');
const { resOK } = require('../res/responses');

module.exports = {
  refreshToken: async function(req,res) {
    try {
      let id = req.data.id;
      let token = req.data.token;
      if(expriedTimeToken(token.expiresAt)){
        await Token.destroy({userId:id});
        let token = uuidv4();
        await Users.updateOne({id:idUser}).set({
          token: token
        });
        let newToken = {
          userId: idUser,
          token: token,
          createdAt: moment().format('hh:mm:ss a'),
          expiresAt: moment().add(4, 'hours').format('hh:mm:ss a')
        };
        await Token.create(newToken);
        resOK(req,res,'Reftoken')
      }
    } catch (error) {
      console.log(error);
    }
  },
};

