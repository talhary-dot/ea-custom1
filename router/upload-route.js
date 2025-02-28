import express from "express";
import multer from "multer";

import path from "path";
import jwt from 'jsonwebtoken'
import fs from "fs";
const router = express.Router();
export const folders = ["banner1", "banner2", "banner3", "banner4"];
folders.forEach((folder) => {
  const uploadDir = `./dist/${folder}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
});
const deleteFilesInFolder = (folder) => {
  const folderPath = path.join(process.cwd(), `dist/${folder}`);
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${err}`);
      return;
    }
    files.forEach((file) => {
      fs.unlink(path.join(folderPath, file), (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });
    });
  });
};
const JWT_SECRET = process.env.JWT_SECRET_KEY
const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./dist/${folder}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
const upload = (folder) => multer({ storage: storage(folder) });

const upload1= (folder) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });

folders.forEach((folder) => {
  router.post(
    `/upload-${folder}`,
    (req, res, next) => {
      deleteFilesInFolder(folder);
      next();
    },
    (req,res,next)=>{
      const token = req.headers['authorization'].split(' ')[1];
      
      const decoded = jwt.decode(token,JWT_SECRET)
      if(!decoded.userId){
        return res.json({message:"token not good"})

      }
      next()
    },
    upload(folder).array("photos", 10),
    (req, res) => {
      
      res.json({
        message: `Photos uploaded successfully to ${folder}!`,
        files: req.files,
      });
    }
  );
  router.get(`/${folder}-photos`, (req, res) => {
    const bannerDir = path.join(process.cwd(), `dist/${folder}`);
    fs.readdir(bannerDir, (err, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error reading folder", error: err });
      }
      const images = files.map((file) => `/${folder}/${file}`);
      res.json({ images });
    });
  });
  router.post(
    `/change-${folder}`,
    upload1(folder).single('image'),
    async (req, res) => {
      const { ImageName:asold } = req.body;
      const ImageName = path.basename(asold)

      
      try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
  
        const oldImagePath = path.join(
          './dist/',folder,
          ImageName
        );
     
        // Check if the old file exists and delete it
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
        }
  
        // Save the new file with the same name
      
        fs.writeFileSync(oldImagePath, file.buffer);
        console.log(`Saved new image: ${oldImagePath}`);
  
        res.status(200).json({ message: 'Image has been uploaded' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  );
});


export default router;