const { model, Schema } = require("mongoose");

const quicknoteSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    notes: [
      {
        subject: {
          type: String,
          required: true,
        },
        pdf: {
          type: String,
        //   required: true,
        },
        qna: {
          type: String,
          // required : true
        },
      },
    ],
  },
  { timestamps: true }
);

const Quicknotes = model("quickNote", quicknoteSchema);
module.exports = Quicknotes;
