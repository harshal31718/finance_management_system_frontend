import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
// import Home from './Pages/Home'
import Income from './Pages/Income'
// import Expense from './Pages/Expense'
// import Assets from './Pages/Assets'
// import Liabilities from './Pages/Liabilities'

const App = () => {

  const [transactions, setTransactions] = useState([[],[]])

  return (
    <BrowserRouter>
      <Header />
      <Income data={transactions[0]} />
      {/* //   <Header />
    //   <div className='m-0 p-2'>
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/income' element={<Income data={transactions[0]} />} />
    //       <Route path='/expense' element={<Expense data={transactions[1]} />} />
    //       <Route path='/assets' element={<Assets />} />
    //       <Route path='/liabilities' element={<Liabilities />} />
    //     </Routes>
    //   </div> */}
    </BrowserRouter>
  )
}

export default App