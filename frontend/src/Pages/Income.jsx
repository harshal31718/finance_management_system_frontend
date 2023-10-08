import React from 'react'
import Sheet from '../components/Sheet/Sheet'

const Income = ({ incomeData, addIncome, deleteIncome }) => {
  let incomeCol = ["date", "source", "amount", "category", "note"];
  return (
    <div className='income'>
      <h5>Manage Incomes</h5>
      <Sheet type="income" columns={incomeCol} data={incomeData} addTransaction={addIncome} deleteTransaction={deleteIncome} />
    </div>
  )
}

export default Income