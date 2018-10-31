import React, {Component} from 'react';
import { connect } from 'react-redux';
import {showArticle, getArticles, setAlert} from "../actions";
import { Link } from 'react-router-dom';
import Alert from './Alert';

const mapStateToProps = state => {
    return { articles: state.articles, alert: state.alert };
};

const mapDispatchToProps = dispatch => {
    return {
        showArticle: article => dispatch(showArticle(article)),
        fetchArticles: () => getArticles(dispatch),
        setAlert: alert => dispatch(setAlert(alert))
    }
};

class ConnectedArticles extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles() {
        return this.props.fetchArticles().then(resp => {
            console.log(resp);
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
        return(
            <div className="mt-5">
                {this.props.alert ? <Alert/> : ''}
                <h3>Articles</h3>
                <Link to="/">Create Article</Link>
                <ul className="list-group list-group-flush">
                    {this.props.articles.map(el => (
                        <Link to={`/articles/${el.id}`} key={el.id} className="list-group-item">{el.title}</Link>
                    ))}
                </ul>
            </div>

        )
    }
}

const Articles = connect(mapStateToProps, mapDispatchToProps)(ConnectedArticles);

export default Articles;