import React, { useState, useRef } from 'react'
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

const NewTransaction = ({ addIncome, addExpense }) => {
    const [newTransactionEntry, setNewTransactionEntry] = useState({ date: "", amount: "", category: "", subCategory: "", description: "" });
    const [incomeDialog, setIncomeDialog] = useState(false);
    const [expenseDialog, setExpenseDialog] = useState(false);
    const menuRight = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label: "Upload Excel",
            icon: "pi pi-upload",
            command: (e) => {
                //react-prime fileupload
            }
        },
        {
            label: "New Income",
            icon: "pi pi-angle-double-up",
            command: () => setIncomeDialog(true)
        },
        {
            label: "New Expense",
            icon: "pi pi-angle-double-down",
            command: () => setExpenseDialog(true)
        }
    ];

    function handleChange(event) {
        const { name, value } = event.target;
        setNewTransactionEntry((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    }

    return (
        <div className="position-fixed bottom-0 end-0 m-3" style={{ position: "fixed" }}>
            <Toast ref={toast} position="bottom-right"></Toast>
            <Dialog
                header="New Income"
                visible={incomeDialog}
                onHide={() => setIncomeDialog(false)}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
                <form onSubmit={(event) => {
                    toast.current.show({
                        severity: "success",
                        summary: "Income Added",
                        life: 3000
                    });
                    addIncome(newTransactionEntry);
                    setIncomeDialog(false);
                    setNewTransactionEntry({ date: "", amount: "", category: "", subCategory: "", description: "" });
                    event.preventDefault();
                }}>
                    <div className='container p-0 m-0'>
                        <div className='row p-0 m-0'>
                            <div className="col p-1 m-0">
                                <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' type='date' id='date' name='date' value={newTransactionEntry.date} placeholder="Date" onChange={handleChange} required />
                            </div>
                            <div className="col p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newTransactionEntry.amount} label="Amount" onChange={handleChange} size="small" required />
                            </div>
                            <div className="col p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100' id="category" name='category' value={newTransactionEntry.category} label="Category" onChange={handleChange} size="small" required />
                            </div>
                        </div>
                        <div className='row p-0 m-0'>
                            <div className="col-5 p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100 ' id="subCategory" name="subCategory" value={newTransactionEntry.subCategory} label="Source" onChange={handleChange} size="small" required />
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
            </Dialog>
            <Dialog
                header="New Expense"
                visible={expenseDialog}
                onHide={() => setExpenseDialog(false)}
                style={{ width: "50vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
                <form onSubmit={(event) => {
                     toast.current.show({
                        severity: "success",
                        summary: "Expense Added",
                        life: 3000
                    });
                    addExpense(newTransactionEntry);
                    setExpenseDialog(false);
                    setNewTransactionEntry({ date: "", amount: "", category: "", subCategory: "", description: "" });
                    event.preventDefault();
                }}>
                    <div className='container p-0 m-0'>
                        <div className='row p-0 m-0'>
                            <div className="col p-1 m-0">
                                <input className='m-0 px-2 h-100 w-100 border border-dark rounded bg-transparent' type="date" id='date' name='date' value={newTransactionEntry.date} placeholder="Date" onChange={handleChange} required />
                            </div>
                            <div className="col p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100' type="number" id="amount" name='amount' value={newTransactionEntry.amount} label="Amount" onChange={handleChange} size="small" required />
                            </div>
                            <div className="col p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100' id="category" name='category' value={newTransactionEntry.category} label="Category" onChange={handleChange} size="small" required />
                            </div>
                        </div>
                        <div className='row p-0 m-0'>
                            <div className="col-5 p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100 ' id="subCategory" name="subCategory" value={newTransactionEntry.subCategory} label="Source" onChange={handleChange} size="small" required />
                            </div>
                            <div className="col-6 p-1 m-0">
                                <TextField className='m-0 p-0 h-100 w-100' id="description" name='description' value={newTransactionEntry.description} label="Description" onChange={handleChange} size="small" />
                            </div>
                            <div className="col-1 p-1 m-0 d-flex justify-content-center">
                                <button className='btn btn-primary' type='submit' variant="contained"><AddIcon /></button>
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
            <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
            />
            <button className="btn btn-light" type="button" onClick={(event) => menuRight.current.toggle(event)}><AddIcon /></button>
        </div>
    )
}

export default NewTransaction