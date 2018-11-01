import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { logout } from "../actions";

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

class Nav extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { user } = this.props;
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/"> Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <Link className="nav-item nav-link" to="/articles" style={{color: 'white'}}>Articles</Link>
                        {!user ? <Link className="nav-item nav-link" to="/signup" style={{color: 'white'}}>Sign Up</Link> : ''}
                        {!user ? <Link className="nav-item nav-link" to="/login" style={{color: 'white'}}>Login</Link> : ''}
                        {user ? <a className="nav-item nav-link" onClick={() => this.props.logout()} style={{color: 'white'}}>Logout</a> : ''}
                    </ul>
                </div>
            </nav>
        )
    }
}

Nav.propTypes = {
    user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav)