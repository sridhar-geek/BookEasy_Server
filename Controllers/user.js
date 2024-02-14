import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
/**Import functions */
import { User } from "../Model/userModel.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

//desc: get userDetails and create token     route: /api/user/:id
export const getProfile = async(req, res) => {
    if (req.user.id !== req.params.id)
      throw new UnauthenticatedError(
        "Your not allowed to perform this operation"
      );
    const user = await User.findById(req.params.id);
    res
      .status(StatusCodes.OK)
      .json(user);
};

//desc: update userProfile and create token     route: /api/user/:id
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
  const token = await updatedUser.createToken();
  const { password: userPassword, ...userDetails } = updatedUser._doc;
  res.status(StatusCodes.OK).json({ userDetails,token });
};

//desc:removes token and delete user account      route: /api/user/:id
export const deleteProfile = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("access_token").status(StatusCodes.OK).json("Account deleted....");
};

//desc:removes cookie and logout user     route: /api/user/logout
export const logoutUser = (req, res) => {
  if (req.user.id !== req.params.id)  throw new UnauthenticatedError('Your not allowed to perform this operation')
    res
      .clearCookie("access_token")
      .status(StatusCodes.OK)
      .json("logout successfully");
};
