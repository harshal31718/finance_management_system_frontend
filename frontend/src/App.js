import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import Login from './Pages/Login';
import Home from './Pages/Home'
import Income from './Pages/Income';
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'
import NewTransaction from './components/NewTransaction/NewTransaction';
import Categories from './Pages/Categories';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from "primereact/overlaypanel";
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';

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
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const profileOP = useRef(null);

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
    setIncomes((prev) => {
      prev = prev.filter((element) => element._id !== data._id);
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
    setExpenses((prev) => {
      prev = prev.filter((element) => element._id !== data._id);
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
          <div className="layout" style={{ maxWidth: "100%" }}>
            <div className="d-flex justify-content-between fixed-top border border-black m-0 p-2">
              <div className="d-flex align-items-center">
                <ViewListIcon fontSize='large' onClick={() => setSideBarToggle(!sideBarToggle)} />
                <NavLink className="navbar-brand" to="/">FMS</NavLink>
              </div>
              <div className="d-flex align-items-top">
                <Avatar icon="pi pi-user" shape="circle" onClick={(e) => profileOP.current.toggle(e)} style={{ backgroundColor: '#222222', color: '#ffffff', width: '40px', height: "40px" }} />
                <OverlayPanel ref={profileOP}>
                  <div className="">
                    <div className="">
                      <h6 className="m-0 p-0">Hello! {profile.name}</h6>
                      <span>{profile.email}</span>
                    </div>
                    <div className="m-0 mt-2 p-0">
                      <button className="btn btn-outline-danger" type="button" onClick={logOut} size="small" >Log Out</button>
                    </div>
                  </div>
                </OverlayPanel>
              </div>
            </div>
            <div className='d-flex' style={{ paddingTop: "56px", height: "100vh" }}>
              <div className="border border-top-0 border-black m-0 px-2">
                <ul className="navbar-nav mr-auto" style={{ display: sideBarToggle ? '' : 'none' }}>
                  <li className="nav-item active">
                    <NavLink className="nav-link d-flex align-items-center" to="/"><HomeIcon fontSize="large" /></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/income"><AddShoppingCartIcon fontSize="large" /></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/expense"><ShoppingCartCheckoutIcon fontSize="large" /></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/assets"><BusinessIcon fontSize="large" /></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/liabilities"><DirectionsCarIcon fontSize="large" /></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/categories"><CategoryIcon fontSize="large" /></NavLink>
                  </li>
                </ul>
                <ul className="navbar-nav mr-auto" style={{ display: !sideBarToggle ? '' : 'none' }}>
                  <li className="nav-item active">
                    <NavLink className="nav-link d-flex align-items-center" to="/"><HomeIcon fontSize="large" />Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/income"><AddShoppingCartIcon fontSize="large" />Income</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/expense"><ShoppingCartCheckoutIcon fontSize="large" />Expense</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/assets"><BusinessIcon fontSize="large" />Assets</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/liabilities"><DirectionsCarIcon fontSize="large" />Liabilities</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link d-flex align-items-center" to="/categories"><CategoryIcon fontSize="large" />Categories</NavLink>
                  </li>
                </ul>
              </div>
              <div className='flex-grow-1 overflow-auto m-0 p-1' styl>
                <Routes>
                  <Route path='/' element={<Home profile={profile} incomes={incomes} expenses={expenses} assets={assets} liabilities={liabilities} />} />
                  <Route path='/income' element={<Income incomeData={incomes} incomeCategories={incomeCategories} addIncome={addIncome} editIncome={editIncome} deleteIncome={deleteIncome} />} />
                  <Route path='/expense' element={<Expense expenseData={expenses} expenseCategories={expenseCategories} addExpense={addExpense} editExpense={editExpense} deleteExpense={deleteExpense} />} />
                  <Route path='/assets' element={<Assets assetsData={assets} addAsset={addAsset} />} />
                  <Route path='/liabilities' element={<Liabilities liabilitiesData={liabilities} addLiability={addLiability} />} />
                  <Route path='/categories' element={<Categories incomeCategories={incomeCategories} expenseCategories={expenseCategories} addCategory={addCategory} addSubCategory={addSubCategory} />} />
                </Routes>
              </div>
            </div>
            <NewTransaction incomeCategories={incomeCategories} expenseCategories={expenseCategories} addUploadedData={addUploadedData} addIncome={addIncome} addExpense={addExpense} />
          </div>
        ) : (<Login logIn={logIn} />)}
      </div>
    </BrowserRouter>
  )
}

export default App