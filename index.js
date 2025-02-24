import express from 'express'
import 'dotenv/config';
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static('./dist'))

app.listen(port,()=>{
    console.log(`server is listening to port http://localhost:${port}`)
})