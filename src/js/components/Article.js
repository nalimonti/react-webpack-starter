import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteArticle } from "../actions";

const mapStateToProps = state => {
    return { articles: state.articles };
};

const mapDispatchToProps = dispatch => {
    return { deleteArticle: article => dispatch(deleteArticle(article)) }
};

class ConnectedArticle extends Component {
    constructor({ match }) {
        super();

        const { params } = match;
        const { id } = params;

        this.state = {
            articleId: id
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        console.log('deleting article');
        const article = this.props.articles.find(e => e.id === this.state.articleId);
        this.props.deleteArticle(article);
    }

    render() {
        console.log(this.state);
        console.log(this.props.articles);
        const article = this.props.articles.find(e => e.id === this.state.articleId);
        if (!this.props.articles.length || !article) {
            return (
                <Redirect to="/articles" />
            );
        }
        return(
            <div className="card">
                <div className="card-header">{article.title}</div>
                <div className="card-body">
                    <p className="card-text">{article.content}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/articles/${article.id}/edit`} key={article.id}>Edit</Link>
                    <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </div>
            </div>
        )
    }
}

const Article = connect(mapStateToProps, mapDispatchToProps)(ConnectedArticle);

export default Article;