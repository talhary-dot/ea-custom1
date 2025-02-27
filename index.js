import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoute from "./router/upload-route.js";
import useAuthRouter from './router/auth.js'
import cors from 'cors'
const port = process.env.PORT || 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors())
app.use(express.static("./dist"));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", uploadRoute);
app.use('/auth' ,useAuthRouter)

app.get('/*', function(req, res) {
  res.sendFile(path.join(path.resolve(), 'dist','index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(port, () => {
  console.log(`server is listening to port http://localhost:${port}`);
});