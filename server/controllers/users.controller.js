import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  // res.send("not ok")
  try {
    const { email, password } = req.body;

    
    if (!email || email.toLowerCase().trim() === "") {
      
      throw new ApiError(400, "Email is required.");
    }

    if (!password || password.length < 8) {
      
      throw new ApiError(400, "Password is required.");
    }

    const existingUser = await User.findOne({ email: email });
    
    if (existingUser) {
      // console.log("exits user: ", existingUser)
      throw new ApiError(400, "Email already exists.");
    }
    
    const user = await User.create({
      email: email,
      password: password,
    });
    

    const createdUser = await User.findById({
      _id: user._id,
    }).select("-password -refreshToken");
    
    if (!createdUser) {
      throw new ApiError(400, "Something went wrong while creating the user");
    }
  

    res.status(200).json(new ApiResponse(200, "User registered Succesfully", createdUser));
  } catch (error) {
    res.status(error.statusCode || 401).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || email.toLowerCase().trim() === "") {
      throw new ApiError(400, "Email is required.");
    }
  
    if (!password || password.length < 8) {
      throw new ApiError(400, "Password is required.");
    }
  
    const existingUser = await User.findOne({ email: email });
  
    if (!existingUser) {
      throw new ApiError(400, "Account does not exists.");
    }

    const passwordMatched = bcrypt.compareSync(password, existingUser.password);
  
    if (!passwordMatched) {
      throw new ApiError(400, "Password is wrong.");
    }
  
    res.send("nice");
  } catch (error) {
    console.log(error)
    res.status(401).json( error)
  }
};

const listUsers = async (req, res) => {
  res.send("ok");
};

export { registerUser, listUsers, loginUser };
