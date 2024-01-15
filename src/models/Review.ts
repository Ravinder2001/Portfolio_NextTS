import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    
    },

    name: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
