import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Sheet = ({ type, columns, data, addTransaction, editTransaction, deleteTransaction }) => {
  const [newEntry, setNewEntry] = useState({ date: "", source: "", vendor: "", amount: "", category: "", note: "" });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  const [deleteRow, setDeleteRow] = useState(null);
  // const [editRowId, setEditRowId] = useState(null);
  // const [editRow, setEditRow] = useState({ date: "", source: "", vendor: "", amount: "", category: "", note: "" });

  const paginatorLeft = <IconButton aria-label="delete" size="small"><FileDownloadIcon fontSize="medium" /></IconButton>;
  const paginatorRight = <IconButton aria-label="delete" size="small"><RefreshIcon fontSize="medium" /></IconButton>;

  function handleChange(event) {
    const { name, value } = event.target;
    setNewEntry((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // const textEditor = (options) => {
  //   // console.log("textEditor");
  //   // if (true) {
  //   return (
  //     <TextField
  //       type="text"
  //       value={options.value}
  //       onChange={(e) => {
  //         options.editorCallback(e.target.value);
  //         const name = options.field;
  //         const value = e.target.value;
  //         console.log(name + " " + value);
  //         setEditRow((prevValues) => {
  //           return {
  //             ...prevValues,
  //             [name]: value
  //           };
  //         });
  //       }}
  //     // size='small'
  //     />
  //   );
  //   // }
  // };

  // const onRowEditComplete = async (e) => {
  //   const currId = e.data._id;
  //   console.log("start");
  //   console.log(editRow);
  //   console.log(editRowId);
  //   console.log(currId);
  //   if (editRowId === currId) {
  //     console.log("complete");
  //     setEditRowId(() => (null));
  //     setEditRow(() => ({ date: "", source: "", vendor: "", amount: "", category: "", note: "" }));
  //   }
  //   console.log(editRow);
  //   console.log(editRowId);
  //   console.log('end');
  // };

  const validateDelete = () => {
    return true;
  }
  const onRowDelete = (e) => {
    const value = e.value;
    setDeleteRow(value);
    if (validateDelete()) {
      deleteTransaction(value._id);
    }
  };

  return (
    <div className='card'>
      <div className='d-flex'>
        <div className="card w-75 p-1 m-0">
          <form onSubmit={(event) => {
            addTransaction(newEntry);
            setNewEntry({ date: "", source: "", vendor: "", amount: "", category: "", note: "" });
            event.preventDefault();
          }}>
            <div className='container p-0 m-0'>
              <div className='row p-0 m-0'>
                <div className="col p-1 m-0">
                  <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' id='date' type='date' name='date' value={newEntry.date} placeholder="Date" onChange={handleChange} required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100 ' id={type === "income" ? "source" : "vendor"} name={type === "income" ? "source" : "vendor"} value={type === "income" ? newEntry.incom : newEntry.vendor} label={type === "income" ? "Source" : "Vendor"} onChange={handleChange} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="amount" type="number" name='amount' value={newEntry.amount} label="Amount" onChange={handleChange} size="small" required />
                </div>
              </div>
              <div className='row p-0 m-0'>
                <div className="col-5 p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="category" name='category' value={newEntry.category} label="Category" onChange={handleChange} size="small" required />
                </div>
                <div className="col-5 p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="note" name='note' value={newEntry.note} label="Note" onChange={handleChange} size="small" />
                </div>
                <div className="col p-1 m-0 d-flex justify-content-center">
                  <Button className='m-0 p-0 h-100 w-100' type='submit' variant="contained"><AddIcon /> {type}</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card w-25 d-flex align-items-center justify-content-center">
          <TextField
            className='p-1 m-0'
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            label="Keyword Search"
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchOutlinedIcon /></InputAdornment>), }} />
        </div>
      </div>
      <div className='card mx-2'>
        <DataTable
          value={data}
          size={"small"}
          paginator // layout
          rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
          removableSort // sort
          sortField='date'
          sortOrder={-1}
          filters={filters} // global search
          globalFilterFields={['date', 'source', 'vendor', 'amount', 'category']}
          emptyMessage="No Data Found."
          // editMode="row" // row Edit
          // onRowEditComplete={onRowEditComplete}
          selectionMode='radiobutton' // row Delete
          selection={deleteRow}
          onSelectionChange={onRowDelete}
          tableStyle={{ minWidth: '50rem' }}
        >
          {columns.map((col, i) => {
            console.log(1)
            return (
              <Column
                key={i}
                field={col}
                header={col.toUpperCase()}
                sortable
                // editor={(options) => {
                //   console.log("editor");
                //   // console.log(options);
                //   if (editRowId === null) setEditRowId(options.rowData._id);
                //   if (editRowId === options.rowData._id) return textEditor(options)
                //   return <h6>hello</h6>
                // }}
                style={{ width: '20%' }}
              />)
          }
          )}
          <Column selectionMode="single" headerStyle={{ width: "3rem" }} />
          {/* <Column rowEditor headerStyle={{ Width: '3rem' }} bodyStyle={{ textAlign: 'center' }} /> */}
        </DataTable>
      </div>
    </div>
  );
}

export default Sheet

