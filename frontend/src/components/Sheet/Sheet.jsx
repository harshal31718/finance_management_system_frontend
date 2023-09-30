import React from 'react'
import Spreadsheet from 'react-spreadsheet'

const Sheet = ({ col, data }) => {
    return (
        <div>
            <Spreadsheet
                data={data}
                columnLabels={col}
            // onChange={
            //     update
            // } 
            />
        </div>
    )
}

export default Sheet