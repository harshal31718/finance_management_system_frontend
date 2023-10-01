import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import './Sheet.css';


const Sheet = ({ columns, data }) => {
  function sorting(col) { };

  return (
    <div className='sheet'>
      <div>
        <table className='table'>
          <thead>
            {columns.map((col, i) => (
              <th onClick={() => sorting("com")} >{col}</th>
            ))}
          </thead>
          <tbody>
            {data.length > 0 && (
              data.map((row, i) =>
                <tr>
                  <td ><p>{row.date}</p></td>
                  <td ><p>{row.source || row.vendor}</p></td>
                  <td ><p><FaRupeeSign/>{row.amount}</p></td>
                  <td ><p>{row.category}</p></td>
                  <td ><p>{row.note}</p></td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sheet
