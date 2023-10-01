import React from 'react'
import List from '../components/List/List'

const Home = ({transactions, assets, liabilities}) => {
  return (
    <div>
      <h3>Dashboard</h3>
      <div className='container bg-black bg-opacity-50' >
        <div className='row m-0 p-1'>
          <div className='col bg-white m-2'>
            <h4>Incomes</h4>
            <List data={transactions[0]}/>
          </div>
          <div className='col bg-white m-2'>
            <h4>Expenses</h4>
            <List data={transactions[1]}/>
          </div>
        </div>
        <div className='row m-0 p-1'>
          <div className='col bg-white m-2'>
            <h4>Assets</h4>
            <List data={assets}/>
          </div>
          <div className='col bg-white m-2'>
            <h4>Liabilities</h4>
            <List data={liabilities}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
