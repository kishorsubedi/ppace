import React, { Component } from "react";
import Mainbar from "./mainbar";

export default class Login extends Component {
    constructor(){
        super();
        this.state={username:'',password:'',isAdmin:false}
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    render() {
        return (
            <React.Fragment>

                <div className="form-group">
                    <input type="username" name="username" value={this.state.username} className="form-control" placeholder="Enter email" onChange={this.handleChange.bind(this)} />
                </div>

                <div className="form-group">
                    <input type="password" name="password" value={this.state.password} className="form-control" placeholder="Enter password"  onChange={this.handleChange.bind(this)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={(event) => this.handleClick(event)}>Login</button>

            </React.Fragment>
        );
    }
    
    setAdminState(json){
        console.log("sd");
        if(json=="true"){
            this.state.isAdmin = true;
            return;
        }
        this.state.isAdmin = false;
    }

    async handleClick(event){
        //console.log(this.state.username);
        //console.log(this.state.password);
        fetch(`https://ppace.azurewebsites.net/auth?uid=`+ this.state.username + `&pwd=` + this.state.password)
          .then(res => res.json())
          .then(json => this.setAdminState(json));

        //send this data to backend, return true or false. set mainbar's variable accordingly
        //let response = await fetch(url);
        //let data = await response.json()
        //console.log(data);
    }
}