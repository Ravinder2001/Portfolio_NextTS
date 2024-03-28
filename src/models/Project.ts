import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    relation_id: {
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
    active: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isUrlVisible: {
      type: Boolean,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    isGithubVisible: {
      type: Boolean,
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
