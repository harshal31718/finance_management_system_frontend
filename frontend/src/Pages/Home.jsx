import React from 'react'
import List from '../components/List/List'

const Home = ({ profile, incomes, expenses, assets, liabilities }) => {
  return (
    <div className='home'>
      <div className='info'>
        <h3>Dashboard</h3>
        <h6>Name: {profile.name}</h6>
        {/* <h6>User Name: {profile.username}</h6> */}
        <h6>Email: {profile.email}</h6>
      </div>
      <div className='container bg-black bg-opacity-50' >
        <div className='row m-0 p-1'>
          <div className='col bg-white m-2'>
            <h4>Incomes</h4>
            <List data={incomes} />
          </div>
          <div className='col bg-white m-2'>
            <h4>Expenses</h4>
            <List data={expenses} />
          </div>
        </div>
        <div className='row m-0 p-1'>
          <div className='col bg-white m-2'>
            <h4>Assets</h4>
            <List data={assets} />
          </div>
          <div className='col bg-white m-2'>
            <h4>Liabilities</h4>
            <List data={liabilities} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
