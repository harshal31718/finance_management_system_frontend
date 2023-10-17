import React, { useState } from 'react'
import CategoryCard from '../components/CategoryCard/CategoryCard'

const Categories = () => {
    const [bar, setBar] = useState(false);

    return (
        <div className='categories card'>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button type="button" class={"btn" + (!bar ? " btn-primary" : " btn-outline-primary")} onClick={() => setBar(!bar)} >Income Categories</button>
                <button type="button" class={"btn" + (bar ? " btn-primary" : " btn-outline-primary")} onClick={() => setBar(!bar)} >Expense Categories</button>
            </div>
            <div style={{ display: bar ? 'none' : '' }}>
                <CategoryCard type="income" />
            </div>
            <div style={{ display: !bar ? 'none' : '' }}>
                <CategoryCard type="expense" />
            </div>
        </div>
    )
}

export default Categories