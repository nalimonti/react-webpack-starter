import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateArticle, setAlert } from "../actions";
import Alert from './Alert';

const mapStateToProps = state => {
    return { articles: state.articles, alert: state.alert };
};

const mapDispatchToProps = dispatch => {
    return {
        updateArticle: article => updateArticle(dispatch, article),
        setAlert: alert => dispatch(setAlert(alert))
    }
};

class ConnectedEditForm extends Component {
    constructor({ articles, match }) {
        super();

        const article = articles.find(a => a.id === parseInt(match.params.id));

        this.state = {
            title: article.title,
            content: article.content,
            id: article.id
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, content, id } = this.state;
        this.props.updateArticle({ title, content, id }).then(resp => {
            const { message } = resp;
            if (message && message.length) {
                this.props.setAlert({type: 'primary', message })
            }
        });
    }

    render() {
        const { content, title } = this.state;
        return (
            <div>
                {this.props.alert ? <Alert/> : ''}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" value={content} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

const EditForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedEditForm);

export default EditForm;