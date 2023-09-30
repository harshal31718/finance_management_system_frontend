import React, { useState } from 'react'
import Sheet from '../components/Sheet/Sheet'

const Expense = () => {
  let expense_col = ["Date", "Vendor", "Amount", "Category", "Note"];
  const [expenseData, setExpenseData] = useState([
    [{ value: "1" }, { value: "Vanilla" },  { value: "Chocolate" },{ value: "customisable" }],
    [{ value: "2" }, { value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "3" }, { value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "4" }, { value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "5" }, { value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "6" }, { value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "7" }, { value: "Strawberry" }, { value: "Cookies" }],
  ]);
  const updateExpenses = (d) => {
    console.log("changed");
    // console.log(d);
  }
  return (
    <div>
      Expense
      <Sheet col={expense_col} data={expenseData} update={updateExpenses} />
    </div>
  )
}

export default Expense
