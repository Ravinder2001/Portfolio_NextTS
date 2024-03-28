import { NextApiRequest } from "next";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";
import Review from "@/models/Review";

export const GET = async () => {
  try {
    await connectToDB();
    const data = await Review.find({ relaiton_id: ENVConfig.relation_id, active: true }, 
      { _id: 1, name: 1, star: 1, des: 1,image:1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
