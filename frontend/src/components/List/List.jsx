import React from 'react'

const List = ({ data }) => {
    return (
        <div className='container'>
            {(data.length > 0) && (
                data.map((row, i) =>
                    <div className='row'>
                        <div className='col'>{row.source || row.vendor || row.name}</div>
                        <div className='col'>{row.amount || row.initialAmount}</div>
                        <hr/>
                    </div>
                )
            )}
        </div>
    )
}

export default List