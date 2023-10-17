import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Tree } from "primereact/tree";

const CategoryCard = ({ type }) => {
    const [categories, setCategories] = useState([{ category: "job", subCategories: ["TCS"] }]);
    const [categoryNodes, setCategoryNodes] = useState([{ label: "job", children: [{ label: "TCS" }] }]);
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
        setCategories((prev) => [...prev, newCategory]);
        setCategoryNodes((prev) => [...prev, { label: newCategory.category, children: [] }])
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
        setCategories((prev) => {
            prev.map((element) => {
                if (element.category === newSubCategory.category)
                    element.subCategories.push(newSubCategory.subCategory);
                return 0;
            })
            return prev;
        })
        setCategoryNodes((prev) => {
            prev.map((element) => {
                if (element.label === newSubCategory.category)
                    element.children.push({ label: newSubCategory.subCategory });
                return 0;
            })
            return prev;
        })
        setNewSubCategory({ category: "", subCategory: "" });
        e.preventDefault();
    }
    return (
        <div className='card'>
            <h5>{type.toUpperCase()} Categories</h5>
            <div className='card m-1 p-2'>
                <form onSubmit={AddCategory}>
                    <TextField className='' type="text" id="category" name='category' value={newCategory.category} label="New Category" onChange={handleCategory} size="small" required />
                    <button className='btn btn-primary' type='submit'>New {type.toUpperCase()} Category</button>
                </form>
            </div>
            <div className='card m-1 p-2'>
                <form onSubmit={AddSubCategory}>
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
                            {categories.map(element =>
                                <MenuItem value={element.category}>
                                    {element.category}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField className='' type="text" id="subCategory" name='subCategory' value={newSubCategory.subCategory} label="New SubCategory" onChange={handleSubCategory} size="small" required />
                    <button className='btn btn-primary' type='submit'>New {type.toUpperCase()} SubCategory</button>
                </form>
            </div>
            <div className="card d-flex align-items-center m-1 p-2">
                <Tree value={categoryNodes} filter filterMode="strict" filterPlaceholder="Search Category" className="w-full md:w-30rem" />
            </div>
        </div>
    )
}

export default CategoryCard