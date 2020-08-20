import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import NavBar from './NavBar';
import Header from './Header';
import Footer from './Footer';

import M from 'materialize-css';

import './LoginSignup.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: '',
            password: '',
            error: ''
        }
        this.getError = this.getError.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.login = this.login.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    login() {
        Axios.post('http://localhost:5000/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            if (typeof (response.data.message) == 'string') {
                console.log(response.data.message)
                this.setState({ error: response.data.message });
                this.clear();
            }
            else {
                alert(`${response.data.message.username} logged in successfully!`);
                this.props.login(response.data.message);
                this.clear(1);
                this.setState({ redirect: true });
            }
        }).catch(error => {
            this.setState(state => ({ error: 'Some error occured!' }));
            this.clear();
        })
    }

    clear(flag) {
        if (flag === 1) {
            this.setState(state => ({
                username: '',
                password: '',
                error: ''
            }))
        }
        else {
            this.setState(state => ({
                username: '',
                password: '',
            }))
        }

    }

    getError() {
        if (this.state.error) {
            return (
                <div className="error">
                    <h6>{this.state.error}</h6>
                </div>
            )
        }
        else {
            return ''
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        else {
            return (
                <div>
                    <br />
                    <div className='login_signup card blue-grey darken-1 z-depth-5'>
                        <Header title='Login' />
                        <br />
                        <div>
                            <div className="input-field col s6">
                                <p>Username</p>
                                <input type="text" onChange={this.updateUsername} className="validate center" placeholder="Enter username here" value={this.state.username} autoFocus />
                            </div>
                            <div className="input-field col s6">
                                <p>Password</p>
                                <input type="password" onChange={this.updatePassword} className="validate center" placeholder="Enter password here" value={this.state.password} />
                            </div>
                            <a className="waves-effect waves-light btn inline space-around" onClick={this.login}>Login</a>
                            <a className="waves-effect waves-light btn inline space-around" onClick={this.clear}>Clear</a>
                            <br />
                            <br />
                            {this.getError()}
                        </div>
                    </div>
                    <br />
                </div>
            )
        }
    }
}

export default Login;