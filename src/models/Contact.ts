import { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
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

const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;
