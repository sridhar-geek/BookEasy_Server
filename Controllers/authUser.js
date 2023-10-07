import {StatusCodes} from 'http-status-codes'
/**Import functions */
import {User} from "../Model/userModel.js"
import NotFoundError from '../errors/not-found.js'
import BadRequestError from '../errors/bad-request.js'

//desc: post new data to database and create token     route: /api/auth/register
export const registerUser = async(req, res)=> {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json(user)
}


//desc: validates crendentails and create token     route: /api/auth/login
export const loginUser = async (req, res) =>  {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user)
        throw new NotFoundError('Email not registered')
    const isPassword = await user.comparePassword(password)
    if(!isPassword)
        throw new BadRequestError('invalid Credentails')
    res.status(StatusCodes.OK).json(`${email} login successful`)

}


//desc:      route: /api/auth/logout
export const logoutUser = (req, res)=> {

}