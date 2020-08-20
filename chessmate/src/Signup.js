import React from 'react';
import axios from 'axios';

import M from 'materialize-css';

import Header from './Header';

import './LoginSignup.css';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            displayPicture: '',
            error: ''
        }

        this.getError = this.getError.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
        this.updateDisplayPicture = this.updateDisplayPicture.bind(this);
        this.signup = this.signup.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value
        })
    }


    updateDisplayPicture(e) {
        this.setState({
            displayPicture: e.target.value
        })
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    updateConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    signup() {
        if (this.state.username.trim().length > 0) {
            if (this.state.password.trim() === this.state.confirmPassword.trim()) {
                if (this.state.password.trim().length >= 8) {
                    axios.post('http://localhost:5000/signup', {
                        username: this.state.username,
                        password: this.state.confirmPassword,
                        displayPicture: this.state.displayPicture
                    }).then(response => {
                        if (response.data.message === -1) {
                            this.setState({ error: 'Username already taken!' });
                            this.clear();
                        }
                        if (response.data.message === 0) {
                            this.setState({ error: 'Some server error ccured!' });
                            this.clear();
                        }
                        if (response.data.message === 1) {
                            M.toast({ html: `Successfully signed up '${this.state.username}' with password: '${this.state.password}'` })
                            this.clear(1);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
                else {
                    this.setState(state => ({ error: 'Password must be at least 8 characters!' }))
                    this.clear();
                }
            }
            else {
                this.setState(state => ({ error: 'Passwords must match!' }))
                this.clear();
            }
        }
        else {
            this.setState(state => ({ error: 'Username must be at least 1 character' }))
            this.clear();
        }
    }

    clear(flag) {
        if (flag === 1) {
            this.setState(state => ({
                username: '',
                password: '',
                confirmPassword: '',
                displayPicture: '',
                error: ''
            }))
        }
        else {
            this.setState(state => ({
                username: '',
                password: '',
                confirmPassword: '',
                displayPicture: ''
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
        return (
            <div>
                <br />
                <div className='login_signup card blue-grey darken-1 z-depth-5'>
                    <Header title='Signup' />
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
                        <div className="input-field col s6">
                            <p>Confirm Password</p>
                            <input type="password" onChange={this.updateConfirmPassword} className="validate center" placeholder="Enter password here" value={this.state.confirmPassword} />
                        </div>
                        <div className="input-field col s6">
                            <p>Display Picture</p>
                            <input type="text" onChange={this.updateDisplayPicture} className="validate center" placeholder="Enter display picture here" value={this.state.displayPicture} />
                        </div>
                        <a className="waves-effect waves-light btn inline space-around" onClick={this.signup}>Signup</a>
                        <a className="waves-effect waves-light btn inline space-around" onClick={this.clear} >Clear</a>
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

export default Signup;