import React from 'react';
import {Link} from "react-router-dom";
import Logout from "./Logout";
import PropTypes from 'prop-types';

const Nav = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/"> Home</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
                <Link className="nav-item nav-link" to="/articles" style={{color: 'white'}}>Articles</Link>
                <Link className="nav-item nav-link" to="/login" style={{color: 'white'}}>Login</Link>
                <Logout/>
            </ul>
        </div>
    </nav>
);

Nav.propTypes = {
    user: PropTypes.object
};

export default Nav;