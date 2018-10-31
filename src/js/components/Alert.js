import React, {Component} from 'react';
import { connect } from 'react-redux';
import {removeAlert} from "../actions";

const mapStateToProps = state => {
    return { alert: state.alert };
};

const mapDispatchToProps = dispatch => {
    return {
        removeAlert: () => dispatch(removeAlert())
    }
};

class ConnectedAlert extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className={"alert alert-" + this.props.alert.type} role="alert">
                {this.props.alert.message}
                <button className="btn btn-danger" onClick={() => this.props.removeAlert()}>Remove</button>
            </div>
        )
    }
}

const Alert = connect(mapStateToProps, mapDispatchToProps)(ConnectedAlert);

export default Alert;