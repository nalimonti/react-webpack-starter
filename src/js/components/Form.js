import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';
import { addArticle, setAlert } from "../actions";
import Alert from './Alert';

const mapStateToProps = state => {
    return { articles: state.articles, alert: state.alert };
};

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => addArticle(dispatch, article),
        setAlert: alert => dispatch(setAlert(alert))
    }
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
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        const id = uuidv1();
        this.props.addArticle({ title, content, id }).then(() => {
            this.props.setAlert({message: 'Article saved!', type: 'primary'});
            this.setState({ title: '', content: '' });
        });
    }

    render() {
        console.log(this.state);
        console.log(this.props);
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

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;