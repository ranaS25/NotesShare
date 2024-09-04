import { Note } from "../models/note.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validateEmailsformat } from "../utils/functions.js";

const verifyUsersUsingEmail = (emails) => {
  emails = emails.map(email => email.toLowerCase);
  for (let email of emails) {

  }
};


const addNote = async (req, res) => {
  try {
    const user = req.user;
    const { title, body } = req.body;

    if (!title || title.trim() === "") {
      throw new ApiError(400, "Title is required");
    }
    if (!body || body.trim() === "") {
      throw new ApiError(400, "Body is required");
    }

    const note = await Note.create({ title, body, owner: user._id });
    if (!note) {
      throw new ApiError(500, "Cannot create a note. Right now");
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, { $push: {ownedNotes: note._id} }, {new: true})
    // console.log(updatedUser)
    if (!updatedUser) {
      throw new ApiError(500, "Cannot add a note to user");
    }
    res.status(200).json(new ApiResponse(200, note));
  } catch (error) {
    res.status(error?.status || 500).json(new ApiError(500, error?.message || "Unexpected error"))
  }
};


const shareNote = async (req, res) => {
  //get user
  //check if user is the owner of a note 
  //check is users whom note is shared with exists or not , if not dont do any operation
  //check max sharing limit 5 
  //update note sharedWith array
  //add note to each sharedWith array users
  try {
    const user = req.user;
    let { _id, shareWith } = req.body;
    if (!_id || _id.trim() === "") {
      throw new ApiError(401, "Unauthorize Access");
    }
  
    if (!shareWith || !Array.isArray(shareWith) || shareWith.length === 0) {
      throw new ApiError(401, "Provide the correct sharing list of users");
    }
    if (shareWith.length > 5) {
      throw new ApiError(401, "Sharing limit connot execeeds 5. ");
    }
    shareWith = [...new Set(shareWith)]
    shareWith = shareWith.map(email => email.toLowerCase());

    const note = await Note.findOne({_id, owner: user._id});

    if (!note) {
      throw new ApiError(401, "Note doesn't exist or insufficient permissions");
    }
    const isEmailsFormatValid = validateEmailsformat(shareWith);
    if (!isEmailsFormatValid) {
      throw new ApiError(401, "Provide the correct email of users");
    }
    if (shareWith.includes(user.email)) {
      throw new ApiError(401, "Provide the correct email of users");
    }

   
   

  
    let users = await User.find({ email: { $in: shareWith } });
    
    if (users.length < shareWith.length) {
      throw new ApiError(401, "Can't fetch some Account with provided emails");
    }
    users = users.filter(user=> !note.sharedWith.includes(user._id))

  
    if (users.length < 1) {
      throw new ApiError(401, "Can't add new users that may already added");
    }
    if ((users.length + note.sharedWith.length) > 5) {
      throw new ApiError(401, "Sharing limit execeeds 5. ");
    }

    const newSharedUsers = users.map(user => user._id);
 
    note.sharedWith = [...note.sharedWith,...newSharedUsers];


  
    const updatedNote = await note.save({ validateBeforeSave: false })

  
    if (!updatedNote) {
      throw new ApiError(401, "Cannot share right now.");
    }
    users.forEach(async(user) => {
      user.sharedNotes.push(updatedNote._id);
      await user.save({validateBeforeSave:false})
    })
  
    res.status(200).json(new ApiResponse(200, updatedNote, "Added users to Sharing list."))
  
  } catch (error) {
    res.status(401).json( new ApiError(401, "UNEXPECTED ERROR: " + (error.message || "nomessage")));
  }
  











}

const listNotes = async (req, res) => {
  try {
    const user = req.user;

    const notes = await User.findById(user._id)
      .select("-_id ownedNotes sharedNotes")
      .populate("ownedNotes")
      .populate("sharedNotes");
    if (!notes) {
      throw new ApiError(500, "Cannot Fetch Notes. Right now");
    }
    res.status(200).json(new ApiResponse(200, notes));
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(new ApiError(500, error?.message || "Unexpected error"));
  }
};

export { addNote, shareNote, listNotes };
