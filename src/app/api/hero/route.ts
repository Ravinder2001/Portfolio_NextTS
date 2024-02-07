import { connectToDB } from "../../../../lib/Database";
import Hero from "@/models/Hero";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import { ENVConfig } from "@/utils/Config";
import { UploadImageToDrive } from "../../../../lib/google-drive";
import { GenerateId } from "@/utils/Function";

export const POST = async (request: Request) => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const fileMetadata = {
      name: `Hero_${body.relation_id}.png`,
      parents: [ENVConfig.google_hero_folder_id],
    };

    if (!body._id) {
      const imageUrl = await UploadImageToDrive(body.image, fileMetadata);
      await Hero.create({ ...body, image: imageUrl });
      return new Response(JSON.stringify({ message: "Hero details added successfully" }), { status: 200 });
    }

    const isImageChange = body.isImageChange || false;
    const imageUrl = isImageChange ? await UploadImageToDrive(body.image, fileMetadata) : undefined;

    const updatedBody = imageUrl ? { ...body, image: imageUrl } : body;
    await Hero.updateOne({ _id: body._id }, updatedBody);

    const responseMessage = isImageChange ? "Hero details edited successfully with new image" : "Hero details edited successfully";
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
    const data = await Hero.findOne({ relaiton_id: userSession?.user.name }, { _id: 1, title: 1, role: 1, des: 1, location: 1, image: 1,name:1,years:1,projects:1,skills:1,resume:1 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
