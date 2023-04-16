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

// Get students
studentRouter.get("/getStudent", async(req, res)=>{
  let {name, email, mobile} = req.body;
  let getStudents = await Student.find({});
  try {
    if(getStudents){
      return res.status(200).json({ msg: "Successfully student get", getStudents})
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong", error})
  }
})

// Get single data
studentRouter.get("/:id/student", async(req, res)=>{
  let {id} = req.params;
  let payload = req.body;
  const getsingleStudent = await Student.findByIdAndUpdate({ _id: id}, payload);
  try {
    if(getsingleStudent){
      return res.status(200).json({ msg: "Edit data successfully", getsingleStudent})
    }
  } catch (error) {
    return res.status(500).json({ msg: "Try again later", error})
  }
})

// Edit students
studentRouter.patch("/:id/student", async(req, res)=>{
  let {id} = req.params;
  let payload = req.body;
  const editStudent = await Student.findByIdAndUpdate({ _id: id}, payload);
  try {
    if(editStudent){
      return res.status(200).json({ msg: "Edit data successfully", editStudent})
    }
  } catch (error) {
    return res.status(500).json({ msg: "Try again later", error})
  }
})

// Delete students
studentRouter.delete("/:id/student", async(req, res)=>{
  let {id} = req.params;
  const deleteStudent = await Student.findByIdAndRemove({ _id: id});
  try {
    if(deleteStudent){
      return res.status(200).json({ msg: "Delete successfully", deleteStudent})
    }
  } catch (error) {
    return res.status(500).json({ msg: "Try again later", error})
  }
})

module.exports = studentRouter