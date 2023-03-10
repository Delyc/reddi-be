import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRouter from "./authApp/routes.js";
import commentRouter from "./commentApp/routes.js";
import { cloudinaryConfig } from "./configs/base.js";
import {
  optionsToCustomizeSwagger,
  swaggerOptions,
} from "./configs/swagger.js";
import redditRouter from "./redditApp/routes.js";
import errorLogger from "./utils/errorLogger.js";
import responseHandler from "./utils/responseHandler.js";
import path from 'path'





  const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000;
app.use((req, res, next) => {
  console.log(req.url, req.method);
  return next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(cloudinaryConfig);
app.use("/api/v1/accounts", authRouter);
app.use("/api/v1/reddits", redditRouter);
app.use("/api/v1/comments", commentRouter);
app.get("/", (req, res) => {
  res.send("Welcome!");
});

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection success");
    app.listen(port, () => console.log("server starting: ", port));
  })
  .catch((error) => console.log(error));
