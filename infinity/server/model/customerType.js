const { model, Schema } = require("mongoose");

const customerProSchema = new Schema({
  productType: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  IssueDescription: {
    type: String,
    required: true,
  },
  policyUpload: {
    type: String,
    // required: true,
  },
});

const Customer = model("custproduct", customerProSchema);
module.exports = Customer;
