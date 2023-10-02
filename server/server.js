const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Data = require("./dataSchema");
const defaultData= require("./defualtData");

const app = express();
const port = process.env.Port || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/FMSDB", { useNewUrlParser: true });

app.get("/getData", async (req, res) => {
  // Data.find({}, function (err, result) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(result);
  //   }
  // });

  console.log(Data.length);
  console.log(Data);
  await Data.find({}).exec().then((error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
    console.log("getData");
  });
});

app.post("/addData", async (req, res) => {
  const newData = new Data(req.body.newData);
  try {
    newData.save();
    res.redirect("/getData");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});