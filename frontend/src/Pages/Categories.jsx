import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';

const Categories = () => {
    const [bar, setBar] = useState(false);
    // const [categories, setCategories] = useState({ incomeCategories: [], expenseCategories: [] })
    const [incomeCategories, setIncomeCategories] = useState(['job', "asset"]);
    const [newCategory, setNewCategory] = useState("")
    const [newSubCategory, setNewSubCategory] = useState({ category: "", subCategory: "" });
    const [incomeSubCategories, setIncomeSubCategories] = useState([{ category: "job", subCategories: ["tcs"] }, { category: "asset", subCategories: ["stock", "realestate"] }])

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "newCategory") {
            setNewCategory(value);
        }
        else {
            setNewSubCategory((prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    return (
        <div className='categories'>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button type="button" class={"btn" + (!bar ? " btn-primary" : " btn-outline-primary")} onClick={() => setBar(!bar)} >Income Categories</button>
                <button type="button" class={"btn" + (bar ? " btn-primary" : " btn-outline-primary")} onClick={() => setBar(!bar)} >Expense Categories</button>
            </div>
            <div className="card" style={{ display: bar ? 'none' : '' }}>
                <div>
                    <form onSubmit={(e) => {
                        const value = newCategory;
                        setIncomeCategories((prev) => [...prev, value]);
                        setNewCategory("");
                        e.preventDefault();
                    }}>
                        <input type='text' name='newCategory' value={newCategory} onChange={handleChange} />
                        <button type='submit'>newCategory</button>
                    </form>
                </div>
                <div className='card'>
                    <form onSubmit={(e) => {
                        const value = newSubCategory;
                        console.log(value);
                        setIncomeSubCategories((prev) => {
                            incomeSubCategories.find({ category: value.category }).exec().then((result) => {
                                console.log(result);
                            })
                            return prev;
                        })
                        setNewSubCategory({ category: "", subCategory: "" });
                        console.log(incomeSubCategories);
                        e.preventDefault();
                    }}>
                        <Dropdown name='category' value={newSubCategory.category} onChange={handleChange} options={incomeCategories} placeholder="Select a Category" />
                        <input type='text' name='subCategory' value={newSubCategory.subCategory} onChange={handleChange} />
                        <button type='submit'>newSubCategory</button>
                    </form>
                </div>
                <div>
                    <h3>categories</h3>
                    {incomeSubCategories.map((obj) =>
                        <div>
                            <h3>{obj.category}</h3>
                            {/* {obj.subCategories.map((element) => <h6>{element}</h6>)} */}
                        </div>
                    )}
                </div>
                {/* <div>
                            <h4>{obj.name}</h4>
                            {obj.subCategories.map((element) => <h6>{element}</h6>)}
                        </div> */}
            </div>

        </div>
    )
}

export default Categories