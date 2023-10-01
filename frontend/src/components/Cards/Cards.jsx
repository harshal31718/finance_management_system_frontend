import React from 'react'

const Cards = ({ data }) => {
    return (<div className='cards d-flex flex-wrap'>
        {(data.length > 0) && (
            data.map((card, i) =>
                <div class="card m-2 p-0" style={{ width: "18rem" }}>
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h6 class="card-text">{card.date}</h6>
                        <h5 class="card-title">{card.name}</h5>
                        <p class="card-text">{card.details}</p>
                        <h6 class="card-text">Monthly Maintainance: {card.monthlyMaintainance}</h6>
                        <h6 class="card-text">Monthly Income:{card.monthlyIncome}</h6>
                        {(card.note) && (
                            <>
                                <p class="card-text"><h6 class="card-text">Note:</h6>{card.note}</p>
                            </>
                        )}
                    </div>
                </div>
            )
        )}
    </div>
    )
}

export default Cards