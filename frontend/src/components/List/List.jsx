import React from 'react'
import { VirtualScroller } from "primereact/virtualscroller";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { NavLink } from 'react-router-dom';

const List = ({ type, data }) => {
    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap align-items-center m-0 px-2">
                <div className="flex-1 flex flex-column xl:mr-8">
                    <span className="font-bold">{item.source || item.vendor || item.name}</span>
                    {item.category && (
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag text-sm"></i>
                            <span>{item.category}</span>
                        </div>
                    )}
                </div>
                <div className='d-flex align-items-center'>
                    <CurrencyRupeeIcon fontSize='inherit' />
                    <span className="font-bold text-900">{item.amount || item.initialAmount}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="card m-0 p-0 w-100 h-100">
            <NavLink className="nav-link font-bold block m-1" to={"/" + type}>{type.toUpperCase()}S PRIVIEW</NavLink>
            <div className='m-0 p-0 w-100 h-100'>
                <VirtualScroller
                    items={data}
                    itemSize={50}
                    itemTemplate={itemTemplate}
                    className="card m-0 p-3"
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );

}

export default List
