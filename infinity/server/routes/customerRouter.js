const {Router} = require("express")
const Customer = require("../model/customerType.js");

const customerRouter = Router();

const issueType = {
  "Mobile Phone": ["Broken Screen", "Faulty Camera", "Overheating Issue"],
  "TV": ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"],
  "Refrigerator": ["Panel Controls Broken", "Compressor Not Working", "Unable To Turn On"],
  "Washing Machine": ["Water overflowing", "Motor not working"]
};

customerRouter.post("/create", async(req, res)=>{
  const { productType, issueType, IssueDescription, policyUpload} = req.body;

  const customerCreate = await Customer({ productType, issueType, IssueDescription, policyUpload });
  customerCreate.save()
  try {
    if(customerCreate){
      return res.status(201).json({msg : "Created successfully", customerCreate})
    }  
  } catch (error) {
    return res.status(500).json({msg : "Try after sometime", error})
  }
  
})

module.exports = customerRouter