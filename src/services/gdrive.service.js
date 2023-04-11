import { google } from "googleapis";
import fs from 'fs';
import dotenv from 'dotenv';
import { Readable } from "stream";
dotenv.config();

const getAuth = async () => {
  const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
  );

  auth.setCredentials({
    scope: "https://www.googleapis.com/auth/drive", 
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  // const newToken = await auth.getAccessToken();
  // auth.setCredentials({access_token: newToken});

  //scopes: "https://www.googleapis.com/auth/drive",
  return auth;
};

const getDriveService = async () => {
  const auth = await getAuth();
  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};

export const uploadToGoogleDrive = async (file) => {
    
  console.log(file);
  const driveService = await getDriveService();

  const fileMetadata = {
    name: file.originalname,
    parents: [process.env.GOOGLE_FOLDER_ID], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    //body: fs.createReadStream(file.path),
    body: bufferToStream(file.buffer),
  };

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });

  //deleteFile(file.path);

  return response;
};

const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};