import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-light bg-light m-0 p-2">
                <a className="navbar-brand" href="/">FMS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
            </nav>
        </div>
    );
};

export default Header;