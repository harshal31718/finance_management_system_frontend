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
  transactions: [{
    transactionType: String,
    date: String,
    amount: Number,
    category: String,
    subCategory: String,
    description: String,
  }],
  assets: [{
    date: String,
    name: String,
    description: String,
    initialAmount: Number,
    monthlyMaintainance: Number,
    monthlyIncome: Number,
    note: String,
  }],
  liabilities: [{
    date: String,
    name: String,
    description: String,
    initialAmount: Number,
    monthlyMaintainance: Number,
    monthlyIncome: Number,
    note: String,
  }],
  categories: {
    incomeCategories: [{
      category: String,
      subCategories: [String],
    }],
    expenseCategories: [{
      category: String,
      subCategories: [String]
    }]
  }
});
const Data = mongoose.model("Data", dataSchema);

const defaultData = {
  name: "Demo Data",
  username: "DD",
  email: "dd@gmail.com",
  transactions: [
    {
      transactionType: "income",
      date: "12-10-2023",
      amount: 25000,
      category: "job",
      subCategory: "TCS",
      description: "Suspendisse ornare consequat lectus. In est risus",
    },
    {
      transactionType: "expense",
      date: "12-10-2023",
      amount: 1000,
      category: "online Shoping",
      subCategory: "amazon",
      description: "boat rockerz 255 pro",
    }
  ],
  assets: [{
    date: "12-10-2023",
    name: "2-bhk,Godda",
    initialAmount: "2500000",
    monthlyMaintainance: "1000",
    monthlyIncome: "13000",
    decription: "given for rental",
    note: "profitable",
  }, {
    date: "13-10-2023",
    name: "1-bhk,Nagpur",
    initialAmount: "1250000",
    monthlyMaintainance: "500",
    decription: "given for rental",
    monthlyIncome: "10000",
    note: "profitable",
  }],
  liabilities: [{
    date: "12-10-2023",
    name: "TVS Raider",
    description: "two wheeler bought in july",
    initialAmount: "137000",
    monthlyMaintainance: "1000",
    monthlyIncome: "0",
    note: "bike for daily use",
  }],
  categories: {
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
          console.log("New User Created");
          Data.create({
            name: profile.name,
            email: profile.email,
            transactions: defaultData.transactions,
            assets: defaultData.assets,
            liabilities: defaultData.liabilities,
            categories: defaultData.categories
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
      result[0].transactions.push({
        transactionType: obj.transactionType,
        date: obj.date,
        amount: obj.amount,
        category: obj.category,
        subCategory: obj.subCategory,
        description: obj.description,
      });
    });
    result[0].save();
  });
})

app.post("/addData", async (req, res) => {
  const property = req.body.property;
  const newdata = req.body.data;
  const email = req.body.email;
  if (property === "transaction") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].transactions.push(newdata);
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
      result[0].categories.incomeCategories.push(newdata);
      result[0].save();
    })
  } else if (property === "expenseCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].categories.expenseCategories.push(newdata);
      result[0].save();
    })
  } else if (property === "incomeSubCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].categories.incomeCategories.map((element) => {
        if (element.category === newdata.category)
          element.subCategories.push(newdata.subCategory);
        return 0;
      })
      result[0].save();
    })
  } else if (property === "expenseSubCategories") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].categories.expenseCategories.map((element) => {
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
  if (property === "transaction") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].transactions = result[0].transactions.filter((element) => element._id.toString() !== id);
      result[0].transactions.push(data);
      result[0].save();
    });
  }
});

app.post("/deleteData", async (req, res) => {
  const property = req.body.property;
  const id = req.body.id;
  const email = req.body.email;
  if (property === "transaction") {
    await Data.find({ email: email }).exec().then((result) => {
      result[0].transactions = result[0].transactions.filter((element) => element._id.toString() !== id);
      result[0].save();
    });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));