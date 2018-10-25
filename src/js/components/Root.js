import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import App from './App'
import Article from './Article';
import Articles from './Articles';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link className="navbar-brand" to="/"> Home</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <Link className="nav-item nav-link" to="/articles" style={{color: 'white'}}>Articles</Link>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <Route exact path="/" component={App}/>
                    <Route path="/articles" component={Articles}/>
                    <Route path="/articles/:id" component={Article}/>
                </div>
            </div>
        </Router>
    </Provider>
);

export default Root;