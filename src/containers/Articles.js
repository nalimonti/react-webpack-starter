import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getArticles, setArticlesLoaded } from '../actions/Articles';

class Articles extends Component {
    static propTypes = {
        Layout: PropTypes.func.isRequired,
        articles: PropTypes.array,
        articlesLoaded: PropTypes.bool,
        setArticlesLoaded: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({}),
        }),
        user: PropTypes.object
    };

    static defaultProps = {
        match: null,
    };

    state = {
        errorMessage: null,
    };

    componentDidMount() {
        const { articlesLoaded } = this.props;
        if (!articlesLoaded) this.fetchArticles();
    }

    fetchArticles() {
        return this.props.getArticles().then(resp => {
            this.props.setArticlesLoaded();
        }).catch(e => {
            console.log(e);
            // const { message } = e;
            // this.props.setAlert({ message, type: 'danger' });
        })
    }

    render = () => {
        console.log('render articles container');
        console.log(this.props);
        const {
            articles,
            Layout,
            match,
            user
        } = this.props;

        const id = (match && match.params && match.params.id) ? match.params.id : null;

        const { errorMessage } = this.state;

        return (
            <Layout
                articleId={id}
                articles={articles}
                user={user}
            />
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles,
    articlesLoaded: state.articlesLoaded || false,
    user: state.user
});

const mapDispatchToProps = {
    getArticles,
    setArticlesLoaded
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
