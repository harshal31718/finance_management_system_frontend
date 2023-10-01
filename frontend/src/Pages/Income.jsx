import React, { useState } from 'react'
import Sheet from '../components/Sheet/Sheet'

const Income = ({ incomeData, addIncome }) => {
  let incomeCol = ["Date", "Source", "Amount", "Category", "Note"];
  const [newIncome, setNewIncome] = useState({ date: "", source: "", amount: "", category: "", note: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewIncome((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }

  return (
    <div className='income'>
      <h5>New Income</h5>
      <div className='form'>
        <form onSubmit={(event) => {
          addIncome(newIncome);
          setNewIncome({ date: "", source: "", amount: "", category: "", note: "" });
          event.preventDefault();
        }}>
          <input type='date' name='date' placeholder='Date' onChange={handleChange} value={newIncome.date} required />
          <input type='text' name='source' placeholder='Source' onChange={handleChange} value={newIncome.source} required />
          <input type='number' name='amount' placeholder='Amount' onChange={handleChange} value={newIncome.amount} required />
          <input type='text' name='category' placeholder='Category' onChange={handleChange} value={newIncome.category} required />
          <input type='text' name='note' placeholder='Note' onChange={handleChange} value={newIncome.note} />
          <input type='submit' value='submit' />
        </form>
      </div>
      <Sheet columns={incomeCol} data={incomeData} />
    </div>
  )
}

export default Income