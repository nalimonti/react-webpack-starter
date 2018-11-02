import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {updateArticle, createArticle} from "../actions/Articles";

class Login extends Component {
    static propTypes = {
        Layout: PropTypes.func.isRequired,
        onArticleCreate: PropTypes.func.isRequired,
        onArticleUpdate: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        articles: PropTypes.array,
        match: PropTypes.shape({
            params: PropTypes.shape({}),
        }),
    };

    state = {
        errorMessage: null,
        successMessage: null
    };

    onFormSubmit = (data) => {
        const { onArticleUpdate, onArticleCreate, match } = this.props;

        let action = onArticleCreate;
        let formData = data;
        if (match && match.params && match.params.id) {
            action = onArticleUpdate;
            Object.assign(formData, {id: match.params.id});
        }

        console.log('submitting article form data', formData);

        return action(formData)
            .then(data => {
                console.log('article form action success', data);
                const { message = 'Success!' } = data;
                this.setState({ successMessage: message });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err }); throw err;
            });
    };

    render = () => {
        console.log('articleform container render');
        console.log(this.props);
        const {
            user,
            Layout,
            isLoading,
            articles,
            match
        } = this.props;

        let id = null;
        if (match && match.params && match.params.id) {
            id = match.params.id;
        }

        const { errorMessage, successMessage } = this.state;

        return (
            <Layout
                user={user}
                onFormSubmit={this.onFormSubmit}
                articles={articles}
                articleId={id}
                success={successMessage}
                error={errorMessage}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    isLoading: state.loading || false,
    successMessage: state.success || '',
    articles: state.articles
});

const mapDispatchToProps = {
    onArticleUpdate: updateArticle,
    onArticleCreate: createArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
