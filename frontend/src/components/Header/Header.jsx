import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from "primereact/overlaypanel";


const Header = ({ profile, logOut }) => {
    const profileOP = useRef(null);
    return (
        <div className="header container fixed-top bg-white" style={{ maxWidth: "100%" }}>
            <div className="row">
                <div className="col-10 navbar navbar-expand-lg">
                    <NavLink className="navbar-brand p-0" to="/">FMS</NavLink>
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
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories">Categories</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-top">
                    <Avatar icon="pi pi-user" shape="circle" onClick={(e) => profileOP.current.toggle(e)} style={{ backgroundColor: '#222222', color: '#ffffff', width: '40px', height: "40px" }} />
                    <OverlayPanel ref={profileOP}>
                        <div className="">
                            <div className="">
                                <h6 className="m-0 p-0">Hello! {profile.name}</h6>
                                <span>{profile.email}</span>
                            </div>
                            <div className="m-0 mt-2 p-0">
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