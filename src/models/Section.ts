import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema(
  {
    relation_id: {
      type: String,
      required: true,
    },
    name: {
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

const Section = models.Section || model("Section", SectionSchema);

export default Section;
