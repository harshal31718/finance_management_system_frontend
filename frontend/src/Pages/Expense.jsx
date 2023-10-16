import React from 'react'
import Sheet from '../components/Sheet/Sheet'

const Expense = ({ expenseData, addExpense, editExpense, deleteExpense }) => {
  return (
    <div className='expense'>
      <Sheet type="expense" data={expenseData} addTransaction={addExpense} editTransaction={editExpense} deleteTransaction={deleteExpense} />
    </div>
  )
}

export default Expense
