import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      index:true
    },
    fullName: {
      type: String,
      required: false,
      default: 'default',
      trim: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  console.log(" in save")

  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});




export const User = mongoose.model("User", userSchema);
