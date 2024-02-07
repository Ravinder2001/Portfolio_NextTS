import { NextApiRequest } from "next";
import Hero from "@/models/Hero";
import { connectToDB } from "../../../../../lib/Database";
import { ENVConfig } from "@/utils/Config";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    let data;
    let searchParams = req.nextUrl.searchParams.get("name");

    await connectToDB();
    if (searchParams) {
      data = await Hero.findOne({ relaiton_id: ENVConfig.relation_id }, { name: 1,_id:0 });
    } else {
      data = await Hero.findOne(
        { relaiton_id: ENVConfig.relation_id },
        { _id: 1, title: 1, role: 1, des: 1, location: 1, image: 1, name: 1, years: 1, projects: 1, skills: 1, resume: 1 }
      );
    }
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
