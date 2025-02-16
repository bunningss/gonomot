import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a proper title."],
    },
    description: {
      type: String,
      required: [true, "Explaing the topic properly."],
      minLength: [35, "Please write at least 35 characters."],
    },
    upvotes: {
      type: Number,
      required: true,
      default: 0,
    },
    downvotes: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.models.poll || mongoose.model("poll", pollSchema);

export default Poll;
