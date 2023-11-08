const { formRegister } = require("../controllers/formController");
const { response } = require("../utils");

module.exports = {
  formRegister:async(req,res)=>{
    const form=req.body;
    const result = await formRegister(form);
    response(res,200,result);
  }
};