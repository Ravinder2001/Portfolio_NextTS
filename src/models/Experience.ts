import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    relation_id: {
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
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Experience = models.Experience || model("Experience", ExperienceSchema);

export default Experience;
