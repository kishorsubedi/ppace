import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>

            </form>
        );
    }
}