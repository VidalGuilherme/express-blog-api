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
  return auth;
};

const getDriveService = async () => {
  const auth = await getAuth();
  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};

const listFiles = async () => {
  const driveService = await getDriveService();

  const response = await driveService.files.list({
    pageSize: 10,
    q: `'${process.env.GOOGLE_FOLDER_ID}' in parents and trashed=false`
  });

  return response;
}

const createFolder = async (folderName) => {
  
  const driveService = await getDriveService();
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [process.env.GOOGLE_FOLDER_ID], // Change it according to your desired parent folder id
  };
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    fields: "id,name",
  });

  return response;
}

const uploadImage = async (file) => {
    
  const driveService = await getDriveService();
  const fileMetadata = {
    name: file.originalname,
    parents: [process.env.GOOGLE_FOLDER_ID], // Change it according to your desired parent folder id
  };
  const media = {
    mimeType: file.mimetype,
    body: bufferToStream(file.buffer),
  };
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id,name",
  });
  return response;
};

const removeFile = async (fileId) => {
  const driveService = await getDriveService();

  return await driveService.files.delete({
    fileId: fileId
  });
}

const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
};

const deleteLocalFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

export { listFiles, createFolder, uploadImage, removeFile }