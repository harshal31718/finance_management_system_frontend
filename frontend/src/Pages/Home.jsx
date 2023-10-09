import React from 'react'
import List from '../components/List/List'

const Home = ({ profile, incomes, expenses, assets, liabilities }) => {
  return (
    <div className='home d-flex flex-column'>
      <div className='m-0 p-1'>
        <h4>Dashboard</h4>
      </div>
      <div className='d-flex'>
        <div className='m-0 p-1'>
          <h6>Name: {profile.name}</h6>
          <h6>Email: {profile.email}</h6>
        </div>
        <div className='container p-1 bg-primary bg-opacity-25' >
          <div className='row m-0 p-0'>
            <div className='col m-1 p-0' style={{ height: "30vh" }}>
              <List type="income" data={incomes} />
            </div>
            <div className='col m-1 p-0' style={{ height: "30vh" }}>
              <List type="expense" data={expenses} />
            </div>
          </div>
          <div className='row m-0 p-0'>
            <div className='col m-1 p-0' style={{ height: "30vh" }}>
              <List type="asset" data={assets} />
            </div>
            <div className='col m-1 p-0' style={{ height: "30vh" }}>
              <List type="liabilitie" data={liabilities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
