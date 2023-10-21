import React, { useState, useRef } from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Toast } from "primereact/toast";
import { OverlayPanel } from 'primereact/overlaypanel';

const NewTransaction = ({ incomeCategories, expenseCategories, addUploadedTransactions, addTransaction }) => {
    const toast = useRef(null);
    const op = useRef(null);
    const [newTransactionEntry, setNewTransactionEntry] = useState({ transactionType: "", date: "", amount: "", category: "", subCategory: "", description: "" });
    const [uploadDialog, setUploadDialog] = useState(false);
    const [incomeDialog, setIncomeDialog] = useState(false);
    const [expenseDialog, setExpenseDialog] = useState(false);

    const handleChange = (event) => setNewTransactionEntry((prevValues) => { return { ...prevValues, [event.target.name]: event.target.value }; });

    return (
        <div className="position-fixed bottom-0 end-0 m-3" style={{ position: "fixed" }}>
            <Toast ref={toast} position='bottom-right' />
            <Dialog open={uploadDialog}>
                <DialogTitle>Upload JSON</DialogTitle>
                <DialogContent sx={{ m: 0, pb: 0 }}>
                    <div className='container'>
                        <input
                            className="form-control form-control-sm bg-primary border w-100"
                            type="file"
                            onChange={(e) => {
                                const fileReader = new FileReader();
                                fileReader.readAsText(e.target.files[0], "UTF-8");
                                fileReader.onload = (e) => addUploadedTransactions(e.target.result);
                                setUploadDialog(false);
                                toast.current.show({ severity: "success", summary: "JSON Added", life: 3000 });
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <button type="button" className="btn btn-outline-danger" onClick={() => setUploadDialog(false)}>Cancel</button>
                </DialogActions>
            </Dialog>
            <Dialog open={incomeDialog}>
                <DialogTitle>New Income</DialogTitle>
                <DialogContent sx={{ m: 0, pb: 0 }}>
                    <form onSubmit={(event) => {
                        toast.current.show({ severity: "success", summary: "Income Added", life: 3000 });
                        addTransaction({ ...newTransactionEntry, transactionType: "income" });
                        setIncomeDialog(false);
                        setNewTransactionEntry({ transactionType: "", date: "", amount: "", category: "", subCategory: "", description: "" });
                        event.preventDefault();
                    }}>
                        <div className='container p-0 m-0'>
                            <div className='row p-1 m-0'>
                                <div className="col p-1 m-0">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date"
                                            views={['year', 'month', 'day']}
                                            format="DD/MM/YYYY"
                                            onChange={(e) => {
                                                handleChange({ target: { name: "date", value: ((e.$D < 10) ? ("0" + e.$D) : (e.$D)) + "-" + ((e.$M < 9) ? ("0" + (e.$M + 1)) : (e.$M + 1)) + "-" + e.$y } })
                                            }}
                                            autoOk={true}
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            required
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="col p-1 m-0">
                                    <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newTransactionEntry.amount} label="Amount" onChange={handleChange} size="small" required />
                                </div>
                                <div className="col p-1 m-0">
                                    <FormControl sx={{ width: '100%' }} size='small'>
                                        <InputLabel id="incomeCategoryLabel">Category</InputLabel>
                                        <Select labelId="incomeCategoryLabel" id="incomeCategory" name="category" value={newTransactionEntry.category} label="Category" onChange={handleChange} required >
                                            {incomeCategories.map(element =>
                                                <MenuItem value={element.category}>
                                                    {element.category}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='row p-1 m-0'>
                                <div className="col-5 p-1 m-0">
                                    <FormControl sx={{ width: '100%' }} size='small'>
                                        <InputLabel id="incomeSubCategoryLabel">Source</InputLabel>
                                        <Select labelId="incomeSubCategoryLabel" id="incomeSubCategory" name="subCategory" value={newTransactionEntry.subCategory} label="Source" onChange={handleChange} required >
                                            {(incomeDialog && (newTransactionEntry.category !== ""))
                                                && (incomeCategories.filter(element => element.category === newTransactionEntry.category)[0].subCategories.map(element => <MenuItem value={element}>{element}</MenuItem>))
                                            }
                                            <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-6 p-1 m-0">
                                    <TextField className='m-0 p-0 h-100 w-100' id="description" name='description' value={newTransactionEntry.description} label="Discription" onChange={handleChange} size="small" />
                                </div>
                                <div className="col-1 p-1 m-0 d-flex justify-content-center">
                                    <button className='btn btn-primary' type='submit' variant="contained"><AddIcon /></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button type="button" className="btn btn-outline-danger" onClick={() => { setIncomeDialog(false); setNewTransactionEntry({ transactionType: "", date: "", amount: "", category: "", subCategory: "", description: "" }); }}>Cancel</button>
                </DialogActions>
            </Dialog>
            <Dialog open={expenseDialog}>
                <DialogTitle>New Expense</DialogTitle>
                <DialogContent sx={{ m: 0, pb: 0 }}>
                    <form onSubmit={(event) => {
                        toast.current.show({ severity: "success", summary: "Expense Added", life: 3000 });
                        addTransaction({ ...newTransactionEntry, transactionType: "expense" });
                        setExpenseDialog(false);
                        setNewTransactionEntry({ date: "", amount: "", category: "", subCategory: "", description: "" });
                        event.preventDefault();
                    }}>
                        <div className='container p-0 m-0'>
                            <div className='row p-1 m-0'>
                                <div className="col p-1 m-0">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date"
                                            views={['year', 'month', 'day']}
                                            format="D/M/YYYY"
                                            onChange={(e) => {
                                                handleChange({ target: { name: "date", value: ((e.$D < 10) ? ("0" + e.$D) : (e.$D)) + "-" + ((e.$M < 9) ? ("0" + (e.$M + 1)) : (e.$M + 1)) + "-" + e.$y } })
                                            }}
                                            autoOk={true}
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' }, field: { shouldRespectLeadingZeros: true } }}
                                            required
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="col p-1 m-0">
                                    <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newTransactionEntry.amount} label="Amount" onChange={handleChange} size="small" required />
                                </div>
                                <div className="col p-1 m-0">
                                    <FormControl sx={{ width: '100%' }} size='small'>
                                        <InputLabel id="expenseCategorylabel">Category</InputLabel>
                                        <Select labelId="expenseCategorylabel" id="expenseCategory" name="category" value={newTransactionEntry.category} label="Category" onChange={handleChange} required >
                                            {expenseCategories.map(element =>
                                                <MenuItem value={element.category}>
                                                    {element.category}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='row p-1 m-0'>
                                <div className="col-5 p-1 m-0">
                                    <FormControl sx={{ width: '100%' }} size='small'>
                                        <InputLabel id="expenseSubCategorylabel">Vendor</InputLabel>
                                        <Select labelId="expenseSubCategorylabel" id="expenseSubCategory" name="subCategory" value={newTransactionEntry.subCategory} label="Vendor" onChange={handleChange} required >
                                            {(expenseDialog && (newTransactionEntry.category !== ""))
                                                && (expenseCategories.filter(element => element.category === newTransactionEntry.category)[0].subCategories.map(element => <MenuItem value={element}>{element}</MenuItem>))
                                            }
                                            <MenuItem value="other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-6 p-1 m-0">
                                    <TextField className='m-0 p-0 h-100 w-100' id="description" name='description' value={newTransactionEntry.description} label="Discription" onChange={handleChange} size="small" />
                                </div>
                                <div className="col-1 p-1 m-0 d-flex justify-content-center">
                                    <button className='btn btn-primary' type='submit' variant="contained"><AddIcon /></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button type="button" className="btn btn-outline-danger" onClick={() => { setExpenseDialog(false); setNewTransactionEntry({ transactionType: "", date: "", amount: "", category: "", subCategory: "", description: "" }); }}>Cancel</button>
                </DialogActions>
            </Dialog>
            <OverlayPanel ref={op}>
                <div className='d-flex flex-column'>
                    <button type="button" className="btn btn-outline-warning m-1" onClick={(event) => { setUploadDialog(true); op.current.toggle(event); }}>Upload JSON</button>
                    <button type="button" className="btn btn-outline-success m-1" onClick={(event) => { setIncomeDialog(true); op.current.toggle(event); }}>New Income</button>
                    <button type="button" className="btn btn-outline-danger m-1" onClick={(event) => { setExpenseDialog(true); op.current.toggle(event); }}>New Expense</button>
                </div>
            </OverlayPanel>
            <Fab color="primary" aria-label="add" onClick={(event) => op.current.toggle(event)} >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default NewTransaction