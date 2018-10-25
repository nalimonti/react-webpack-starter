import React, {Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    console.log('article mapstatetoprops');
    return { articles: state.articles };
};

class ConnectedArticle extends Component {
    constructor({ match }) {
        super();

        const { params } = match;
        const { id } = params;

        this.state = {
            articleId: id
        };
    }

    render() {
        const article = this.props.articles.find(e => e.id === this.state.articleId);
        return(
            <div className="card">
                <div className="card-header">{article.title}</div>
                <div className="card-body">
                    <p className="card-text">{article.content}</p>
                </div>
            </div>
        )
    }
}

const Article = connect(mapStateToProps)(ConnectedArticle);

export default Article;