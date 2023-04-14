const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  mobile: {
    type: String,
    // required: true,
  }
},
  { timestamps: true}
  );

const Student = model("student", studentSchema);
module.exports = Student;
