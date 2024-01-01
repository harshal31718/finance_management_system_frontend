import React from 'react'
import Sheet from '../components/Sheet/Sheet'

const Expense = ({ expenseData, expenseCategories, addExpense, editExpense, deleteExpense }) => {
  return (
    <div className='expense'>
      <h5>Manage Expenses</h5>
      <Sheet type="expense" data={expenseData} categories={expenseCategories} addTransaction={addExpense} editTransaction={editExpense} deleteTransaction={deleteExpense} />
    </div>
  )
}

export default Expense
