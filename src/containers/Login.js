import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, logout } from '../actions/User';

class Login extends Component {
    static propTypes = {
        Layout: PropTypes.func.isRequired,
        user: PropTypes.shape({}).isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        successMessage: PropTypes.string.isRequired,
    };

    state = {
        errorMessage: null,
    };

    onFormSubmit = (data) => {
        const { onFormSubmit } = this.props;
        return onFormSubmit(data)
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err }); throw err;
            });
    };

    render = () => {
        console.log('login container render');
        const {
            user,
            Layout,
            isLoading,
            successMessage,
        } = this.props;

        const { errorMessage } = this.state;

        return (
            <Layout
                user={user}
                loading={isLoading}
                error={errorMessage}
                success={successMessage}
                onFormSubmit={this.onFormSubmit}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user || {},
    isLoading: state.loading || false,
    successMessage: state.success || '',
});

const mapDispatchToProps = {
    onFormSubmit: login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
