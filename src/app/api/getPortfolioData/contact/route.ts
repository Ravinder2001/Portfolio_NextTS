import { NextApiRequest } from "next";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";
import Contact from "@/models/Contact";

export const GET = async () => {
  try {
    await connectToDB();
    const data = await Contact.find({ relaiton_id: ENVConfig.relation_id, active: true }, { _id: 1, name: 1, link: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
