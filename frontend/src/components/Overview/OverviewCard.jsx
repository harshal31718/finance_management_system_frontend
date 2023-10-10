import React from 'react'

const OverviewCard = ({ title }) => {
    return (
        <div className='card'>
            <div>
                <span>
                    {title} :
                    <span> 10000</span>
                </span>
            </div>
            <div>
                <span>
                    Expected :
                    <span> 150000</span>
                </span>
            </div>
        </div>
    )
}

export default OverviewCard