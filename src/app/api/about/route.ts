import { getServerSession } from "next-auth";
import { connectToDB } from "../../../../lib/Database";
import About from "@/models/About";
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
    const fileMetadata = {
      name: `About_${body.relation_id}.png`,
      parents: [ENVConfig.google_about_folder_id],
    };

    if (!body._id) {
      const imageUrl = await UploadImageToDrive(body.image, fileMetadata);
      await About.create({ ...body, image: imageUrl });
      return new Response(JSON.stringify({ message: "About details added successfully" }), { status: 200 });
    }

    const isImageChange = body.isImageChange || false;
    const imageUrl = isImageChange ? await UploadImageToDrive(body.image, fileMetadata) : undefined;

    const updatedBody = imageUrl ? { ...body, image: imageUrl } : body;
    await About.updateOne({ _id: body._id }, updatedBody);

    const responseMessage = isImageChange ? "About details edited successfully with new image" : "About details edited successfully";
    return new Response(JSON.stringify({ message: responseMessage }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const data = await About.findOne({ relaiton_id: "asdsad" }, { _id: 1, title: 1, image: 1, des: 1 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
