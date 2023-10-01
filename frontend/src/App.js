import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import './App.css';
import Home from './Pages/Home'
import Income from './Pages/Income';
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'

const App = () => {

  const [transactions, setTransactions] = useState([[], []])

  const addIncome = (data) => {
    setTransactions((prev) => {
      prev[0].push(data);
      return prev;
    });
  }
  const addExpense = (data) => {
    setTransactions((prev) => {
      prev[1].push(data);
      return prev;
    });
  }

  return (
    <BrowserRouter>
      <Header />
      <div className='m-0 p-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/income' element={<Income incomeData={transactions[0]} addIncome={addIncome} />} />
          <Route path='/expense' element={<Expense expenseData={transactions[1]} addExpense={addExpense} />} />
          <Route path='/assets' element={<Assets />} />
          <Route path='/liabilities' element={<Liabilities />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App