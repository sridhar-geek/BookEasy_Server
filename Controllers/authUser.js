import { StatusCodes } from "http-status-codes";
/**Import functions */
import { User } from "../Model/userModel.js";
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";

//desc: post new data to database        route: /api/auth/register
export const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json("User registration successful");
};

//desc: validates crendentails and create token     route: /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("Email not registered");
  const isPassword = await user.comparePassword(password);
  if (!isPassword) throw new BadRequestError("invalid Credentails");
  const token = await user.createToken();
  const { password: userPassword, ...userDetails } = user._doc;
  res
    /** cookie is not storing in browser in deployed version */
    // .cookie("access_token", token, {
    //   maxAge: 3600 * 1000,
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: process.env.ENVIRONMENT === "production" ? "None" : "strict", // 'None' for production, 'Lax' for development
    //   secure: process.env.ENVIRONMENT === "production", // true for production, false for development
    // })
    .status(StatusCodes.OK)
    .json({ userDetails, token });
};

// Generates random password
const generatePassword = () => {
  let password = "";
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let n = str.length;
  for (var i = 1; i < 9; i++) {
    password += str.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

//desc: login user using social profiles like google   route : /api/auth/socialLogin
export const socialLogin = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  // checking if user is already exists, if old user assign token
  if (user) {
    const token = await user.createToken();
    const { password: userPassword, ...userDetails } = user._doc;
    res
      /** cookie is not storing in browser in deployed version */
      // .cookie("access_token", token, {
      //   maxAge: 3600 * 1000,
      //   path: "/",
      //   httpOnly: true,
      //   sameSite: process.env.ENVIRONMENT === "production" ? "None" : "strict", // 'None' for production, 'Lax' for development
      //   secure: process.env.ENVIRONMENT === "production", // true for production, false for development
      // })
      .status(StatusCodes.OK)
      .json({ userDetails, token });
  }
  // if user is new to website, then create new accout
  else {
    const randomPassword = generatePassword();
    const user = await User.create({ password: randomPassword, ...req.body });
    const token = await user.createToken();
    const { password: userPassword, ...userDetails } = user._doc;
    res
      /** cookie is not storing in browser in deployed version */
      // .cookie("access_token", token, {
      //   maxAge: 3600 * 1000,
      //   path: "/",
      
      //   httpOnly: true,
      //   sameSite: process.env.ENVIRONMENT === "production" ? "None" : "strict", // 'None' for production, 'Lax' for development
      //   secure: process.env.ENVIRONMENT === "production", // true for production, false for development
      // })
      .status(StatusCodes.OK)
      .json({ userDetails, token });
  }
};

/**testing route to get all users */
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send({ users });
};
