import express from "express";
import { routes } from "./src/routes/index.js";
import cors from "cors";
import { UPLOAD_FOLDER } from "./src/configs/upload.js";
const port = 3333;
//inicialized express in app 
const app = express();
//return  json
app.use(express.json());
//connect frontend
app.use(cors());
//connect routes
app.use(routes);
//routes from files 
app.use("/file", express.static(UPLOAD_FOLDER));

//messege server on-line
app.listen(port, () => {
  console.log(`Server is running 🚀 port: ${port}`);
});
