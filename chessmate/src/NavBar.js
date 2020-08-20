import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper blue-grey darken-1 z-depth-5">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to='/'>Home</Link></li>
                        {this.props.user && !this.props.user.inGame ? <li><Link to='/lobby'>Lobby</Link></li> : ""}
                        {this.props.user && this.props.user.inGame ? <li><Link id='game-lnk' to='/game'>Game</Link></li> : <li hidden><Link id='game-lnk' to='/game'>Game</Link></li>}
                        {/* <li><Link to='/lobby'>Lobby</Link></li>
                        <li><Link id='game-lnk' to='/game'>Game</Link></li> */}
                        <li><Link to='/leaderboard'>Leaderboard</Link></li>
                    </ul>
                    <a href="#" className="brand-logo center">ChessMate</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link className={this.props.user ? 'profile-link orange darken-1 btn' : 'waves-effect waves-light btn'}
                            to={this.props.user ? (this.props.user.isAdmin ? '/admin' : '/profile') : '/login'}>{this.props.user ? this.props.user.username : 'Login'}</Link></li>
                        <li onClick={this.props.user ? this.props.logout : () => { }}><Link className="waves-effect waves-light btn" to={this.props.user ? '/' : '/signup'}>{this.props.user ? 'Logout' : 'Signup'}</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;
