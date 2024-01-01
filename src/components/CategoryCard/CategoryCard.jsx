import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const CategoryCard = ({ type, categories, addCategory, addSubCategory }) => {
    const [newCategory, setNewCategory] = useState({ category: "", subCategories: [] });
    const [newSubCategory, setNewSubCategory] = useState({ category: "", subCategory: "" });

    const handleCategory = (e) => { setNewCategory((prev) => { return { ...prev, category: e.target.value } }) }
    const handleSubCategory = (e) => { setNewSubCategory((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }

    return (
        <div className='card'>
            <h5>{type.toUpperCase()} Categories</h5>
            <div className='card m-1 p-2'>
                <form onSubmit={(e) => {
                    addCategory(newCategory, type);
                    setNewCategory({ category: "", subCategories: [] });
                    e.preventDefault();
                }}>
                    <TextField className='' type="text" id="category" name='category' value={newCategory.category} label="New Category" onChange={handleCategory} size="small" required />
                    <button className='btn btn-primary' type='submit'>New {type.toUpperCase()} Category</button>
                </form>
            </div>
            <div className='card m-1 p-2'>
                <form onSubmit={(e) => {
                    addSubCategory(newSubCategory, type);
                    setNewSubCategory({ category: "", subCategory: "" });
                    e.preventDefault();
                }}>
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
            <div className="card m-1 p-2">
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} >
                    {categories.map(e1 => (
                        <TreeItem nodeId={e1.category} label={e1.category}>
                            {e1.subCategories.map(e2 => (
                                <TreeItem nodeId={e2} label={e2} />
                            ))}
                        </TreeItem>
                    ))}
                </TreeView>
            </div>
        </div>
    )
}

export default CategoryCard