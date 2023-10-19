// https://primereact.org/
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Login from './Pages/Login';
import Home from './Pages/Home'
import Income from './Pages/Income';
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'
import NewTransaction from './components/NewTransaction/NewTransaction';
import Categories from './Pages/Categories';

const App = () => {
  // google useStates
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // local useStates
  const [incomes, setIncomes] = useState([{}]);
  const [expenses, setExpenses] = useState([{}]);
  const [assets, setAssets] = useState([{}]);
  const [liabilities, setLiabilities] = useState([{}]);
  const [incomeCategories, setIncomeCategories] = useState([{}]);
  const [expenseCategories, setExpenseCategories] = useState([{}]);

  const logIn = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (!user) {
      Axios.get("http://localhost:4000/user").then((result) => {
        setUser(result.data);
      }).catch((error) => { error = new Error(); });
    }
    if (user) {
      Axios.get("http://localhost:4000/login", { params: { user: user } })
        .then(async (result) => {
          const userData = result.data.userData;
          const profile = result.data.profile;
          setIncomes(userData[0].incomes);
          setExpenses(userData[0].expenses);
          setAssets(userData[0].assets);
          setLiabilities(userData[0].liabilities);
          setIncomeCategories(userData[0].incomeCategories);
          setExpenseCategories(userData[0].expenseCategories);
          setProfile(profile);
        })
        .catch((error) => { error = new Error(); });
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    Axios.post("http://localhost:4000/logout");
    setProfile(null);
    setUser(null);
    setIncomes([{}]);
    setExpenses([{}]);
    setAssets([{}]);
    setLiabilities([{}]);
  }

  const addUploadedData = (uploadData) => {
    const data = JSON.parse(uploadData);
    data.map(obj => {
      if (obj.credit === null) setExpenses((prev) => [...prev, { date: obj.date, amount: obj.debit, category: "others", subCategory: "others", description: obj.details, }]);
      else setIncomes((prev) => [...prev, { date: obj.date, amount: obj.credit, category: "others", subCategory: "others", description: obj.details, }]);
      return 0;
    });
    Axios.post("http://localhost:4000/addUploadedTransactions", { data, email: profile.email });
  }
  const addIncome = (data) => {
    setIncomes((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "income", data, email: profile.email });
  }
  const editIncome = (data) => {
    const id = data._id;
    setIncomes((prev) => {
      prev = prev.filter((element) => element._id !== id);
      return [...prev, data]
    })
    Axios.post("http://localhost:4000/editData", { property: "income", data, email: profile.email });
  }
  const deleteIncome = (id) => {
    setIncomes(() => incomes.filter((element) => element._id !== id));
    Axios.post("http://localhost:4000/deleteData", { property: "income", id, email: profile.email });
  }
  const addExpense = (data) => {
    setExpenses((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "expense", data, email: profile.email });
  }
  const editExpense = (data) => {
    const id = data._id;
    setExpenses((prev) => {
      prev = prev.filter((element) => element._id !== id);
      return [...prev, data]
    })
    Axios.post("http://localhost:4000/editData", { property: "expense", data, email: profile.email });
  }
  const deleteExpense = (id) => {
    setExpenses(() => expenses.filter((element) => element._id !== id));
    Axios.post("http://localhost:4000/deleteData", { property: "expense", id, email: profile.email });
  }
  const addAsset = (data) => {
    setAssets((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "asset", data, email: profile.email });
  }
  const addLiability = (data) => {
    setLiabilities((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "liability", data, email: profile.email });
  }
  const addCategory = (newCategory, type) => {
    if (type === "income") {
      setIncomeCategories((prev) => [...prev, newCategory])
      Axios.post("http://localhost:4000/addData", { property: "incomeCategories", data: newCategory, email: profile.email });
    }
    else if (type === "expense") {
      setExpenseCategories((prev) => [...prev, newCategory])
      Axios.post("http://localhost:4000/addData", { property: "expenseCategories", data: newCategory, email: profile.email });
    }
  }
  const addSubCategory = (newSubCategory, type) => {
    if (type === "income") {
      setIncomeCategories((prev) => {
        prev.map((element) => {
          if (element.category === newSubCategory.category) element.subCategories.push(newSubCategory.subCategory);
          return 0;
        })
        return prev;
      })
      Axios.post("http://localhost:4000/addData", { property: "incomeSubCategories", data: newSubCategory, email: profile.email });
    }
    else if (type === "expense") {
      setExpenseCategories((prev) => {
        prev.map((element) => {
          if (element.category === newSubCategory.category) element.subCategories.push(newSubCategory.subCategory);
          return 0;
        })
        return prev;
      })
      Axios.post("http://localhost:4000/addData", { property: "expenseSubCategories", data: newSubCategory, email: profile.email });
    }
  }


  return (
    <BrowserRouter>
      <div className='login'>
        {(user && profile) ? (
          <>
            <Header logOut={logOut} />
            <div className='px-3' style={{ marginTop: "56px" }}>
              <Routes>
                <Route path='/' element={<Home profile={profile} incomes={incomes} expenses={expenses} assets={assets} liabilities={liabilities} />} />
                <Route path='/income' element={<Income incomeData={incomes} incomeCategories={incomeCategories} addIncome={addIncome} editIncome={editIncome} deleteIncome={deleteIncome} />} />
                <Route path='/expense' element={<Expense expenseData={expenses} expenseCategories={expenseCategories} addExpense={addExpense} editExpense={editExpense} deleteExpense={deleteExpense} />} />
                <Route path='/assets' element={<Assets assetsData={assets} addAsset={addAsset} />} />
                <Route path='/liabilities' element={<Liabilities liabilitiesData={liabilities} addLiability={addLiability} />} />
                <Route path='/categories' element={<Categories incomeCategories={incomeCategories} expenseCategories={expenseCategories} addCategory={addCategory} addSubCategory={addSubCategory} />} />
              </Routes>
            </div>
            <NewTransaction incomeCategories={incomeCategories} expenseCategories={expenseCategories} addUploadedData={addUploadedData} addIncome={addIncome} addExpense={addExpense} />
          </>
        ) : (<Login logIn={logIn} />)}
      </div>
    </BrowserRouter>
  )
}

export default App