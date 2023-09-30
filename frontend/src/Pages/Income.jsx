import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Sheet from '../components/Sheet/Sheet'

const Income = ({ data }) => {
  let income_col = ["Date", "Source", "Amount", "Category", "Note"];

  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className=''>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">New Income</h5>
          <TextField
            id="outlined-read-only-input"
            label="Transaction ID"
            defaultValue="888"
            InputProps={{
              readOnly: true,
            }}
          />
          <input className="" type='date' style={{padding:"14px"}} />
          <TextField id="outlined-basic" label="Source" variant="outlined" />
          <TextField id="outlined-basic" label="Amount" variant="outlined" />
          <TextField id="outlined-basic" label="Category" variant="outlined" />
          <TextField id="outlined-basic" label="Note" variant="outlined" />
        </div>
      </div>
      <Sheet col={income_col} data={data} />
    </div>
  )
}

export default Income