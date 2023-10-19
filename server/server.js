const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Axios = require("axios");

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
    amount: Number,
    category: String,
    subCategory: String,
    description: String,
  }],
  expenses: [{
    date: String,
    amount: Number,
    category: String,
    subCategory: String,
    description: String,
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
  incomeCategories: [{
    category: String,
    subCategories: [String],
  }],
  expenseCategories: [{
    category: String,
    subCategories: [String]
  }]
});
const Data = mongoose.model("Data", dataSchema);

const defaultData = {
  name: "Demo Data",
  username: "DD",
  email: "dd@gmail.com",
  incomes: [{
    date: "12-10-2023",
    amount: 25000,
    category: "job",
    subCategory: "TCS",
    description: "Suspendisse ornare consequat lectus. In est risus",
  }],
  expenses: [{
    date: "12-10-2023",
    amount: 1000,
    category: "online Shoping",
    subCategory: "amzon",
    description: "boat rockerz 255 pro"
  }],
  assets: [{
    date: "12-10-2023",
    name: "2-bhk,Godda",
    initialAmount: "2500000",
    details: "given for rental",
    monthlyMaintainance: "1000",
    monthlyIncome: "13000",
    note: "profitable",
  }],
  liabilities: [{
    date: "12-10-2023",
    name: "TVS Raider",
    initialAmount: "137000",
    details: "two wheeler bought in july",
    monthlyMaintainance: "1000",
    monthlyIncome: "0",
    note: "bike for daily use",
  }],
  incomeCategories: [
    { category: "job", subCategories: ["TCS", "google"] },
    { category: "stock", subCategories: ["axisBank", "tataMotors", "hdfc"] },
    { category: "realestate", subCategories: ["bunglow", "2bhk", "3,bhk"] }
  ],
  expenseCategories: [
    { category: "Home", subCategories: ["mother", "brother"] },
    { category: "Living", subCategories: ["rent", "food"] },
    { category: "travel", subCategories: ["daily", "homeTravel"] },
  ]
}

let prevUser = null;
app.get("/user", (req, res) => {
  res.send(prevUser);
})

app.get("/login", async (req, res) => {
  const user = req.query.user;
  prevUser = user;
  Axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
      Accept: 'application/json'
    }
  })
    .then(async (response) => {
      const profile = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        picture: response.data.picture,
      }
      await Data.find({ email: profile.email }).exec().then((userData) => {
        if (userData.length == 0) {
          console.log("creating user");
          Data.create({
            name: profile.name,
            email: profile.email,
            incomes: defaultData.incomes,
            expenses: defaultData.expenses,
            assets: defaultData.assets,
            liabilities: defaultData.liabilities,
            incomeCategories: defaultData.incomeCategories,
            expenseCategories: defaultData.expenseCategories
          });
          Data.find({ email: profile.email }).exec().then((userData) => res.send({ userData, profile }));
        } else {
          console.log("sending user");
          res.send({ userData, profile });
        }
      });
    })
    .catch((err) => console.log(err));
});

app.post("/logout", async (req, res) => {
  prevUser = null;
})

app.post("/addUploadedTransactions", async (req, res) => {
  const newData = req.body.data;
  const email = req.body.email;

  await Data.find({ email: email }).exec().then((result) => {
    newData.map(obj => {
      if (obj.credit === null) {
        result[0].expenses.push({
          date: obj.date,
          amount: obj.debit,
          category: "others",
          subCategory: "others",
          description: obj.details,
        });
      }
      else {
        result[0].incomes.push({
          date: obj.date,
          amount: obj.credit,
          category: "others",
          subCategory: "others",
          description: obj.details,
        });
      }
    });
    result[0].save();
  });
})

app.post("/addData", async (req, res) => {
  const property = req.body.property;
  const newdata = req.body.data;
  const email = req.body.email;

  if (property === "income") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].incomes.push(newdata);
      result[0].save();
    });
  } else if (property === "expense") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].expenses.push(newdata);
      result[0].save();
    });
  } else if (property === "asset") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].assets.push(newdata);
      result[0].save();
    });
  } else if (property === "liability") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].liabilities.push(newdata);
      result[0].save();
    });
  } else if (property === "incomeCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].incomeCategories.push(newdata);
      result[0].save();
    })
  } else if (property === "expenseCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].expenseCategories.push(newdata);
      result[0].save();
    })
  } else if (property === "incomeSubCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].incomeCategories.map((element) => {
        if (element.category === newdata.category)
          element.subCategories.push(newdata.subCategory);
        return 0;
      })
      result[0].save();
    })
  } else if (property === "expenseSubCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].expenseCategories.map((element) => {
        if (element.category === newdata.category)
          element.subCategories.push(newdata.subCategory);
        return 0;
      })
      result[0].save();
    })
  }
});


app.post("/editData", async (req, res) => {
  const property = req.body.property;
  const data = req.body.data;
  const email = req.body.email;
  const id = data._id;
  if (property === "income") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].incomes = result[0].incomes.filter((element) => element._id.toString() !== id);
      result[0].incomes.push(data);
      result[0].save();
    });
  }
  if (property === "expense") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].expenses = result[0].expenses.filter((element) => element._id.toString() !== id);
      result[0].expenses.push(data);
      result[0].save();
    });
  }
});
app.post("/deleteData", async (req, res) => {
  const property = req.body.property;
  const id = req.body.id;
  const email = req.body.email;
  if (property === "income") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].incomes = result[0].incomes.filter((element) => element._id.toString() !== id);
      result[0].save();
    });
  }
  if (property === "expense") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].expenses = result[0].expenses.filter((element) => element._id.toString() !== id);
      result[0].save();
    });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));