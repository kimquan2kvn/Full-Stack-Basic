/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const { url } = require('inspector');
const { resOK, resErr } = require('../res/responses');

module.exports = {
  listStudent: function (req,res){
    try {
      if(req.data.role === 'teacher'){
        Student.find({teacher: req.data.id}
          // {teacher: req.data.id},(err,student)=>{
        //   if(err){
        //     return resErr(req,res,'Server Error');
        //   }
        //   return resOK(req,res,student);
        // }
        ).populate('classlists').then(user=>{
          let listIdClass = user[0].classlists.map(Class=>{
            return Class.id;
          });
          user.classroom = listIdClass;

          resOK(req,res,user);
        });

      }else {
        resErr(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  searchInfo: async function(req,res) {
    try {
      if( req.data.role === 'teacher'){
        // let {name_search,classroom_search,city_search,district_search,village_search,birthday_search}= req.query;
        name_search = req.query.name;
        city_search = req.query.city;
        district_search = req.query.district;
        village_search = req.query.village;
        birthday_search = req.query.birthday;
        await Student.find({
          where: {
            birthday:birthday_search,
            // classroom: classroom_search,
            name: name_search,
            city:city_search,
            district:district_search,
            village:village_search
          }
        }).then(data=>{
          resOK(req,res, data);
        }).catch(err=>{
          resErr(req,res,err);
        });
      }else{
        resErr(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  createStudent:async function(req,res){
    try {
      // let nameClass = req.params.nameClass;
      // let classid = await Class.findOne({name: nameClass})
      if(req.data.role === 'teacher') {
        const{name,birthday,city,district,village} = req.body;
        Student.validStudent(name,birthday,city,district,village);
        let newStudent = {
          teacher: req.data.id,
          // classroom: classid,
          name: name,
          birthday : birthday,
          city :  city,
          district : district,
          village : village,
          role: 'student',
          file:'',
        };
        console.log(typeof(classroom));
        await Student.create(newStudent);
        resOK(req,res,newStudent);
      }
      else {
        resErr(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  editStudent: async function(req,res){
    try {
      if(req.data.role === 'teacher') {
        let studenId = req.params.id;
        Student.validParams(studenId);
        data = await Student.updateOne({id:studenId}).set({
          name: req.body.name,
          classroom : req.body.classroom,
          birthday : req.body.birthday,
          city :  req.body.city,
          district : req.body.district,
          village : req.body.village
        });
        resOK(req,res,data);
      }
      else {
        resErr(req,res);
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteStudent : async (req,res)=>{
    try{
      let studenId = req.params.id;
      Student.validParams(studenId);
      if(req.data.role === 'teacher'){
        let result= await Student.destroyOne({_id:studenId});
        if(result){
          return resOK(req,res, result);
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

  uploadAvatar: function (req, res) {
    let studenId = req.params.id;
    Student.validParams(studenId);
    req.file('file').upload({
      maxBytes: 10000000,
      dirname:'../../assets/images'
    },function whenDone(err, upload) {
      if (err) {
        return res.serverError(err);
      }
      if (upload.length === 0){
        return resOK(req,res);
      }
      const uploaded = upload[0].fd.split('\\');
      const fileName= uploaded[6];
      console.log(uploaded);
      console.log(fileName);
      var baseUrl = sails.config.custom.baseUrl;
      const urlAvatar =  require('util').format('%s%s', baseUrl, fileName);
      Student.update(studenId, {
        //file: upload[0].fd
        file: urlAvatar
      }).exec((err) => {
        if (err) {return  resErr(req,res,err);}
        res.json({code:0,message:'success',data:urlAvatar,studenId:studenId});
      });
    });
  },

  addClass: async function(req,res) {
    try {
      let studenId = req.params.id;
      Student.validParams(studenId);
      let classroom1 = req.body.classroom;
      let classid = await Class.findOne({name: classroom1});
      let Idclass = classid.id;
      await Student.addToCollection(studenId, 'classlists').members(Idclass);
      resOK(req,res);
    } catch (error) {
      console.log(error);
    }
  }
};

