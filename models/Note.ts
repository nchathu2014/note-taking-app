import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    // can remove createdAt & updateAt and add timestamps: true
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updateAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
  },
  {
    timestamps: true,
  },
);

// NoteSchema.pre("save", async function () {
//   this.updateAt = new Date();
// });

//Recommended for Next.js (avoids "Cannot overwrite model" error):
export const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
