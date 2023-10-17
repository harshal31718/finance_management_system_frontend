import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import InputAdornment from '@mui/material/InputAdornment';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Sheet = ({ type, data, addTransaction, editTransaction, deleteTransaction }) => {
  const toast = useRef(null);
  const dt = useRef(null);

  const [newEntry, setNewEntry] = useState({ date: "", amount: "", category: "", subCategory: "", note: "" });

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

  const [selectRowValue, setSelectRowValue] = useState({ date: "", amount: "", category: "", subCategory: "", note: "" });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const handleAdd = (event) => {
    const { name, value } = event.target;
    setNewEntry((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }
  const addRow = (event) => {
    addTransaction(newEntry);
    setNewEntry({ date: "", amount: "", category: "", subCategory: "", description: "" });
    event.preventDefault();
  }
  const handleEdit = (event) => {
    const { name, value } = event.target;
    setSelectRowValue((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }
  const editRow = (event) => {
    editTransaction(selectRowValue);
    setEditDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successfully Edited",
      life: 3000
    });
    setSelectRowValue({ date: "", amount: "", category: "", subCategory: "", description: "" });
    event.preventDefault();
  }
  const deleteRow = () => {
    const id = selectRowValue._id;
    deleteTransaction(id);
    toast.current.show({
      severity: "error",
      summary: "Successfully Deleted",
      life: 3000
    });
    setSelectRowValue({ date: "", amount: "", category: "", subCategory: "", note: "" });
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  }


  const SheetHeader = (
    <div className='d-flex align-items-center justify-content-between '>
      <div className="card w-75 p-1 m-0">
        <form onSubmit={addRow}>
          <div className='container p-0 m-0'>
            <div className='row p-0 m-0'>
              <div className="col p-1 m-0">
                <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' type='date' id='date' name='date' value={newEntry.date} placeholder="Date" onChange={handleAdd} required />
              </div>
              <div className="col p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newEntry.amount} label="Amount" onChange={handleAdd} size="small" required />
              </div>
              <div className="col p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100' id="category" name='category' value={newEntry.category} label="Category" onChange={handleAdd} size="small" required />
              </div>
            </div>
            <div className='row p-0 m-0'>
              <div className="col-5 p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100 ' id="subCategory" name="subCategory" value={newEntry.subCategory} label={(type === "income") ? "Source" : "Vendor"} onChange={handleAdd} size="small" required />
              </div>
              <div className="col-5 p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100' id="description" name='description' value={newEntry.description} label="Discription" onChange={handleAdd} size="small" />
              </div>
              <div className="col p-1 m-0 d-flex justify-content-center">
                <button className='btn btn-primary h-100 w-100' type='submit' variant="contained">NEW {type.toUpperCase()}</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-25 d-flex align-items-center justify-content-center">
        <div>
          <TextField
            className='p-1 m-0'
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            label="Keyword Search"
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchOutlinedIcon /></InputAdornment>), }}
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => dt.current.exportCSV()}><FileDownloadIcon fontSize='small' /></button>
        </div>
      </div>
    </div>
  );

  const ActionTemplate = (rowValue) => {
    return (
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-outline-primary rounded-circle m-1" onClick={() => { setSelectRowValue(rowValue); setEditDialog(true); }}><EditIcon fontSize="small" /></button>
        <button type="button" class="btn btn-outline-danger rounded-circle m-1" onClick={() => { setSelectRowValue(rowValue); setDeleteDialog(true) }}><DeleteForeverIcon fontSize='small' /></button>
      </div>
    );
  }

  return (
    <div className='card mx-2'>
      <Toast ref={toast} />
      <Dialog visible={editDialog} header="Edit Row" onHide={() => setEditDialog(false)} style={{ width: '50vw' }}>
        <form onSubmit={editRow}>
          <div className='container p-0 m-0'>
            <div className='row p-0 m-0'>
              <div className="col p-1 m-0">
                <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' type='date' id='date' name='date' value={selectRowValue.date} placeholder="Date" onChange={handleEdit} required />
              </div>
              <div className="col p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={selectRowValue.amount} label="Amount" onChange={handleEdit} size="small" required />
              </div>
              <div className="col p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100' id="category" name='category' value={selectRowValue.category} label="Category" onChange={handleEdit} size="small" required />
              </div>
            </div>
            <div className='row p-0 m-0'>
              <div className="col-5 p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100 ' id="subCategory" name="subCategory" value={selectRowValue.subCategory} label={(type === "income") ? "Source" : "Vendor"} onChange={handleEdit} size="small" required />
              </div>
              <div className="col-5 p-1 m-0">
                <TextField className='m-0 p-0 h-100 w-100' id="description" name='description' value={selectRowValue.description} label="Discription" onChange={handleEdit} size="small" />
              </div>
              <div className="col p-1 m-0 d-flex justify-content-center">
                <Button className='m-0 p-0 h-100 w-100' type='submit' variant="contained">UPDATE</Button>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
      <ConfirmDialog visible={deleteDialog} header="Delete Confirmation" icon="pi pi-info-circle" message="Do you want to delete/Edit this record?" acceptClassName="p-button-danger" accept={deleteRow} onHide={() => setDeleteDialog(false)} position='right' />
      <DataTable
        ref={dt}
        value={data}
        dataKey='_id'
        header={SheetHeader}
        size={"small"}
        paginator // layout
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable scrollHeight="350px" // scrolable
        rows={50} rowsPerPageOptions={[10, 25, 50, 100, 500]}
        removableSort // sort
        sortField='date'
        sortOrder={-1}
        filters={filters} // global search
        globalFilterFields={['date', 'amount', 'category', 'subCategory', 'description']}
        emptyMessage="No Data Found."
      >
        <Column key="1" field="date" header="DATE" sortable style={{ width: '20%' }} />
        <Column key="2" field="amount" header="AMOUNT" sortable style={{ width: '20%' }} />
        <Column key="3" field="category" header="CATEGORY" sortable style={{ width: '20%' }} />
        <Column key="4" field="subCategory" header={(type === "income") ? "SOURCE" : "VENDOR"} sortable style={{ width: '20%' }} />
        <Column key="5" field="description" header="DESCRIPTION" sortable style={{ width: '20%' }} />
        <Column key="6" header="ACTION" body={ActionTemplate} exportable={false} style={{ minWidth: '4rem', textAlign: "center" }} />
      </DataTable>
    </div>
  );
}

export default Sheet

