import React from 'react'
import DataTable from 'react-data-table-component'
import Spreadsheet from 'react-spreadsheet'

const Sheet = ({ col, data, update }) => {

    return (
        <div>
            <Spreadsheet
                data={data}
                columnLabels={col}
                onChange={update}
            />
        </div>
    )
}

export default Sheet