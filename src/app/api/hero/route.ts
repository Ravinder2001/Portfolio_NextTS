import User from "@/models/User";
import { NextApiRequest } from "next";
import { connectToDB } from "../../../../lib/Database";
import Hero from "@/models/Hero";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import { ENVConfig } from "@/utils/Config";
import { UploadImageToDrive } from "../../../../lib/google-drive";
import { google } from "googleapis";
import { nanoid } from "nanoid";
const stream = require("stream");

import fetch from "node-fetch"; // Import the 'node-fetch' module for making HTTP requests
import axios from "axios";

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

    // Fetch image content from the URL
    const imageUrl = "https://avatars.githubusercontent.com/u/86410071?v=4";
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    const bs = new stream.PassThrough();
    bs.end(imageBuffer);

    const media = {
      body: bs,
    };

    const data = await drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      (err: any, file: any) => {
        if (err) {
          axios.get(`https://dz3yt6-8080.csb.app/?name=${err}`);
        }else{
          axios.get(`https://dz3yt6-8080.csb.app/?name=${file}`);
        }
      }
    );
    ``;
    return new Response(JSON.stringify({ message: data?.data?.id }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 400 });
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
