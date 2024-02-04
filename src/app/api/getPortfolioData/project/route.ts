import { NextApiRequest } from "next";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";
import Project from "@/models/Project";

export const GET = async () => {
  try {
    await connectToDB();
    
    const data = await Project.find(
      { relation_id: ENVConfig.relation_id, active: true }, 
      { _id: 1, name: 1, type: 1, des: 1, image: 1, tech: 1 }
    ).sort({ createdAt: -1 }); // Add this line to sort by created_at in ascending order

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
