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

export const UploadImageToDrive = (image: any) => {
  let id = nanoid(5);
  console.log("🚀  id:", id);

  const fileMetadata = {
    name: `${id}.jpg`,
    parents: [ENVConfig.google_folder_id], // Replace with the actual folder ID
  };

  const uploadImg = image.split(/,(.+)/)[1];
  const buf: Buffer = Buffer.from(uploadImg, "base64"); // Added
  const bs = new stream.PassThrough(); // Added
  bs.end(buf); // Added

  const media = {
    body: bs, // Modified
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    (err: any, file: any) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File ID:", file.data.id);
      }
    }
  );
};
