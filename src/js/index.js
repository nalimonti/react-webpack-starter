import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { render } from 'react-dom';
import store from './store/index';
import Root from './components/Root';

render(
    <Root store={store} />,
    document.getElementById('app')
);