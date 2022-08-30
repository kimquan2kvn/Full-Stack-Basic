/**
 * ClassController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { resOK, resErr } = require('../res/responses');

module.exports = {
  listClass: async (req, res) => {
    try{
      let idClass = req.params.id;
      const classList = await Class.findOne({id:idClass}).populate('students');
      resOK(req,res,classList);
    }catch(err ) {
      console.log(err);
    }
  },

  createClass:async function(req,res){
    try {
      if(req.data.role === 'teacher') {
        let newClass = {
          name: req.body.name,
        };
        await Class.create(newClass);
        resOK(req,res);
      }else {
        resErr(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  editClass: async function(req,res) {
    try {
      let classID = req.params.id;
      Class.validParams(classID);
      if( req.data.role === 'teacher') {       
        await Class.updateOne({id:classID}).set({
          name: req.body.name,
        });
        resOK(req,res);
      }
      else {
        resErr(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },


  deleteClass : async (req,res)=>{
    try{
      let classID = req.params.id;
      Class.validParams(classID);
      if(req.data.role === 'teacher'){
        let result = await Class.destroyOne({_id : classID});
        if(result){
          return resOK(req,res);
        }else{
          return resErr(req,res,'Data not found');
        }
      }
      else{
        resErr(req,res,'Not permission!');

      }
    }catch(error){
      console.log(error);
    }
  },
};

