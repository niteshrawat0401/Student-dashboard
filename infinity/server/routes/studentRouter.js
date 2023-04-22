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
  },)

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
studentRouter.put("/:id/student", async(req, res)=>{
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

// Checked status
studentRouter.put("/:id/active", async(req, res)=>{
  let {id} = req.params;
  let checkActive = await Student.findOne({ _id :id});
   checkActive.active= checkActive.active ?  false : true;
   checkActive.save()
  try {
    if(checkActive){
      return res.status(200).json({ msg: "Active student", checkActive});
    }  
  } catch (error) {
    return res.status(500).json({ msg: "Try again later", error})
  }
})

// pagination
  // studentRouter.get("/pagination", async(req, res)=>{
  //   const { page= 2, limit= 5} = req.query;
  //   try {
  //     let studenPagi = await Student.find({})
  //     .limit(limit * 1)
  //     .skip((page - 1) * limit )
  //     const total = studenPagi.length;
  //     return res.status(200).json({ msg: "Pagination", total, studenPagi})
  //   } catch (error) {
  //     return res.status(200).json({ msg: "Error while getting data", error})
  //   }
  // })

  studentRouter.get("/pagination", async(req, res)=>{
  // let pageSize= 5;
  // let page= parseInt(req.query.page || 0);
  // let totalData= await Student.countDocuments();
  // let pageFind= await Student.find()
  // .limit(pageSize * 1 ).skip((page - 1) * pageSize);
  // try {
  //   return res.status(201).send({
  //     success: true, totalData: Math.ceil( totalData / pageSize),
  //     pageFind: pageFind
  //   })
  // } catch (error) {
  //   return res.status(401).send({ message: "Data not found" })
  // }

  let pageSize= 5;
  let page= parseInt(req.query.page || 0);
  let totalData= await Student.countDocuments();
  let pageFind= await Student.find()
  .limit(pageSize).skip(pageSize * page);
  try {
    return res.status(201).send({
      success: true, totalData: Math.ceil( totalData / pageSize),
      pageFind: pageFind
    })
  } catch (error) {
    return res.status(401).send({ message: "Data not found" })
  }
})

// studentRouter.get('/pagination', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};

//     results.results = await Student.find({})
//       .sort({ createdAt: -1 })
//       .skip(startIndex)
//       .limit(limit)
//       .exec();

//     if (endIndex < (await Student.countDocuments().exec())) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }

//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }

//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
module.exports = studentRouter