import Experience from "@/models/Experience";
import { connectToDB } from "../../../../lib/Database";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import { ENVConfig } from "@/utils/Config";
import { UploadImageToDrive } from "../../../../lib/google-drive";

export const POST = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const companyName = body.company.split(" ")[0].toLowerCase();

    const fileMetadata = {
      name: `${companyName}_${body.relation_id}.png`,
      parents: [ENVConfig.google_experience_folder_id],
    };

    if (!body._id) {
      const imageUrl = await UploadImageToDrive(body.image, fileMetadata);
      await Experience.create({ ...body, image: imageUrl });
      return new Response(JSON.stringify({ message: "Experience details added successfully" }), { status: 200 });
    }

    const isImageChange = body.isImageChange || false;
    const imageUrl = isImageChange ? await UploadImageToDrive(body.image, fileMetadata) : undefined;

    const updatedBody = imageUrl ? { ...body, image: imageUrl } : body;
    await Experience.updateOne({ _id: body._id }, updatedBody);

    const responseMessage = isImageChange ? "Experience details edited successfully with new image" : "Experience details edited successfully";
    return new Response(JSON.stringify({ message: responseMessage }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
  }
};

export const GET = async () => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const data = await Experience.find({ relaiton_id: userSession?.user.name }, { _id: 1, company: 1, role: 1, des: 1, duration: 1, image: 1,active:1 });
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
    await Experience.deleteOne({ _id: body.id });
    return new Response(JSON.stringify({ message: "Company Deleted Succesfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(err.message, { status: 400 });
  }
};
