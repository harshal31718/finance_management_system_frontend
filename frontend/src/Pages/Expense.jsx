import React from 'react'
import Sheet from '../components/Sheet/Sheet'

const Expense = ({ expenseData, addExpense, deleteExpense }) => {
  let expenseCol = ["date", "amount", "category","subCategory", "description"];
  return (
    <div className='expense'>
      <h5>Manage Expenses</h5>
      <Sheet type="expense" columns={expenseCol} data={expenseData} addTransaction={addExpense} deleteTransaction={deleteExpense} />
    </div>
  )
}

export default Expense
