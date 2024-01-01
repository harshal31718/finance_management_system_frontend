import React, { useState } from 'react'
import Cards from '../components/Cards/Cards';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const Liabilities = ({ liabilitiesData, addLiability }) => {
  const [newLiability, setNewLiability] = useState({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewLiability((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }
  return (
    <div className='liabilities'>
      <h5>Manage Liabilities</h5>
      <div className='card'>
        <div className='card d-flex justify-content-center align-items-center'>
          <form onSubmit={(event) => {
            addLiability(newLiability);
            setNewLiability({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });
            event.preventDefault();
          }}>
            <div className='container p-0 m-0'>
              <div className='row p-0 m-0'>
                <div className="col p-1 m-0">
                  <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' id='date' type='date' name='date' value={newLiability.date} onChange={handleChange} required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100 ' id="name" name="name" value={newLiability.name} label="Name" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="details" name='details' value={newLiability.details} label="Details" onChange={handleChange} size="small" required />
                </div>
              </div>
              <div className='row p-0 m-0'>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="initialAmount" type="number" name='initialAmount' value={newLiability.initialAmount} label="Initital Amount" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="monthlyMaintainance" type="number" name='monthlyMaintainance' value={newLiability.monthlyMaintainance} label="Monthly Maintainance" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="monthlyIncome" type="number" name='monthlyIncome' value={newLiability.monthlyIncome} label="Monthly Income" onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="note" name='note' value={newLiability.note} label="Note" onChange={handleChange} size="small" />
                </div>
                <div className="col p-1 m-0 d-flex justify-content-center">
                  <Button className='m-0 p-0 h-100 w-100' type='submit' variant="contained"><AddIcon /> Liability</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='card mx-2'>
          <Cards data={liabilitiesData} />
        </div>
      </div>
    </div>
  )
}

export default Liabilities