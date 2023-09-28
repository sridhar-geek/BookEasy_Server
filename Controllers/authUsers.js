import { StatusCodes } from "http-status-codes";

        /**Imports from other files */
import User from "../Model/userModel.js";
import { generateToken } from "../utlity/generateToken.js";
import BadRequestError from '../errors/bad-request.js'
import UnauthenticatedError from "../errors/unauthenticated.js";
import NotFoundError from "../errors/not-found.js";

//@des: to registerUser , public route
export const registerUser = async (req, res) => {
  const {name, email, password} = req.body
  const user = await User.create({ name, email, password})
  generateToken(res, user._id )           // creating a cookie using jwt
  res
    .status(StatusCodes.CREATED)
    .json({ id: user._id, name: user.name, email: user.email });
};

//@des: to loginrUser , public route
export const loginUser = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide email and password");

  const user = await User.findOne({ email }); // finding whether email id is present in database or not
  if (!user) throw new UnauthenticatedError("No User found");

  const isPasswordCorrect = await user.comparePassword(password); // middleware function checks whether password is valid or not
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Credentials");
  generateToken(res, user._id);                  // creating a cookie using jwt
  res.status(StatusCodes.OK).json({ user: user.name });
};

//@des: to logout user , pravite route
export const logoutUser = (req, res) => {
    res.cookie('token', '',{          // reseting cookie to null value
        httpOnly: true,
        expries: new Date(0)
    })
  res.status(StatusCodes.OK).json({ message: "user logout successfully" });
};

//@des: to getUserdetails , pravite route
export const getUserProfile = async(req, res) => {
  const user = {
    userId : req.user._id,
    name : req.user.name,
    email: req.user.email
  }
  res.status(StatusCodes.OK).json({ user });
};

//@des: to update user profile , pravite route
export const updateUserProfile = async(req, res) => {
  const user = User.findById(req.body._id)

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.status(StatusCodes.OK).json({
      userId: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    })
  }else{
    throw new BadRequestError('No user found')
  }
// const updatedProfile = req.body;

//   const updateUser = await User.updateOne(
//     { _id: req.user._id },
//     { $set: updatedProfile }
//   );
//   if(!user)
//     throw new NotFoundError('no user found')
  res.status(StatusCodes.OK).json({ updatedUser });
};
