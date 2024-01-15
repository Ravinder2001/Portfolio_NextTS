import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
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
    tech: [
      {
        tech_name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
