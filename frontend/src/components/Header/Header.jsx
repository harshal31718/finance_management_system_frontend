import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from "primereact/overlaypanel";


const Header = ({ logOut }) => {
    const profileOP = useRef(null);
    return (
        <div className="header container p-0 " style={{ maxWidth: "1000px" }}>
            <div className="row">
                <div className="col-10 navbar navbar-expand-lg navbar-light bg-light m-0 my-2 p-0 pl-3 bg-white">
                    <NavLink className="navbar-brand p-0" to="/home">FMS</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/income">Income</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/expense">Expense</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/assets">Assets</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/liabilities">Liabilities</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-top m-0 my-3 p-0 pr-3 bg-white">
                    <Avatar icon="pi pi-user" shape="circle" onClick={(e) => profileOP.current.toggle(e)} style={{ backgroundColor: '#222222', color: '#ffffff', width: '40px', height: "40px" }} />
                    <OverlayPanel ref={profileOP}>
                        <div>
                            <div>
                                <h6>Hello! Harshal Dodke</h6>
                            </div>
                            <div>
                                <button className="btn btn-outline-danger" type="button" onClick={logOut} size="small" >Log Out</button>
                            </div>
                        </div>
                    </OverlayPanel>
                </div>
            </div>
        </div>
    );
};

export default Header;