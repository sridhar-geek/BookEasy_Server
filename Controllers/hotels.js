import {StatusCodes} from 'http-status-codes'

/* Imports from another files */
import {Hotel} from '../Model/hotelModel.js'
import {User} from '../Model/userModel.js'
import NotFoundError from "../errors/not-found.js";
import BadRequestError from "../errors/bad-request.js";


// desc: creating a hotel           route: /api/hotels
export const createHotel = async(req,res)=> {
    const hotel = await Hotel.create(req.body)
    const user = await User.findById(req.body.user)
    const noOfDiscounts = user.discounts
    if (noOfDiscounts > 0){
        await User.updateOne({_id: req.body.user}, {$set: {'discounts':noOfDiscounts-1 }})
    }
    res.status(StatusCodes.CREATED).json('Hotel is added to your booking')
}


// desc : get single hotel              route: /api/hote/:id
export const getSingleHotel = async(req,res)=> {

}

// desc: getting all  hotels            route: /api/hotel
export const getAllHotels = async(req,res) => {
    const hotels = await Hotel.find({user: req.user.id}).sort('createdAt')
    if(!hotels || hotels.length === 0) throw new NotFoundError(`No bookings found for `)
    res.status(StatusCodes.OK).json(hotels)
}

// desc: delete hotel           route: /api/hotel/:id
export const deleteHotel = async(req,res)=> {
    const userId = req.user.id
    const hotelId = req.params.id 
    const hotel = await Hotel.findOneAndDelete({ _id: hotelId, user: userId})
    if(!hotel) throw new BadRequestError('Something went wrong')
    res.status(StatusCodes.OK).json('Hotel deleted')
}