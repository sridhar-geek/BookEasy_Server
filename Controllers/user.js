import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

import { User } from "../Model/userModel.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

//desc: post new data to database and create token     route: /api/user/:id
export const getProfile = (req, res) => {};

//desc: validates crendentails and create token     route: /api/user/:id
export const updateProfile = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  } else {
    const allowedUser = await User.findById(req.params.id);
    req.body.password = allowedUser.password;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
      },
    },
    { new: true }
  );

  const { password, ...userDetails } = updatedUser._doc;
  res.status(StatusCodes.OK).json({ userDetails });
};

// export const updateProfile = async (req, res) => {
//     if(req.user.id !== req.params.id)
//         throw new UnauthenticatedError('Your not allowed to perform this operation')

//         if(req.password)
//             req.password = await bcrypt.hash(req.body.password, 10)

//         const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body, {new:true,runValidators:true})
//         const {password, ...userDetails} = updatedUser._doc

//         res.status(StatusCodes.OK).json({userDetails})
// };

//desc:removes token and delete user account      route: /api/user/:id
export const deleteProfile = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );
  await User.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json("user account deleted....");
};
