import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    company: {
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
    duration: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Experience = models.Experience || model("Experience", ExperienceSchema);

export default Experience;
