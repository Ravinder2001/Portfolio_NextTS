import User from "@/models/User";
import { NextApiRequest } from "next";
import { connectToDB } from "../../../../lib/Database";
import Hero from "@/models/Hero";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import { ENVConfig } from "@/utils/Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { UploadImageToDrive } from "../../../../lib/google-drive";
import { google } from "googleapis";
import { nanoid } from "nanoid";
const stream = require("stream");
export const POST = async (request: Request) => {
  try {
    const credentials = {
      client_email: ENVConfig?.google_client_email,
      private_key: ENVConfig?.google_private_key,
    };
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = google.drive({ version: "v3", auth });
    const body = await request.json();
    let id = nanoid(5);
    console.log("🚀 id:", id);

    const fileMetadata = {
      name: `${id}.jpg`,
      parents: [ENVConfig.google_folder_id], // Replace with the actual folder ID
    };

    const uploadImg = body.image.split(/,(.+)/)[1];
    const buf: Buffer = Buffer.from(uploadImg, "base64");
    const bs = new stream.PassThrough();
    bs.end(buf);

    const media = {
      body: bs,
    };

    const data = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    return new Response(JSON.stringify({ message: data?.data?.id }), { status: 200 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  }
};
export const GET = async () => {
  try {
    const userSession = await getServerSession(authoptions);

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const data = await Hero.findOne({ relaiton_id: userSession?.user.name }, { _id: 1, title: 1, role: 1, des: 1, location: 1, image: 1 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
};
