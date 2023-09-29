import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './Pages/Home'
import Income from './Pages/Income'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/income' element={<Income/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App