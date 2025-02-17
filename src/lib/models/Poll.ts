import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a proper title."],
    },
    description: {
      type: String,
      required: [true, "Explain the topic properly."],
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
    upvotedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    downvotedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    duration: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.models.poll || mongoose.model("poll", pollSchema);

export default Poll;
