import React from 'react';

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import Lobby from './LobbyPage';
import Game from './GamePage';
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage';
import ProfilePage from './Profile';
import AdminPage from './Admin';
import Footer from './Footer';

const Router = (props) => {
    const user = props.user;
    const lobby = props.lobby;
    const login = props.login;
    const logout = props.logout;
    const hideShowHist = props.hideShowHist;
    const resetMulti = props.resetMulti;
    const resetSolo = props.resetSolo;
    const changeName = props.changeName;
    const addFriend = props.addFriend;

    return (
        <BrowserRouter>
            <NavBar user={user} logout={logout} />
            <Switch>
                <Route path='/admin' render={() => user && user.isAdmin ? <AdminPage user={user} login={login} logout={logout} /> : <HomePage user={user} logout={logout} />} />
                <Route path='/login' render={() => <Login user={user} login={login} logout={logout} />} />
                <Route path='/signup' render={() => <Signup user={user} logout={logout} />} />
                <Route path='/lobby' render={() => user ? <Lobby user={user} logout={logout} /> : <HomePage user={user} logout={logout} />} />
                <Route path='/leaderboard' render={() => <Leaderboard user={user} logout={logout} />} />
                <Route path='/game' render={() => user ? <Game user={user} logout={logout} /> : <HomePage user={user} logout={logout} />} />
                <Route path='/profile' render={() => user ? <ProfilePage user={user} logout={logout} addFriend={addFriend}z
                    hideShowHist={hideShowHist} resetMulti={resetMulti} resetSolo={resetSolo} changeName={changeName} /> :
                    <HomePage user={user} logout={logout} />
                } />
                <Route path='/' exact render={() => <HomePage user={user} logout={logout} />} />
                <Route component={ErrorPage} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

export default Router;