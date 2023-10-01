import React, { useState } from 'react'
import Sheet from '../components/Sheet/Sheet'

const Expense = ({ expenseData, addExpense }) => {
  let expenseCol = ["Date", "Vendor", "Amount", "Category", "Note"];
  const [newExpense, setNewExpense] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setNewExpense((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }
  return (
    <div className='expense'>
      <h5>New Expense</h5>
      <div className='form'>
        <form onSubmit={(event) => {
          if (newExpense.amount) {
            addExpense(newExpense);
            setNewExpense({ date: "", vendor: "", amount: "", category: "", note: "" });
          }
          event.preventDefault();
        }}>
          <input type='date' name='date' placeholder='Date' onChange={handleChange} value={newExpense.date} required />
          <input type='text' name='vendor' placeholder='Vendor' onChange={handleChange} value={newExpense.vendor} required />
          <input type='number' name='amount' placeholder='Amount' onChange={handleChange} value={newExpense.amount} required />
          <input type='text' name='category' placeholder='Category' onChange={handleChange} value={newExpense.category} required />
          <input type='text' name='note' placeholder='Note' onChange={handleChange} value={newExpense.note} />
          <input type='submit' value='submit' />
        </form>
      </div>
      <Sheet columns={expenseCol} data={expenseData} />
    </div>
  )
}

export default Expense
