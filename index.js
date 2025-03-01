import express from "express";
import "dotenv/config";
import path from "path";
import uploadRoute, { folders } from "./router/upload-route.js";
import useAuthRouter from './router/auth.js'
import formSumbit from './router/form.js'
import cors from 'cors'
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve()

app.use(cors())
app.use(express.static("./dist"));
app.use(express.json())
// app.use(express.static(path.join(__dirname, "dist")));
folders.forEach(e=>{
   app.get(`/${e}/:name`,async (req,res)=>{
      const {name }= req.params 
      const folder = path.join(path.resolve(),'dist',e,name)
      res.sendFile(folder)
        // res.json({message:name})
   })
})
app.use("/api", uploadRoute);
app.use('/auth' ,useAuthRouter)
app.use('/form',formSumbit)
app.get('/')
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