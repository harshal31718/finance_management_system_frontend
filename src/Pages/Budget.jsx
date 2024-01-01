import React, { useState } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataView } from 'primereact/dataview';


const Budget = ({ incomeCategories, expenseCategories }) => {
  const [incomeBudget, setIncomeBudget] = useState([]);
  const [expenseBudget, setExpenseBudget] = useState([]);
  const [newIncomeBudget, setNewIncomeBudget] = useState({ name: "", amount: "", category: "", subCategory: "" })
  const [newExpenseBudget, setNewExpenseBudget] = useState({ name: "", amount: "", category: "", subCategory: "" })

  const handleIncome = (e) => { setNewIncomeBudget((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }
  const handleExpense = (e) => { setNewExpenseBudget((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }

  const itemTemplate = (data) =>
    <div className="col-12 d-flex justify-content-between m-0 px-2">
      <div style={{ width: '30%' }}>{data.name}</div>
      <div style={{ width: '50%' }}>{data.category}<i className='pi pi-arrow-right' style={{ fontSize: '0.7rem' }} />{data.subCategory}</div>
      <div style={{ width: '20%' }}>{data.amount}</div>
    </div>

  return (
    <div className='budget d-flex justify-content-between'>
      <div className='card m-0 p-1 w-100'>
        IncomeBudget
        <form className='container' onSubmit={(event) => {
          setIncomeBudget((prev) => [...prev, newIncomeBudget]);
          setNewIncomeBudget({ name: "", amount: "", category: "", subCategory: "" });
          event.preventDefault();
        }}>
          <div className='row m-0 p-1'>
            <div className='col m-0 p-1'>
              <TextField className='m-0 p-0 h-100 w-100' id="name" name='name' value={newIncomeBudget.name} label="Income Source" onChange={handleIncome} size="small" required />
            </div>
            <div className='col m-0 p-1'>
              <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newIncomeBudget.amount} label="Amount" onChange={handleIncome} size="small" required />
            </div>
          </div>
          <div className='row m-0 p-1'>
            <div className="col-5 p-1 m-0">
              <FormControl sx={{ width: '100%' }} size='small'>
                <InputLabel id="incomeCategoryLabel">Category</InputLabel>
                <Select labelId="incomeCategoryLabel" id="incomeCategory" name="category" value={newIncomeBudget.category} label="Category" onChange={handleIncome} required >
                  {incomeCategories.map(element =>
                    <MenuItem value={element.category}>
                      {element.category}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-5 p-1 m-0">
              <FormControl sx={{ width: '100%' }} size='small'>
                <InputLabel id="incomeSubCategoryLabel">Source</InputLabel>
                <Select labelId="incomeSubCategoryLabel" id="incomeSubCategory" name="subCategory" value={newIncomeBudget.subCategory} label="Source" onChange={handleIncome} required >
                  {(newIncomeBudget.category !== "")
                    && (incomeCategories.filter(element => element.category === newIncomeBudget.category)[0].subCategories.map(element => <MenuItem value={element}>{element}</MenuItem>))
                  }
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col d-flex justify-content-center m-0 p-1">
              <button className='btn btn-primary w-100' type='submit' variant="contained"><AddIcon /></button>
            </div>
          </div>
        </form>
        <div className="card">
          <DataView value={incomeBudget} itemTemplate={itemTemplate} layout="list" />
        </div>
      </div>
      <div className='card m-0 p-1 w-100'>
        ExpenseBudget
        <form className='container' onSubmit={(event) => {
          setExpenseBudget((prev) => [...prev, newExpenseBudget]);
          setNewExpenseBudget({ name: "", amount: "", category: "", subCategory: "" });
          event.preventDefault();
        }}>
          <div className='row m-0 p-1'>
            <div className='col m-0 p-1'>
              <TextField className='m-0 p-0 h-100 w-100' id="name" name='name' value={newExpenseBudget.name} label="Income Source" onChange={handleExpense} size="small" required />
            </div>
            <div className='col m-0 p-1'>
              <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newExpenseBudget.amount} label="Amount" onChange={handleExpense} size="small" required />
            </div>
          </div>
          <div className='row m-0 p-1'>
            <div className="col-5 p-1 m-0">
              <FormControl sx={{ width: '100%' }} size='small'>
                <InputLabel id="expenseCategoryLabel">Category</InputLabel>
                <Select labelId="expenseCategoryLabel" id="expenseCategory" name="category" value={newExpenseBudget.category} label="Category" onChange={handleExpense} required >
                  {expenseCategories.map(element =>
                    <MenuItem value={element.category}>
                      {element.category}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-5 p-1 m-0">
              <FormControl sx={{ width: '100%' }} size='small'>
                <InputLabel id="expenseSubCategoryLabel">Source</InputLabel>
                <Select labelId="expenseSubCategoryLabel" id="expenseSubCategory" name="subCategory" value={newExpenseBudget.subCategory} label="Source" onChange={handleExpense} required >
                  {(newExpenseBudget.category !== "")
                    && (expenseCategories.filter(element => element.category === newExpenseBudget.category)[0].subCategories.map(element => <MenuItem value={element}>{element}</MenuItem>))
                  }
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col d-flex justify-content-center m-0 p-1">
              <button className='btn btn-primary w-100' type='submit' variant="contained"><AddIcon /></button>
            </div>
          </div>
        </form>
        <div className="card">
          <DataView value={expenseBudget} itemTemplate={itemTemplate} layout="list" />
        </div>
      </div>
    </div>
  )
}

export default Budget