const Quicknotes = require("../model/quicknotes");
const {Router} = require("express");
const multer = require("multer")

const quicknotesRouter = Router();
// const upload = multer();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads') // specify your destination directory here
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

// Post notes
quicknotesRouter.post("/quicknotes",  upload.fields([
    { name: 'pdfFile', maxCount: 1 },
    { name: 'qnaFile', maxCount: 1 },
  ]), async(req, res)=>{
    const { date, subject } = req.body;
  const pdf = req.files['pdfFile'][0].path; // get the path of uploaded pdf file
  const qna = req.files['qnaFile'][0].path; // get the path of uploaded qna file
  try {
    const existingNotes = await Quicknotes.findOne({ date });
    if (existingNotes) {
      existingNotes.notes.push({ subject, pdf, qna });
      const updatedNotes = await existingNotes.save();
      return res.status(201).json({ msg: "Notes updated successfully", updatedNotes });
    } else {
      const newNotes = await Quicknotes.create({
        date,
        notes: [{ subject, pdf, qna }],
      });
      return res.status(201).json({ msg: "Notes created successfully", newNotes });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error occurred while creating notes", error });
  }
    //   const {date, subject } = req.body;
    //   const pdf = req.file['pdfFile'][0].path; // get the path of uploaded file
    //   const qna = req.file['qnaFile'][0].path; // get the path of uploaded file

    //   console.log(pdf, qna);
    //   let notes = await Quicknotes.find({date: date});
    //   try {
    //     if(notes.length == 0){
    //         let notes = {
    //             subject : subject,
    //             pdf : pdf, 
    //             qna : qna,
    //         }
    //         const createNotes = await Quicknotes.create({
    //           date : date,
    //           notes : notes
    //         })
    //         return res.status(201).json({msg: "Note created successfully", createNotes});
    //     }
    //     else{
    //         let note = {
    //             subject : subject,
    //             pdf : pdf, 
    //             qna : qna,
    //         }
    //         const updateNotes = await Quicknotes.findOneAndUpdate({date: date}, {$push: {notes: note}});
    //         console.log(updateNotes);
    //         return res.status(201).json({msg: "Note updated successfully", updateNotes});
    //     }
    //   } catch (error) {
    //     return res.status(500).json({msg: "Error occured while creating a notes", error});
    //   }
})

quicknotesRouter.get("/quicknotes/:date", async(req, res)=>{
    const {date} = req.params;
    let getQuicknotes = await Quicknotes.find({date: date});
    try {
        if(getQuicknotes){
            return res.status(200).json({msg: "Notes get successfully", getQuicknotes});
        }
    } catch (error) {
        return res.status(200).json({msg: "Error occured while getting notes",  error});
    }
})

module.exports = quicknotesRouter;
