import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema(
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
    des: {
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

const About = models.About || model("About", AboutSchema);

export default About;
