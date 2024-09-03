import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";


const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    // console.log(user)

    const accessToken = await user.generateAccessToken();
    // console.log(accessToken, "   ", refreshToken);
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("ER:  ", error);
    throw new ApiError(500, "Cannot generate tokens.");
  }
};

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

    res
      .status(200)
      .json(new ApiResponse(200, "User registered Succesfully", createdUser));
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
    // console.log(existingUser._id);
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existingUser._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "User successfully logged In"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const logoutUser = async (req, res) => {
  const user = req.user;

  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "user logged out successfully."));
};

const listUsers = async (req, res) => {
  res.send("ok");
};

export { registerUser, listUsers, loginUser, logoutUser };



