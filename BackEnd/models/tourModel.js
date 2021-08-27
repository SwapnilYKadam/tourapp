import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      unique: true,
      required: [true, "A Tour must have a name."],
    },
    slug: String,
    startLocation: {
      description: String,
      address: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: [String],
    startDates: [Date],
    duration: Number,
    maxGroupSize: Number,
    difficulty: String,
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    summary: String,
    description: String,
    imageCover: String,
    locations: [
      {
        type: {
          type: String,
          default: "Point",
        },
        address: String,
        description: String,
        day: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
  });

  next();
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
