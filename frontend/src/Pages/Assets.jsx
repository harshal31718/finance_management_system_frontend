import React, { useState } from 'react'
import Cards from '../components/Cards/Cards';

const Assets = ({ assetsData, addAsset }) => {
  const [newAsset, setNewAsset] = useState({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewAsset((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }

  return (
    // cost to date income to date
    <div className='assets'>
      <h5>New Asset</h5>
      <div className='form'>
        <form onSubmit={(event) => {
          addAsset(newAsset);
          setNewAsset({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });
          event.preventDefault();
        }}>
          <input type='date' name='date' placeholder='Date of Investment' onChange={handleChange} value={newAsset.date} required />
          <input type='text' name='name' placeholder='Name' onChange={handleChange} value={newAsset.name} required />
          <input type='number' name='initialAmount' placeholder='Initial Amount' onChange={handleChange} value={newAsset.initialAmount} required />
          <input type='text' name='details' placeholder='Details' onChange={handleChange} value={newAsset.details} required />
          <input type='number' name='monthlyMaintainance' placeholder='Monthly Maintainance' onChange={handleChange} value={newAsset.monthlyMaintainance} required />
          <input type='number' name='monthlyIncome' placeholder='Monthly Income' onChange={handleChange} value={newAsset.monthlyIncome} required />
          {/* <input type='text' name='category' placeholder='Category' onChange={handleChange} value={newAsset.category} required /> */}
          <input type='text' name='note' placeholder='Note' onChange={handleChange} value={newAsset.note} />
          <input type='submit' value='submit' />
        </form>
      </div>
      <Cards data={assetsData}/>
    </div>
  )
}

export default Assets
