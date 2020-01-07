import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import LoginService from '../services/LoginService';
class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isAuth: false
        };
    }

    handleOnInput = (ev) => {
        this.setState({
            [ev.target.id]: ev.target.value
        });
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        
        if (await LoginService.sign(this.state)) {
            this.setState({isAuth: true});
        }
    }
    render() {
        if (this.state.isAuth) {
            return <Redirect path="/" />
        }
        return (
            <div className="row">
                <div className="col-md-5 col-auto mt-2">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" id="username" className="form-control" onInput={this.handleOnInput} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" id="password" className="form-control" onInput={this.handleOnInput} />
                        </div>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
