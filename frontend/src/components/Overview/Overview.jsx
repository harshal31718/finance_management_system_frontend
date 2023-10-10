import React from 'react'
import OverviewCard from './OverviewCard'

const Overview = () => {
    const makeActive = (e) => {
        document.querySelector(".active").className = "btn btn-light";
        e.target.className = "btn btn-primary active";
    }
    return (
        <div className='border'>
            <div className='d-flex'>
                <div>Overview</div>
                <div class="btn-group btn-group-sm border border-black" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary active" onClick={makeActive}>Monthly</button>
                    <button type="button" class="btn btn-light" onClick={makeActive}>Yearly</button>
                </div>
            </div>
            <div className='d-flex gap-1'>
                <div>
                    <OverviewCard title="Cash In" />
                </div>
                <div>
                    <OverviewCard title="Cash Out" />
                </div>
            </div>
        </div>
    )
}

export default Overview