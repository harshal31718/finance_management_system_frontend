import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import './App.css';
import Home from './Pages/Home'
import Income from './Pages/Income';
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [localData, setLocalData] = useState({});
  const [incomes, setIncomes] = useState([{}]);
  const [expenses, setExpenses] = useState([{}]);
  const [assets, setAssets] = useState([{}]);
  const [liabilities, setLiabilities] = useState([{}]);

  // useEffect(() => {
  //   Axios.get("http://localhost:4000/getData")
  //     .then((result) => {
  //       setCurrentUser({ name: result.data[0].name, email: result.data[0].email });
  //       setIncomes(result.data[0].incomes);
  //       setExpenses(result.data[0].expenses);
  //       setAssets(result.data[0].assets);
  //       setLiabilities(result.data[0].liabilities);
  //     })
  //     .catch((error) => { error = new Error(); })
  // }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      Axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
        .then((res) => {
          const email = res.data.email;
          setProfile(res.data);
          Axios.get("http://localhost:4000/getData", { params: { emailId: email } })
            .then((result) => {
              setLocalData({ name: result.data[0].name, email: result.data[0].email, username: result.data[0].username });
              setIncomes(result.data[0].incomes);
              setExpenses(result.data[0].expenses);
              setAssets(result.data[0].assets);
              setLiabilities(result.data[0].liabilities);
            })
            .catch((error) => { error = new Error(); });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    setLocalData({});
    setIncomes([{}]);
    setExpenses([{}]);
    setAssets([{}]);
    setLiabilities([{}]);
  }

  const addIncome = (data) => {
    setIncomes((prev) => [...prev, data]);
    const property = "income";
    Axios.post("http://localhost:4000/addData", { property, data });
  }
  const addExpense = (data) => {
    setExpenses((prev) => [...prev, data]);
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
      <div className='login'>
        {profile ? (
          <>
            <Header logOut={logOut} />
            <div className='m-0 p-2'>
              <Routes>
                <Route path='/home' element={<Home profile={localData} incomes={incomes} expenses={expenses} assets={assets} liabilities={liabilities} />} />
                <Route path='/income' element={<Income incomeData={incomes} addIncome={addIncome} />} />
                <Route path='/expense' element={<Expense expenseData={expenses} addExpense={addExpense} />} />
                <Route path='/assets' element={<Assets assetsData={assets} addAsset={addAsset} />} />
                <Route path='/liabilities' element={<Liabilities liabilitiesData={liabilities} addLiability={addLiability} />} />
              </Routes>
            </div>
          </>
        ) : (
          <>
            <h2>Google Login</h2>
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App