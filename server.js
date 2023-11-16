const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res)=>{

  res.status(200).send("This is API for Rent App!")
})

const dataRouter = require('./routes/data.js')

app.use('/data', dataRouter)

app.listen(3000, () => {
  console.log("Server berhasil dijalankan");
});
