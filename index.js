import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoute from "./router/upload-route.js";
import cors from 'cors'
const port = process.env.PORT || 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors())
app.use(express.static("./dist"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", uploadRoute);
app.listen(port, () => {
  console.log(`server is listening to port http://localhost:${port}`);
});