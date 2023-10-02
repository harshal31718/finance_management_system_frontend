import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import './App.css';
import Home from './Pages/Home'
import Income from './Pages/Income';
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'

const App = () => {
  const [incomes, setIncomes] = useState([{}]);
  const [expenses, setExpenses] = useState([{}]);
  const [assets, setAssets] = useState([{}]);
  const [liabilities, setLiabilities] = useState([{}]);

  useEffect(() => {
    Axios.get("http://localhost:4000/getData")
      .then((result) => {
        setIncomes(result.data[0].incomes);
        setExpenses(result.data[0].expenses);
        setAssets(result.data[0].assets);
        setLiabilities(result.data[0].liabilities);
      })
      .catch((error) => { error = new Error(); })
  }, []);

  const addIncome = (data) => {
    setIncomes((prev) => [...prev,data]);
    const property = "income";
    Axios.post("http://localhost:4000/addData", { property, data });
  }
  const addExpense = (data) => {
    setExpenses((prev) => [...prev,data]);
    const property = "expense";
    Axios.post("http://localhost:4000/addData", { property, data });
  }
  const addAsset = (data) => {
    setAssets((prev) => [...prev, data]);
    const property = "asset";
    Axios.post("http://localhost:4000/addData", { property, data });
  }
  const addLiability = (data) => {
    setLiabilities((prev) => [...prev, data]);
    const property = "liability";
    Axios.post("http://localhost:4000/addData", { property, data });
  }

  return (
    <BrowserRouter>
      <Header />
      <div className='m-0 p-2'>
        <Routes>
          <Route path='/' element={<Home incomes={incomes} expenses={expenses} assets={assets} liabilities={liabilities} />} />
          <Route path='/income' element={<Income incomeData={incomes} addIncome={addIncome} />} />
          <Route path='/expense' element={<Expense expenseData={expenses} addExpense={addExpense} />} />
          <Route path='/assets' element={<Assets assetsData={assets} addAsset={addAsset} />} />
          <Route path='/liabilities' element={<Liabilities liabilitiesData={liabilities} addLiability={addLiability} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App