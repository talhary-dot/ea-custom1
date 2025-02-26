import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();
const folders = ["banner1", "banner2", "banner3", "banner4"];
folders.forEach((folder) => {
  const uploadDir = `./public/${folder}`;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
});
const deleteFilesInFolder = (folder) => {
  const folderPath = path.join(process.cwd(), `public/${folder}`);
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
const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/${folder}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
const upload = (folder) => multer({ storage: storage(folder) });
folders.forEach((folder) => {
  router.post(
    `/upload-${folder}`,
    (req, res, next) => {
      deleteFilesInFolder(folder);
      next();
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
    const bannerDir = path.join(process.cwd(), `public/${folder}`);
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
});
export default router;