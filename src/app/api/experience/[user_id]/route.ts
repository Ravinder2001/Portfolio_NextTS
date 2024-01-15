import Experience from "@/models/Experience";
import { connectToDB } from "../../../../../lib/Database";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    const user_id = params.user_id;
    const body = await request.json();
    await connectToDB();
    await Experience.updateOne({ user_id }, { $push: {companyList: body } });

    return new Response(JSON.stringify({ message: "Experience Details Added" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
