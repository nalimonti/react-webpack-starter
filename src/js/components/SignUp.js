import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, setAlert, removeAlert } from "../actions";
import Alert from './Alert';
import Nav from "./Nav";

const mapDispatchToProps = dispatch => {
    return {
        signUp: user => signUp(dispatch, user),
        setAlert: alert => dispatch(setAlert(alert)),
        removeAlert: () => dispatch(removeAlert())
    }
};

const mapStateToProps = state => {
    return { alert: state.alert };
};

class ConnectedSignUp extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.signUp(this.state).then((resp) => {

        }).catch(e => {
            const { message = 'Could not log in' } = e;
            this.props.setAlert({ message, type: 'danger' });
            setTimeout(() => this.props.removeAlert(), 5000);
        });
    }

    render() {
        const { password, email } = this.state;
        return (
            <div>
                <Nav/>
                <div className="container mt-5">
                    {this.props.alert ? <Alert/> : ''}
                    <h4>Sign Up</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Email</label>
                            <input type="text" className="form-control" id="email" value={email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Password</label>
                            <input type="text" className="form-control" id="password" value={password} onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-success btn-lg">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const SignUp = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignUp);

export default SignUp;