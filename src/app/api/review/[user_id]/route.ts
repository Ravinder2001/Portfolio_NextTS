import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { connectToDB } from "../../../../../lib/Database";
import Review from "@/models/Review";

export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    const user_id = params.user_id;
    const body = await request.json();
    await connectToDB();
    await Review.updateOne({ user_id }, { $push: { reviewList: body } });
    return new Response(JSON.stringify({ message: "Skill Added successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
