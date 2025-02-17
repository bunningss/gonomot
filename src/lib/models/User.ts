import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid name."],
      lowercase: true,
      minlength: [5, "Name must be at least 5 characters"],
    },
    phone: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: [11, "Phone number must be at least 11 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
      required: false,
      trim: true,
    },
    passwordResetExpires: Date,
    userType: {
      type: String,
      required: true,
      default: "user",
      lowercase: true,
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
    polls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "poll",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "poll",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
