import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {updateArticle} from "../actions/Articles";

class Login extends Component {
    static propTypes = {
        Layout: PropTypes.func.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
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
        console.log('articleform container render');
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
                onFormSubmit={this.onFormSubmit}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    isLoading: state.loading || false,
    successMessage: state.success || '',
});

const mapDispatchToProps = {
    onFormSubmit: updateArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
