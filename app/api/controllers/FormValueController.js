const { resOK, resErr } = require("../res/responses");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  saveValueForm: async function (req, res) {
    try {

      const {
        id,
        dataOfWidget,
        typeOfWidget,
        valueOfWidget,
        nameOfSchema,
        listschemas
        
      } = req.body;
      let formId = req.params.id;
      let valueForm = {
        formId: formId,
        listschemas: listschemas
        // listschema:listschema
      };
      await FormValue.create(valueForm);
      resOK(req, res, valueForm);
    } catch (error) {
      console.log(error);
    }
  },
};
