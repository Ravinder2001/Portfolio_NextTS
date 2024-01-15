import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  sectionList: [
    {
      name: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
    },
  ],
},
{ timestamps: true, versionKey: false });

const Section = models.Section || model("Section", SectionSchema);

export default Section;
