import React from 'react'

const Cards = ({ data }) => {
    return (<div className='cards d-flex flex-wrap'>
        {(data.length > 0) && (
            data.map((card, i) =>
                <div className="card m-2 p-0" style={{ width: "18rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-text">{card.date}</h6>
                        <h5 className="card-title">{card.name}</h5>
                        <p className="card-text">{card.details}</p>
                        <h6 className="card-text">Monthly Maintainance: {card.monthlyMaintainance}</h6>
                        <h6 className="card-text">Monthly Income:{card.monthlyIncome}</h6>
                        {(card.note) && (<h6 className="card-text">Note: <span>{card.note}</span> </h6>)}
                    </div>
                </div>
            )
        )}
    </div>
    )
}

export default Cards