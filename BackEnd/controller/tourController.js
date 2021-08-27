import Tour from "../models/tourModel.js";
import asyncHandler from "express-async-handler";

const getAllTours =
    asyncHandler(async (req, res) => {
        const tours = await Tour.find();
        res.json(tours);
    })

const getTour =
    asyncHandler(async (req, res) => {
        const tour = await Tour.findById(req.params.id).populate({ path: 'guides.guide' });
        if (tour) {
            res.send(tour);
        }
        else {
            res.status(404);
            throw new Error('Product not found.')
        }
    })


// exports.createTour = async (req, res) => {

//     try {
//         const tours = await Tour.create(req.body);

//         res.status(200).json({
//             status: 'Success',
//             data: {
//                 tours
//             }
//         })
//     } catch (err) {
//         console.log(err);
//         res.send(err.message)
//     }
// }
export {
    getAllTours, getTour
}