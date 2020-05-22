import React, { Component } from "react";
import Mainbar from "./mainbar";
import '../index.css';

export default class Login extends Component {

    render() {
        console.log(this.props.admin);
        return (
            <React.Fragment>

                <div className="form-group">
                    <input type="username" name="username" value={this.props.username} className="form-control" placeholder="Enter email" onChange={this.props.handleChange} />
                </div>

                <div className="form-group">
                    <input type="password" name="password" value={this.props.password} className="form-control" placeholder="Enter password"  onChange={this.props.handleChange}/>
                </div>

                {this.logInButton()}

            </React.Fragment>
        );
    }

    logInButton(){
        if(this.props.admin){
            return(<button type="submit" className="logout" onClick={(event) => this.handleLogout(event)}>Logout</button>);
        }
        return(<button type="submit" className="btn btn-primary btn-block" onClick={(event) => this.handleLogin(event)}>Login</button>);
    }

    handleLogout(){
        this.props.setAdminState(JSON.parse('false'));
    }
    
    async handleLogin(event){
        console.log(this.props.username);
        //console.log(this.state.username);
        //console.log(this.state.password);
        fetch(`https://ppace.azurewebsites.net/auth?uid=`+ this.props.username + `&pwd=` + this.props.password)
          .then(res => res.json())
          .then(json => this.props.setAdminState(json));

        //send this data to backend, return true or false. set mainbar's variable accordingly
        //let response = await fetch(url);
        //let data = await response.json()
        //console.log(data);
    }
}