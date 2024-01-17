import { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    relation_id: {
      type: String,
      required: true,
    },
    name: {
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

const Skill = models.Skill || model("Skill", SkillSchema);

export default Skill;
