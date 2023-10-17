import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const Categories = () => {
    const [incomeCategories, setIncomeCategories] = useState([{ category: "job", subCategories: ["TCS"] }]);
    const [newCategory, setNewCategory] = useState({ category: "", subCategories: [] });

    const [newSubCategory, setNewSubCategory] = useState({ category: "", subCategory: "" });

    const handleCategory = (e) => {
        setNewCategory((prev) => {
            return {
                ...prev,
                category: e.target.value
            }
        })
    }
    const AddCategory = (e) => {
        setIncomeCategories((prev) => [...prev, newCategory]);
        setNewCategory({ category: "", subCategories: [] });
        e.preventDefault();
    }
    const handleSubCategory = (e) => {
        const { name, value } = e.target;
        setNewSubCategory((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const AddSubCategory = (e) => {
        setIncomeCategories((prev) => {
            prev.map((element) => {
                if (element.category === newSubCategory.category)
                    element.subCategories.push(newSubCategory.subCategory);
            })
            return prev;
        })
        setNewSubCategory({ category: "", subCategory: "" });
        e.preventDefault();
    }
    return (
        <div>
            Categories
            <div className='card m-1 p-2'>
                <form onSubmit={AddCategory}>
                    New Category
                    <TextField className='' type="text" id="category" name='category' value={newCategory.category} label="New Category" onChange={handleCategory} size="small" required />
                    <button className='btn btn-primary' type='submit'>Add</button>
                </form>
            </div>
            <div className='card m-1 p-2'>
                <form onSubmit={AddSubCategory}>
                    New SubCategory
                    <FormControl sx={{ minWidth: 120 }} size='small'>
                        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Category"
                            name="category"
                            value={newSubCategory.category}
                            onChange={handleSubCategory}
                            required
                        >
                            {incomeCategories.map(element =>
                                <MenuItem value={element.category}>
                                    {element.category}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField className='' type="text" id="subCategory" name='subCategory' value={newSubCategory.subCategory} label="New SubCategory" onChange={handleSubCategory} size="small" required />
                    <button className='btn btn-primary' type='submit'>Add</button>
                </form>
            </div>
            <div className='ccard m-1 p-2'>
                {incomeCategories.map((category) =>
                    <div>
                        <h4>{category.category}</h4>
                        {category.subCategories.map((subCategory) =>
                            <h6>{subCategory}</h6>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categories