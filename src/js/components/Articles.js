import React, {Component} from 'react';
import { connect } from 'react-redux';
import {showArticle, getArticles, setAlert, setArticlesLoaded} from "../actions";
import { Link, withRouter } from 'react-router-dom';
import Alert from './Alert';
import Nav from "./Nav";

const mapStateToProps = state => {
    return {
        articles: state.articles,
        alert: state.alert,
        articlesLoaded: state.articlesLoaded,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showArticle: article => dispatch(showArticle(article)),
        fetchArticles: () => getArticles(dispatch),
        setAlert: alert => dispatch(setAlert(alert)),
        setArticlesLoaded: () => dispatch(setArticlesLoaded())
    }
};

class ConnectedArticles extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { articlesLoaded } = this.props;
        if (!articlesLoaded) this.fetchArticles();
    }

    fetchArticles() {
        console.log('fetching articles');
        return this.props.fetchArticles().then(resp => {
            console.log(resp);
            this.props.setArticlesLoaded();
        }).catch(e => {
            const { message } = e;
            this.props.setAlert({ message, type: 'danger' });
        })
    }

    handleClick(event) {
        const { id } = event.target;
        const article = this.props.articles.find(e => e.id === id);
        if (article) {
            this.props.showArticle(article);
        }
    }

    render() {
        console.log('render articles');
        console.log(this.props);
        return(
            <div>
                <Nav/>
                <div className="mt-5 container">
                    {this.props.alert ? <Alert/> : ''}
                    <h3>Articles</h3>
                    <Link to="/">Create Article</Link>
                    <ul className="list-group list-group-flush">
                        {this.props.articles.map(el => (
                            <Link to={`/articles/${el.id}`} key={el.id} className="list-group-item">{el.title}</Link>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

const Articles = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedArticles));

export default Articles;