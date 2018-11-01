import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from "../actions";
import PropTypes from 'prop-types';
import {isAuthenticated} from "../helpers/authHelper";


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

class ConnectedLogout extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('click logout');
        this.props.logout();
        // this.render();
    }

    render() {
        console.log('render logout');
        console.log(this.props);
        return (
            <span>
                {this.props.user ? <a className="nav-item nav-link" style={{color: 'white'}} onClick={this.handleClick}>Logout</a> : '' }
            </span>
        )
    }
}

ConnectedLogout.propTypes = {
    user: PropTypes.object
};

const Logout = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogout);

export default Logout;