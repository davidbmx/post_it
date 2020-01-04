import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
        try {
            const response = await axios.post('/token/', this.state);
            localStorage.setItem('token', response.data.access);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            this.setState({isAuth: true});
        } catch (err) {
            alert('error');
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
