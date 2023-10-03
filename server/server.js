const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.Port || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

// mongoose.connect("mongodb://127.0.0.1/FMSDB", { useNewUrlParser: true }); // local Database (if want to use define defaults for new user)
// MongoAtlas Database
const url = "mongodb+srv://harshaldodke31718:Harshal123@cluster0.jfulnvb.mongodb.net/FMSDB";
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(url, connectionParams)
  .then(() => console.log('Connected to the database '))
  .catch((err) => console.error(`Error connecting to the database. n${err}`));

const dataSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  incomes: [{
    date: String,
    source: String,
    amount: Number,
    category: String,
    note: String,
  }],
  expenses: [{
    date: String,
    vendor: String,
    amount: Number,
    category: String,
    note: String,
  }],
  assets: [{
    date: String,
    name: String,
    initialAmount: Number,
    details: String,
    monthlyMaintainance: Number,
    monthlyIncome: Number,
    note: String,
  }],
  liabilities: [{
    date: String,
    name: String,
    initialAmount: Number,
    details: String,
    monthlyMaintainance: Number,
    monthlyIncome: Number,
    note: String,
  }],
});
const Data = mongoose.model("Data", dataSchema);

app.get("/login", async (req, res) => {
  // search user by emailId
  const emailId = req.query.emailId;
  await Data.find({ email: emailId }).exec().then((result) => {
    // if (result.length == 0) {
    //   console.log("creating user");
    //   Data.create({
    //     name: "harshal",
    //     username: "444harshal",
    //     email: emailId,
    //     incomes: [],
    //     expenses: [],
    //     assets: [],
    //     liabilities: [],
    //   });
    //   Data.find({ email: emailId }).exec().then((result) => res.send(result));
    // } else {
    res.send(result);
    // }
  });
});

app.get("/signup", async (req, res) => {
  const name = req.query.emailId;
  const username = req.query.emailId;
  const emailId = req.query.emailId;
  Data.create({
    name: name,
    username: username,
    email: emailId,
    incomes: [],
    expenses: [],
    assets: [],
    liabilities: [],
  });
  Data.find({ email: emailId }).exec().then((result) => res.send(result));
})

app.post("/addData", async (req, res) => {
  const newdata = req.body.data;
  const property = req.body.property;

  if (property === "income") {
    await Data.find({}).exec().then((result) => {
      result[0].incomes.push(newdata);
      result[0].save();
    });
  } else if (property === "expense") {
    await Data.find({}).exec().then((result) => {
      result[0].expenses.push(newdata);
      result[0].save();
    });
  } else if (property === "asset") {
    await Data.find({}).exec().then((result) => {
      result[0].assets.push(newdata);
      result[0].save();
    });
  } else if (property === "liability") {
    await Data.find({}).exec().then((result) => {
      result[0].liabilities.push(newdata);
      result[0].save();
    });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));