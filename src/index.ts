import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use("/", (_, res): void => {
  res.send("Hello world!");
});

app.listen(port, (): void => {
  console.log("Server is running on port", port);
});
