import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import App from './App'
import Article from './Article';
import Articles from './Articles';
import EditForm from './EditForm';
import Login from './Login';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link className="navbar-brand" to="/"> Home</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <Link className="nav-item nav-link" to="/articles" style={{color: 'white'}}>Articles</Link>
                            <Link className="nav-item nav-link" to="/login">Login</Link>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <Route exact path="/" component={App} />
                    <Route exact path="/articles" component={Articles} />
                    <Route exact path="/articles/:id" component={Article} />
                    <Route exact path="/articles/:id/edit" component={EditForm} />
                    <Route exact path="/login" component={Login} />
                </div>
            </div>
        </Router>
    </Provider>
);

export default Root;