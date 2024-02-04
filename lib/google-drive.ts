import { ENVConfig } from "@/utils/Config";

const stream = require("stream");
const { google } = require("googleapis");

const credentials = {
  client_email: ENVConfig?.google_client_email,
  private_key: ENVConfig?.google_private_key,
};

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [ENVConfig.google_scope_auth_drive],
});
const drive = google.drive({ version: "v3", auth });

type fileMetadata = {
  name: string;
  parents: string[];
};

export const UploadImageToDrive = async (image: string, fileMetadata: fileMetadata) => {
  return new Promise((resolve: any, reject) => {
    const uploadImg = image.split(/,(.+)/)[1];
    const buf: Buffer = Buffer.from(uploadImg, "base64");
    const bs = new stream.PassThrough();
    bs.end(buf);

    // Check if file with the same name already exists
    drive.files.list({
      q: `name='${fileMetadata.name}'`,
      spaces: 'drive',
      fields: 'files(id, name)',
    }, async (err: any, response: any) => {
      if (err) {
        reject(err.message);
      }

      if (response.data.files.length > 0) {
        // File with the same name exists, delete it
        const fileId = response.data.files[0].id;

        drive.files.delete({
          fileId: fileId,
        }, async (err: any) => {
          if (err) {
            reject(err.message);
          }

          // After deletion, upload the new file
          const media = {
            body: bs,
          };

          drive.files.create(
            {
              resource: fileMetadata,
              media: media,
              fields: "id",
            },
            async (err: any, file: any) => {
              if (err) {
                reject(err.message);
              }

              await drive.permissions.create({
                fileId: file.data.id,
                requestBody: {
                  role: "reader",
                  type: "anyone",
                },
              });

              resolve(`https://drive.usercontent.google.com/download?id=${file.data.id}&export=view&authuser=0`);
            }
          );
        });
      } else {
        // File with the same name doesn't exist, create a new one
        const media = {
          body: bs,
        };

        drive.files.create(
          {
            resource: fileMetadata,
            media: media,
            fields: "id",
          },
          async (err: any, file: any) => {
            if (err) {
              reject(err.message);
            }

            await drive.permissions.create({
              fileId: file.data.id,
              requestBody: {
                role: "reader",
                type: "anyone",
              },
            });

            resolve(`https://drive.usercontent.google.com/download?id=${file.data.id}&export=view&authuser=0`);
          }
        );
      }
    });
  });
};


