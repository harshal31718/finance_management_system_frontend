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

  const [transactions, setTransactions] = useState([
    [
      { date: "25-3-2202", source: "job", amount: "500000", category: "job", note: "Some quick example text to build on the card title and make up the bulk of the card's content." },
      { date: "25-3-2202", source: "stock", amount: "10000", category: "investment", note: "asfdsa" },
      { date: "3-4-2023", source: "crypto", amount: "600000", category: "investment", note: "" },
      { date: "25-3-2202", source: "borrowed", amount: "100", category: "debt", note: "fdsafafasfa dasfadf ddsd" }
    ],
    [
      { date: "3-4-2023", vendor: "amazon", amount: "200", category: "shopping", note: "" },
      { date: "25-3-2202", vendor: "flipkart", amount: "232", category: "online", note: "Some quick example text to build on the card title and make up the bulk of the card's content." },
      { date: "3-4-2023", vendor: "bank", amount: "33333", category: "emi", note: "fdsafa" }
    ]]);
  const [assets, setAssets] = useState([
    { date: "25-3-2202", name: "helo", initialAmount: "22", details: "Some quick example text to build on the card title and make up the bulk of the card's content.", monthlyMaintainance: "3", monthlyIncome: "3", note: "this is out of wolrd" },
    { date: "23-3-2002", name: "fds", initialAmount: "3", details: "fdlasf", monthlyMaintainance: "3", monthlyIncome: "", note: "" },
    { date: "23-4-4333", name: "helo", initialAmount: "22", details: "fasdfalkfhlasdh", monthlyMaintainance: "3", monthlyIncome: "3", note: "" },
    { date: "3-4-2023", name: "stockksss", initialAmount: "4444", details: "", monthlyMaintainance: "", monthlyIncome: "4", note: "thisssssssssssssssssssssssssssssssssssssssssss" }
  ]);
  const [liabilities, setLiabilities] = useState([
    { date: "25-3-2202", name: "helo", initialAmount: "22", details: "Some quick example text to build on the card title and make up the bulk of the card's content.", monthlyMaintainance: "3", monthlyIncome: "3", note: "this is out of wolrd" },
    { date: "23-3-2002", name: "fds", initialAmount: "3", details: "fdlasf", monthlyMaintainance: "3", monthlyIncome: "", note: "" },
    { date: "23-4-4333", name: "helo", initialAmount: "22", details: "fasdfalkfhlasdh", monthlyMaintainance: "3", monthlyIncome: "3", note: "" },
    { date: "3-4-2023", name: "stockksss", initialAmount: "4444", details: "", monthlyMaintainance: "", monthlyIncome: "4", note: "thisssssssssssssssssssssssssssssssssssssssssss" }
  ]);

  useEffect(() => {
    Axios.get("http://localhost:4000/getData")
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => { error = new Error(); })
  }, []);

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
  const addAsset = (data) => {
    setAssets((prev) => [...prev, data]);
  }
  const addLiability = (data) => {
    setLiabilities((prev) => [...prev, data]);
  }

  return (
    <BrowserRouter>
      <Header />
      <div className='m-0 p-2'>
        <Routes>
          <Route path='/' element={<Home transactions={transactions} assets={assets} liabilities={liabilities} />} />
          <Route path='/income' element={<Income incomeData={transactions[0]} addIncome={addIncome} />} />
          <Route path='/expense' element={<Expense expenseData={transactions[1]} addExpense={addExpense} />} />
          <Route path='/assets' element={<Assets assetsData={assets} addAsset={addAsset} />} />
          <Route path='/liabilities' element={<Liabilities liabilitiesData={liabilities} addLiability={addLiability} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App