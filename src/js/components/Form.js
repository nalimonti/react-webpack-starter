import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';
import { addArticle } from "../actions";

const mapDispatchToProps = dispatch => {
    return { addArticle: article => dispatch(addArticle(article)) }
};

class ConnectedForm extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            content: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('handle form change');
        console.log(event);
        console.log(event.target);
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        console.log('handling form submit');
        console.log(event);
        console.log(this.state);
        event.preventDefault();
        const { title, content } = this.state;
        const id = uuidv1();
        this.props.addArticle({ title, content, id });
        this.setState({ title: '', content: '' });
    }

    render() {
        const { content, title } = this.state;
        return (
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
        )
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;