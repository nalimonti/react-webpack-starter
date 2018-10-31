import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addArticle, showArticle} from "../actions";
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return { articles: state.articles };
};

const mapDispatchToProps = dispatch => {
    return { showArticle: article => dispatch(showArticle(article)) }
};

class ConnectedArticles extends Component {
    constructor() {
        super();
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