import React, { Component } from "react";

export default class Login extends Component {
    constructor(){
        super();
        this.state={username:'',password:''}
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

    handleClick(event){
        console.log(this.state.username);
        console.log(this.state.password);
    }
}