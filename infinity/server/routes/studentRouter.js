const {Router} = require("express")
const Student = require("../model/student.js");

const studentRouter = Router();

// Post students
studentRouter.post("/student", async(req, res)=>{
  let { name, email, mobile} = req.body;
  let isUniqueEmail = (await Student.countDocuments({ email}) > 0 ? true : false)
  if(isUniqueEmail){
    return res.status(400).json({msg: "Email alredy present", isUniqueEmail})
  }

  let isUniquemobile = (await Student.countDocuments( {mobile} ) > 0? true : false);
  if(isUniquemobile){
    return res.status(400).json({msg: "Mobile no alredy present"})
  }
  let createStudent = await Student.create({
    name,email,mobile
  })

  try {
    if(createStudent){
      return res.status(201).json({ msg: "Student succssfully created", createStudent})
    }
  } catch (error) {
    return res.status(500).json({ msg: "Try again latter", error})
  }
})


module.exports = studentRouter