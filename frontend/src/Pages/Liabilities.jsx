import React,{useState} from 'react'
import Cards from '../components/Cards/Cards';

const Liabilities = ({liabilitiesData,addLiability}) => {
  const [newLiability, setNewLiability] = useState({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewLiability((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }
  return (
    // cost to date income to date
    <div className='Liabilities'>
      <h5>New Liability</h5>
      <div className='form'>
        <form onSubmit={(event) => {
          addLiability(newLiability);
          setNewLiability({ date: "", name: "", initialAmount: "", details: "", monthlyMaintainance: "", monthlyIncome: "", note: "" });
          event.preventDefault();
        }}>
          <input type='date' name='date' placeholder='Date of Investment' onChange={handleChange} value={newLiability.date} required />
          <input type='text' name='name' placeholder='Name' onChange={handleChange} value={newLiability.name} required />
          <input type='number' name='initialAmount' placeholder='Initial Amount' onChange={handleChange} value={newLiability.initialAmount} required />
          <input type='text' name='details' placeholder='Details' onChange={handleChange} value={newLiability.details} required />
          <input type='number' name='monthlyMaintainance' placeholder='Monthly Maintainance' onChange={handleChange} value={newLiability.monthlyMaintainance} required />
          <input type='number' name='monthlyIncome' placeholder='Monthly Income' onChange={handleChange} value={newLiability.monthlyIncome} required />
          {/* <input type='text' name='category' placeholder='Category' onChange={handleChange} value={newLiability.category} required /> */}
          <input type='text' name='note' placeholder='Note' onChange={handleChange} value={newLiability.note} />
          <input type='submit' value='submit' />
        </form>
      </div>
      <Cards data={liabilitiesData}/>
    </div>
  )
}

export default Liabilities