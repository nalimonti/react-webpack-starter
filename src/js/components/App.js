import React from 'react';
import Form from './Form';
import Nav from "./Nav";

const App = () => (
    <div>
        <Nav/>
        <div className="row mt-5">
            <div className="col-md-10 offset-md-1">
                <h2>Add a new article</h2>
                <Form />
            </div>
        </div>
    </div>
);

export default App;