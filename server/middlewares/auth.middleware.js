import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

const verifyUser = async(req, res, next) => {

  //check if jwt is valid
  //fetch user from db
  //add user to req and next()
  

  try {
    

    const accessToken = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
    
    // console.log(accessToken);

    if (!accessToken) {
      throw new ApiError(401, "Access id denied.");
    }
  
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById({ _id: decodedToken._id })
  
    if (!user) {
      throw new ApiError(401, "Invalid Access.")
    }
    
    req.user = user;
    next();
  
  } catch (error) {
    //FIXME can throw errors
    res.status(401).json(new ApiError(401, error?.message || "invalid access token"))
  }


  
}

export {verifyUser}