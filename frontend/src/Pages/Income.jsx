import React, { useState } from 'react'
import Sheet from '../components/Sheet/Sheet';

const Income = () => {
  let income_col = ["Date", "Source", "Amount", "Category", "Note"];
  const [incomeData, setIncomeData] = useState([
    [{ value: "1-1-23" },{value:"job"}, { value: 100 }, { value: "Job" }, { value: "Company" }],
    [{ value: "2-1-23" },{value:"stock"}, { value: 103 }, { value: "Stocks" }, { value: "Cookies" }],
    [{ value: "3-1-23" },{value:"job"}, { value: 105 }, { value: "Real Estate" }, { value: "dd" }],
    [{ value: "4-1-23" },{value:"crypto"}, { value: 555 }, { value: "Crypto" }, { value: "Binance" }],
    [{ value: "5-1-23" },{value:"job"}, { value: 21 }, { value: "MF" }, { value: "Grow" }],
    [{ value: "6-1-23" },{value:"job"}, { value: 98880 }, { value: "Job" }, { value: "Company" }],
  ]);
  const updateIncome = (d) => {
    console.log("changed");
    // console.log(d);
  }
  return (
    <div className=''>
      Income
      <Sheet col={income_col} data={incomeData} update={updateIncome} />
    </div>
  )
}

export default Income