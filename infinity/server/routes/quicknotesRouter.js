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
quicknotesRouter.post("/quicknotes",  upload.single('pdfFile'), async(req, res)=>{
      const {date, subject,  qna} = req.body;
      const pdf = req.file.path; // get the path of uploaded file
      let notes = await Quicknotes.find({date: date});
      try {
        if(notes.length == 0){
            let notes = {
                subject : subject,
                pdf : pdf, 
                qna : qna,
            }
            const createNotes = await Quicknotes.create({
              date : date,
              notes : notes
            })
            return res.status(201).json({msg: "Note created successfully", createNotes});
        }
        else{
            let note = {
                subject : subject,
                pdf : pdf, 
                qna : qna,
            }
            const updateNotes = await Quicknotes.findOneAndUpdate({date: date}, {$push: {notes: note}});
            console.log(updateNotes);
            return res.status(201).json({msg: "Note updated successfully", updateNotes});
        }
      } catch (error) {
        return res.status(500).json({msg: "Error occured while creating a notes", error});
      }
})

quicknotesRouter.get("/quicknotes", async(req, res)=>{
    const {date} = req.body;
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
