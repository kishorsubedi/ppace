import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import * as serviceWorker from '../serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Topbar from './topbar';
import Mainbar from './mainbar';

export default class App extends Component{
    state= {username:'',password:'',isAdmin:false}

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    setAdminState = (json) => {
        if(String(json) === "true"){ 
            console.log("ds");
            this.setState({username:'', password: '', isAdmin:true});
            return;
        }
        this.setState({isAdmin:false});
    }

    render(){
        return(
            <React.Fragment> 
                <Topbar admin={this.state.isAdmin} handleChange={this.handleChange} setAdminState={this.setAdminState} username={this.state.username} password={this.state.password}/>
                <Mainbar admin={this.state.isAdmin} username={this.state.username}/>
            </React.Fragment>
            );
    }
}