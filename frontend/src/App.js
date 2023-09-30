import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './Pages/Home'
// import Income from './Pages/Income'
import Expense from './Pages/Expense'
import Assets from './Pages/Assets'
import Liabilities from './Pages/Liabilities'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className='m-0 p-2'>
        <Routes>
          <Route path='/' element={<Home/>} />
          {/* <Route path='/income' element={<Income/>} /> */}
          <Route path='/expense' element={<Expense/>} />
          <Route path='/assets' element={<Assets/>} />
          <Route path='/liabilities' element={<Liabilities />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App