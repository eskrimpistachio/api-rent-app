import express from "express";
const app = express();
import fs from "fs";
import bodyParser from "body-parser";
import cors from 'cors';

app.use(cors());
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  fs.readFile("./formData.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Error reading file" });
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/submit", (req, res) => {
  const formData = req.body;
  console.log(formData);
  fs.writeFile("./formData.json", JSON.stringify(formData), (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
  res.send("Data berhasil di simpan!");
});

app.listen(3000, () => {
  console.log("Server berhasil");
});
