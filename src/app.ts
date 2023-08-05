import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.static("views"));

app.get("/", (_, res): void => {
  res.sendFile("index.html", { root: "views" });
});

app.post(
  "/emotions/dump",
  fileUpload({ createParentPath: true }), //TODO - implement stricter file handling to only allow files which can be read as a text file basically
  (req, res) => {
    const file = req.files?.["data"];

    if (file === undefined || Array.isArray(file)) {
      res.status(404);
      return;
    }

    //TODO - implement the rest

    res.sendStatus(201);
  }
);

app.listen(port, (): void => {
  console.log("Server is running on port", port);
});
