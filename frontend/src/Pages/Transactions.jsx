import React, { useState, useRef } from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TextField, InputAdornment, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Toast } from "primereact/toast";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { ConfirmDialog } from "primereact/confirmdialog";

const Transactions = ({ transactions, editTransaction, deleteTransaction }) => {
  const toast = useRef(null);
  const dt = useRef(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  const [selectRowValue, setSelectRowValue] = useState({ date: "", amount: "", category: "", subCategory: "", description: "" });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const handleEdit = (event) => setSelectRowValue((prevValues) => { return { ...prevValues, [event.target.name]: event.target.value }; });
  const editRow = (event) => {
    editTransaction(selectRowValue);
    setEditDialog(false);
    toast.current.show({ severity: "success", summary: "Successfully Edited", life: 3000 });
    setSelectRowValue({ date: "", amount: "", category: "", subCategory: "", description: "" });
    event.preventDefault();
  }
  const deleteRow = () => {
    const id = selectRowValue._id;
    deleteTransaction(id);
    toast.current.show({ severity: "error", summary: "Successfully Deleted", life: 3000 });
    setSelectRowValue({ date: "", amount: "", category: "", subCategory: "", description: "" });
  }
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const ActionTemplate = (rowValue) =>
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-primary rounded-circle m-1" onClick={() => { setSelectRowValue(() => { return { ...rowValue, date: rowValue.date[3] + rowValue.date[4] + "-" + rowValue.date[0] + rowValue.date[1] + "-" + rowValue.date[6] + rowValue.date[7] + rowValue.date[8] + rowValue.date[9] } }); setEditDialog(true); }}><EditIcon fontSize="small" /></button>
      <button type="button" class="btn btn-outline-danger rounded-circle m-1" onClick={() => { setSelectRowValue(rowValue); setDeleteDialog(true) }}><DeleteForeverIcon fontSize='small' /></button>
    </div>
  const paginatorLeft = <button className="btn btn-primary" onClick={() => dt.current.exportCSV()}><FileDownloadIcon fontSize='small' /></button>
  const paginatorRight = <TextField className='p-1 m-0' value={globalFilterValue} onChange={onGlobalFilterChange} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchOutlinedIcon /></InputAdornment>), }} size='small' label="Keyword Search" />
  const rowClass = (data) => { return { 'bg-success bg-opacity-50': data.transactionType === 'income', 'bg-danger bg-opacity-50': data.transactionType === 'expense' }; };

  return (
    <div className='transactions'>
      <Toast ref={toast} />
      <Dialog open={editDialog}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent sx={{ m: 0, pb: 0 }}>
          <form onSubmit={editRow}>
            <div className='container p-0 m-0'>
              <div className='row p-1 m-0'>
                <div className="col p-1 m-0">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={['year', 'month', 'day']}
                      format="D/M/YYYY"
                      defaultValue={dayjs(selectRowValue.date)}
                      onChange={(e) => {
                        handleEdit({ target: { name: "date", value: e.$D + "-" + (e.$M + 1) + "-" + e.$y } })
                      }}
                      autoOk={true}
                      sx={{ width: "100%" }}
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={selectRowValue.amount} label="Amount" onChange={handleEdit} size="small" required />
                </div>
                <div className="col p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="category" name='category' value={selectRowValue.category} label="Category" onChange={handleEdit} size="small" required />
                </div>
              </div>
              <div className='row p-1 m-0'>
                <div className="col-5 p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100 ' id="subCategory" name="subCategory" value={selectRowValue.subCategory} label="Sub Category" onChange={handleEdit} size="small" required />
                </div>
                <div className="col-5 p-1 m-0">
                  <TextField className='m-0 p-0 h-100 w-100' id="description" name='description' value={selectRowValue.description} label="Discription" onChange={handleEdit} size="small" />
                </div>
                <div className="col p-1 m-0 d-flex justify-content-center">
                  <button className='btn btn-primary h-100 w-100' type='submit' variant="contained">UPDATE</button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <button type="button" className="btn btn-outline-danger" onClick={() => setEditDialog(false)}>Cancel</button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog visible={deleteDialog} header="Delete Confirmation" icon="pi pi-info-circle" message="Do you want to delete/Edit this record?" acceptClassName="p-button-danger" accept={deleteRow} onHide={() => setDeleteDialog(false)} position='right' />
      <DataTable
        ref={dt}
        value={transactions}
        dataKey='_id'
        size={"small"}
        paginator // layout
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
        scrollable scrollHeight="450px" // scrolable
        rows={50} rowsPerPageOptions={[10, 25, 50, 100, 500]}
        rowClassName={rowClass}
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
        <Column key="4" field="subCategory" header="subCatgegory" sortable style={{ width: '20%' }} />
        <Column key="5" field="description" header="DESCRIPTION" sortable style={{ width: '20%' }} />
        <Column key="6" header="ACTION" body={ActionTemplate} exportable={false} style={{ minWidth: '4rem', textAlign: "center" }} />
      </DataTable>
    </div>
  )
}

export default Transactions