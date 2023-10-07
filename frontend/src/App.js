import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home'
import Income from './Pages/Income';
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'

const App = () => {
  // google useStates
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // local useStates
  const [incomes, setIncomes] = useState([{}]);
  const [expenses, setExpenses] = useState([{}]);
  const [assets, setAssets] = useState([{}]);
  const [liabilities, setLiabilities] = useState([{}]);

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
  }, [])

  useEffect(() => {
    if (user) {
      Axios.get("http://localhost:4000/login", { params: { user: user } })
        .then(async (result) => {
          const userData = result.data.userData;
          const profile = result.data.profile;
          setIncomes(userData[0].incomes);
          setExpenses(userData[0].expenses);
          setAssets(userData[0].assets);
          setLiabilities(userData[0].liabilities);
          setProfile(profile);
        })
        .catch((error) => { error = new Error(); });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     Axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //       headers: {
  //         Authorization: `Bearer ${user.access_token}`,
  //         Accept: 'application/json'
  //       }
  //     })
  //       .then((res) => {
  //         const email = res.data.email;
  //         const name = res.data.name;
  //         // const username = localData.username;
  //         setProfile(res.data);
  //         Axios.get("http://localhost:4000/login", { params: { email: email, name: name } })
  //           .then((result) => {
  //             setLocalData({ name: result.data[0].name, email: result.data[0].email });
  //             setIncomes(result.data[0].incomes);
  //             setExpenses(result.data[0].expenses);
  //             setAssets(result.data[0].assets);
  //             setLiabilities(result.data[0].liabilities);
  //           })
  //           .catch((error) => { error = new Error(); });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

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

  const addIncome = (data) => {
    setIncomes((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "income", data, email: profile.email });
  }
  const addExpense = (data) => {
    setExpenses((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "expense", data, email: profile.email });
  }
  const addAsset = (data) => {
    setAssets((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "asset", data, email: profile.email });
  }
  const addLiability = (data) => {
    setLiabilities((prev) => [...prev, data]);
    Axios.post("http://localhost:4000/addData", { property: "liability", data, email: profile.email });
  }

  return (
    <BrowserRouter>
      <div className='login'>
        {(user && profile) ? (
          <>
            <Header logOut={logOut} />
            <div className='m-0 p-2'>
              <Routes>
                <Route path='/home' element={<Home profile={profile} incomes={incomes} expenses={expenses} assets={assets} liabilities={liabilities} />} />
                <Route path='/income' element={<Income incomeData={incomes} addIncome={addIncome} />} />
                <Route path='/expense' element={<Expense expenseData={expenses} addExpense={addExpense} />} />
                <Route path='/assets' element={<Assets assetsData={assets} addAsset={addAsset} />} />
                <Route path='/liabilities' element={<Liabilities liabilitiesData={liabilities} addLiability={addLiability} />} />
              </Routes>
            </div>
          </>
        ) : (<Login logIn={logIn} />)}
      </div>
    </BrowserRouter>
  )
}

export default App