export const ENVConfig = {
  mongoDbURL: process.env.MONGO_DB_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  baseURL: process.env.NEXTAUTH_URL,
  relation_id: process.env.RELATION_ID,
  google_client_email: process.env.GOOGLE_CLIENT_EMAIL,
  google_private_key: process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  google_folder_id: process.env.GOOGLE_FOLDER_ID??"",
};
