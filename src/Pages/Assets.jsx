import React, { useState } from 'react'
import Cards from '../components/Cards/Cards';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

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
      <h5>Manage Assets</h5>
      <div className='card'>
        <div className='card d-flex justify-content-center align-items-center'>
          <form onSubmit={(event) => {
            addAsset(newAsset);
            setNewAsset({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });
            event.preventDefault();
          }}>
            <div className='container p-0 m-0'>
              <div className='row p-0 m-0'>
                <div className="col p-1 m-0">
                  <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' id='date' type='date' name='date' value={newAsset.date} onChange={handleChange} required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100 ' id="name" name="name" value={newAsset.name} label="Name" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="details" name='details' value={newAsset.details} label="Details" onChange={handleChange} size="small" required />
                </div>
              </div>
              <div className='row p-0 m-0'>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="initialAmount" type="number" name='initialAmount' value={newAsset.initialAmount} label="Initital Amount" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="monthlyMaintainance" type="number" name='monthlyMaintainance' value={newAsset.monthlyMaintainance} label="Monthly Maintainance" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="monthlyIncome" type="number" name='monthlyIncome' value={newAsset.monthlyIncome} label="Monthly Income" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="note" name='note' value={newAsset.note} label="Note" onChange={handleChange} size="small" />
                </div>
                <div className="col p-1 m-0 d-flex justify-content-center">
                  <Button className='m-0 p-0 h-100 w-100' type='submit' variant="contained"><AddIcon /> Asset</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='card mx-2'>
          <Cards data={assetsData} />
        </div>
      </div>
    </div>
  )
}

export default Assets
