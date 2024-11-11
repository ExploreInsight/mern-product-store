import express from "express";
import { connectDB } from "./config/db.js";
import path, { dirname } from 'path';
import productRoute from "./routes/product.js";

const app = express();

//json parser
app.use(express.json());

// console.log(process.env.MONGO_URI,process.env.PORT); testing purpose only

const _dirname = path.resolve(); //depoyement purpose


//Routes
app.use("/api/products", productRoute);

// For Deployment use 
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(_dirname,"/frontend/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","build","index.html",));
  });
}

//PORT 
const PORT = process.env.PORT || 7000;
const startSever = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Server started at http://localhost:"+PORT);
    });
  } catch (error) {
    console.error("Connection Error:", error);
    process.exit(1); // return code 1 if fails to connect
  }
};
startSever();
