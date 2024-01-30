import { ENVConfig } from "@/utils/Config";
import { nanoid } from "nanoid";

const stream = require("stream");
const { google } = require("googleapis");

const credentials = {
  client_email: ENVConfig?.google_client_email,
  private_key: ENVConfig?.google_private_key,
};
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const drive = google.drive({ version: "v3", auth });

export const UploadImageToDrive = async (image: any) => {
  try {
    let id = nanoid(5);
    console.log("🚀 id:", id);

    const fileMetadata = {
      name: `${id}.jpg`,
      parents: [ENVConfig.google_folder_id], // Replace with the actual folder ID
    };

    const uploadImg = image.split(/,(.+)/)[1];
    const buf: Buffer = Buffer.from(uploadImg, "base64");
    const bs = new stream.PassThrough();
    bs.end(buf);

    const media = {
      body: bs,
    };

    const { data } = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    console.log("File ID:", data.id);
    return data.id;
  } catch (error) {
    
    console.error("Error uploading file:", error);
    return error
  }
};
