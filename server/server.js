const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.Port || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

const url = "mongodb+srv://harshaldodke31718:Harshal123@cluster0.jfulnvb.mongodb.net/FMSDB";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
// mongoose.connect("mongodb://127.0.0.1/FMSDB", { useNewUrlParser: true });
mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to the database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

const dataSchema = new mongoose.Schema({
  id: Number,
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

const defaultData = new Data({
  id: 1,
  incomes: [
    { date: "25-3-2202", source: "income", amount: "500000", category: "job", note: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { date: "25-3-2202", source: "stock", amount: "10000", category: "investment", note: "asfdsa" },
    { date: "3-4-2023", source: "crypto", amount: "600000", category: "investment", note: "" },
    { date: "25-3-2202", source: "borrowed", amount: "100", category: "debt", note: "fdsafafasfa dasfadf ddsd" }
  ],
  expenses: [
    { date: "3-4-2023", vendor: "expenses", amount: "200", category: "shopping", note: "" },
    { date: "25-3-2202", vendor: "flipkart", amount: "232", category: "online", note: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { date: "3-4-2023", vendor: "bank", amount: "33333", category: "emi", note: "fdsafa" }
  ],
  assets: [
    { date: "25-3-2202", name: "assets", initialAmount: "22", details: "Some quick example text to build on the card title and make up the bulk of the card's content.", monthlyMaintainance: "3", monthlyIncome: "3", note: "this is out of wolrd" },
    { date: "23-3-2002", name: "fds", initialAmount: "3", details: "fdlasf", monthlyMaintainance: "3", monthlyIncome: "", note: "" },
    { date: "23-4-4333", name: "helo", initialAmount: "22", details: "fasdfalkfhlasdh", monthlyMaintainance: "3", monthlyIncome: "3", note: "" },
    { date: "3-4-2023", name: "stockksss", initialAmount: "4444", details: "", monthlyMaintainance: "", monthlyIncome: "4", note: "thisssssssssssssssssssssssssssssssssssssssssss" }
  ],
  liabilities: [
    { date: "25-3-2202", name: "liabilities", initialAmount: "22", details: "Some quick example text to build on the card title and make up the bulk of the card's content.", monthlyMaintainance: "3", monthlyIncome: "3", note: "this is out of wolrd" },
    { date: "23-3-2002", name: "fds", initialAmount: "3", details: "fdlasf", monthlyMaintainance: "3", monthlyIncome: "", note: "" },
    { date: "23-4-4333", name: "helo", initialAmount: "22", details: "fasdfalkfhlasdh", monthlyMaintainance: "3", monthlyIncome: "3", note: "" },
    { date: "3-4-2023", name: "stockksss", initialAmount: "4444", details: "", monthlyMaintainance: "", monthlyIncome: "4", note: "thisssssssssssssssssssssssssssssssssssssssssss" }
  ]
});

app.get("/getData", async (req, res) => {
  await Data.find({}).exec().then((result) => {
    if (result.length === 0) {
      Data.create(defaultData); // addData depends upon predefined values
      console.log("default Data succesfully added");
    }
    res.send(result);
  });
});

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});