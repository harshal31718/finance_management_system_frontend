const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    key: Number,
    id: Number,
    transactions: [
        [{
            date: Date,
            source: String,
            amount: Number,
            category: String,
            note: String,
        }],
        [{
            date: Date,
            vendor: String,
            amount: Number,
            category: String,
            note: String,
        }]
    ],
    assets: [{
        date: Date,
        name: String,
        initialAmount: Number,
        details: String,
        monthlyMaintainance: Number,
        monthlyIncome: Number,
        note: String,
    }],
    liabilities: [{
        date: Date,
        name: String,
        initialAmount: Number,
        details: String,
        monthlyMaintainance: Number,
        monthlyIncome: Number,
        note: String,
    }],
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;