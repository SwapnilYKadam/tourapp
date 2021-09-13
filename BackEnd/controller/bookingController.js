import Tour from "../models/tourModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51JQctCSBSSpWSSeFYZygrvfQ4PXx6pcML3RAdtJKpH4OIB3OEPBkMUR38Ri60kXiks3vhBFpKoPgjjcD1wPdY1wI00LxykWldp"
);

export const getCheckoutSession = async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const user = await User.findById(req.params.userId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/tours/${tour._id}`,
    customer_email: user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 1000,
        currency: "inr",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
};
