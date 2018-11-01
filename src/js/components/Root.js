import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import App from './App'
import Article from './Article';
import Articles from './Articles';
import EditForm from './EditForm';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';
import Nav from "./Nav";
import { Container } from 'reactstrap';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Container>
                <PrivateRoute exact path="/" component={App} />
                <Route exact path="/articles" component={Articles} />
                <Route exact path="/articles/:id" component={Article} />
                <PrivateRoute exact path="/articles/:id/edit" component={EditForm} />
                <Route exact path="/login" component={Login} />
            </Container>
        </Router>
    </Provider>
);

export default Root;

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// };
//
// class Root extends Component {
//     constructor({ store }) {
//         super();
//         this.store = store;
//     }
//
//     render() {
//         return(
//             <Provider store={this.store}>
//                 <Router>
//                     <Nav user={this.props.user}/>
//                 </Router>
//             </Provider>
//         )
//     }
// }
//
// export default connect(mapStateToProps)(Root)
