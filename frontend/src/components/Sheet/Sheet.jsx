import React from 'react'
import DataTable from 'react-data-table-component'
import Spreadsheet from 'react-spreadsheet'

const Sheet = ({ col, data, update }) => {


    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];
    
    const datatab = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]



    return (
        <div>
            <Spreadsheet
                data={data}
                columnLabels={col}
                onChange={update}
            />
            {/* <DataTable   columns={columns}
                data={datatab}/> */}
        </div>
    )
}

export default Sheet