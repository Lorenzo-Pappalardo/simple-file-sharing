import express from "express";
import sendZipFile from "./file-sharing";

const app = express();
const hostname = "0.0.0.0";
const port = 80;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fs", (req, res) => {
  sendZipFile(res);
});

app.listen(port, hostname, () => {
  console.log(`Listening at ${hostname}:${port}`);
});
