import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addArticle, showArticle} from "../actions";
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    console.log('List mapstatetoprops');
    console.log(state);
    return { articles: state.articles };
};

const mapDispatchToProps = dispatch => {
    return { showArticle: article => dispatch(showArticle(article)) }
};

// const ConnectedList = ({ articles }) => (
//     <ul className="list-group list-group-flush">
//         {articles.map(el => (
//             <li className="list-group-item" key={el.id} onClick={this.handleClick}>{el.title}</li>
//         ))}
//     </ul>
// );

class ConnectedList extends Component {
    constructor() {
        super();
    }

    handleClick(event) {
        console.log('handle click');
        console.log(event.target.id);
        const { id } = event.target;
        const article = this.props.articles.find(e => e.id === id);
        console.log(article);
        if (article) {
            this.props.showArticle(article);
        }
    }

    render() {
        console.log(this.props.articles);
        return(
            <ul className="list-group list-group-flush">
                {this.props.articles.map(el => (
                    <Link to={`/${el.id}`} key={el.id}>{el.title}</Link>
                ))}
            </ul>
        )
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;