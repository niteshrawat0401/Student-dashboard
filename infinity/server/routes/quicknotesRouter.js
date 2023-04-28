const Quicknotes = require("../model/quicknotes");
const {Router} = require("express");

const quicknotesRouter = Router();

quicknotesRouter.post("/quicknotes", async(req, res)=>{
      const {date, subject, pdf, qna} = req.body;
      let notes = await Quicknotes.find({date: date});
      try {
        if(notes.length == 0){
            let notes = {
                subject : subject,
                pdf : pdf, 
                qna : qna,
            }
            console.log("notes", notes);
            const createNotes = await Quicknotes.create({
              date : date,
              notes : notes
            });
            console.log("add");
            return res.status(201).json({msg: "Note created successfully", createNotes});
        }
        else{
            let note = {
                subject : subject,
                pdf : pdf, 
                qna : qna,
            }
           
        }
      } catch (error) {
        return res.status(500).json({msg: "Error occured while creating a notes", error});
      }
})

module.exports = quicknotesRouter;
