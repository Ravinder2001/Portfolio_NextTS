import { Schema, model, models } from "mongoose";

const HeroSchema = new Schema(
  {
    relation_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Hero = models.Hero || model("Hero", HeroSchema);
export default Hero;
