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

const formatFile = (item) => {
  return {
      id: item.id,
      name: item.name,
      mimeType: item.mimeType,
      type: item.mimeType.split('/').slice(0, 1)[0],
      src: `https://drive.google.com/uc?id=${item.id}`,
  };
}

const listFiles = async (filters, type='image') => {
  const driveService = await getDriveService();

  let query = 'trashed=false';
  if(filters){
    if(filters.parent){
      query += ` and '${filters.parent}' in parents `
    }

    if(filters.name){
      query += ` and name='${filters.name}' `;
    }

    if(type == 'image'){
      query += " and mimeType='image/webp' ";
      if(!filters.parent){
        query += " and name contains 'tabgames_img_' ";
      }
    }else{
      query += " and mimeType='application/vnd.google-apps.folder' ";
    }
  }
  
  const response = await driveService.files.list({
    pageSize: 10,
    q: query
  });

   const files = response.data.files.map((item) => formatFile(item));

   return files;
}

const listFilesByFolderName = async (folderName) => {

  const folders = await listFiles({name: folderName}, 'folder');
  if(folders.length > 0){
    const files = listFiles({parent: folders[0].id});
    return files;
  }

  return [];
}

const getFile = async (id) => {
  const driveService = await getDriveService();

  const response = await driveService.files.get({
    fileId: id,
  });

  return formatFile(response.dta);
}

const createFolder = async (folderName, parent = null) => {
  
  const driveService = await getDriveService();
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parent || process.env.GOOGLE_FOLDER_ID], // Change it according to your desired parent folder id
  };
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    fields: "id,name,mimeType",
  });

  return formatFile(response.data);
}

const updateFileFolder = async (fileId, folderId) => {
  
  const driveService = await getDriveService();
  const response = await driveService.files.update({
    fileId: fileId,
    addParents: [folderId]
  });

  return response;
}

const updateFileName = async (from, to, type='folder') => {
  
  const find = await listFiles({name:from}, type);
  if(find.length > 0){
    const id = find[0].id;
    const driveService = await getDriveService();
    const response = await driveService.files.update({
      fileId: id,
      name: to
    });
  
    return response;
  }

  return await createFolder(to);
}

const uploadImage = async (file, folderName = null) => {
  
  let parentFolder = process.env.GOOGLE_DRAFTS_ID;
  if(folderName){
    const findDir = await listFiles({name:folderName}, 'folder');
    if(findDir.length > 0){
      parentFolder = findDir[0].id;
    }else{
      const respDir = await createFolder(folderName);
      parentFolder = respDir.id;
    }
  }

  const driveService = await getDriveService();

  const fileMetadata = {
    name: file.originalname,
    parents: [parentFolder], // Change it according to your desired parent folder id
  };
  const media = {
    mimeType: file.mimetype,
    body: bufferToStream(file.buffer),
  };
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id,name,mimeType",
  });
  
  driveService.permissions.create({
    fileId: response.data.id,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    }
  });

  return formatFile(response.data);
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

export { formatFile, listFiles, listFilesByFolderName, getFile, createFolder, updateFileName, updateFileFolder, uploadImage, removeFile }