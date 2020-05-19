import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import * as serviceWorker from '../serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Topbar from './topbar';
import Mainbar from './mainbar';

export default class App extends Component{
    render(){
        return(
            <React.Fragment> 
                <Topbar/>
                <Mainbar/>
            </React.Fragment>
            );
    }
}