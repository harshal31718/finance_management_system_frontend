import React, { useState } from 'react'
import Sheet from '../components/Sheet/Sheet'

const Expense = ({data}) => {
  let expense_col = ["Date", "Vendor", "Amount", "Category", "Note"];
  return (
    <div>
      Expense
      <Sheet col={expense_col} data={data}/>
    </div>
  )
}

export default Expense
