import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, setAlert } from "../actions";
import Alert from './Alert';
import Nav from "./Nav";

const mapDispatchToProps = dispatch => {
    return {
        login: user => login(dispatch, user),
        setAlert: alert => dispatch(setAlert(alert))
    }
};

const mapStateToProps = state => {
    return { alert: state.alert };
};

class ConnectedLogin extends Component {
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
        this.props.login(this.state).then((resp) => {
            console.log('login callback');
            console.log(resp);
            // this.props.setAlert({message: 'Article saved!', type: 'primary'});
            // this.setState({ title: '', content: '' });
        }).catch(e => {
            console.log(e);
            const { message = 'Could not log in' } = e;
            this.props.setAlert({ message, type: 'danger' })
        });
    }

    render() {
        const { password, email } = this.state;
        return (
            <div>
                <Nav/>
                <div className="container mt-5">
                    {this.props.alert ? <Alert/> : ''}
                    <h4>Login</h4>
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

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login;