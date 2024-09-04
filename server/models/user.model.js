import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: false,
      default: "default",
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
      default: null,
    },
    ownedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    sharedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;

  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  );
};

userSchema.methods.generateRefreshToken = async function() {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};




export const User = mongoose.model("User", userSchema);
