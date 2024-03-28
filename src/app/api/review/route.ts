import Review from "@/models/Review";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import { UploadImageToDrive } from "../../../../lib/google-drive";
import { ENVConfig } from "@/utils/Config";

export const POST = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const reviewName = body.name.split(" ")[0].toLowerCase();

    const fileMetadata = {
      name: `${reviewName}_${body.relation_id}.png`,
      parents: [ENVConfig.google_reviews_folder_id],
    };

    if (!body._id) {
      const imageUrl = await UploadImageToDrive(body.image, fileMetadata);
      await Review.create({ ...body, image: imageUrl });
      return new Response(JSON.stringify({ message: "Review created successfully" }), { status: 200 });
    }

    const isImageChange = body.isImageChange || false;
    const imageUrl = isImageChange ? await UploadImageToDrive(body.image, fileMetadata) : undefined;

    const updatedBody = imageUrl ? { ...body, image: imageUrl } : body;
    await Review.updateOne({ _id: body._id }, updatedBody);

    const responseMessage = isImageChange ? "Review details edited successfully with new image" : "Review details edited successfully";
    return new Response(JSON.stringify({ message: responseMessage }), { status: 200 });

  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const data = await Review.find({ relaiton_id: userSession?.user.name }, { _id: 1, name: 1, star: 1, des: 1, active: 1,image:1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    await connectToDB();
    await Review.deleteOne({ _id: body.id });
    return new Response(JSON.stringify({ message: "Review Deleted Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};