import React from 'react';
import M from 'materialize-css';
import Axios from 'axios';

import Router from './Router';

import GoldStar from './imgs/gold_star.png';
import Trophy from './imgs/trophy.png';
import Crown from './imgs/crown.png';
// import { REFUSED } from 'dns';

const TEST_USER = {
    isAdmin: false,
    username: 'standard_user',
    display_pic: 'http://google.com',
    score: 3200,
    rank: 4,
    solo: {
        win: 3,
        loss: 7,
        draw: 2
    },
    multi: {
        win: 9,
        loss: 4,
        draw: 6
    },
    uniqueId: 7,
    matchHistoryView: true, /*will match history be shown to others when profile is viewed*/
    badges: [GoldStar, Trophy, Crown], /*badges for playing this player has*/
    friends: [
        { name: "Tom", id: "1", gamesPlayed: 2, won: 1, lost: 1, draw: 0 },
        { name: "Bob", id: "3", gamesPlayed: 4, won: 1, lost: 2, draw: 1 },
        { name: "Jay", id: "2", gamesPlayed: 0 },
        { name: "Ray", id: "8", gamesPlayed: 0 },
        { name: "Max", id: "43", gamesPlayed: 0 }
    ],
    matchHistory: [
        { gameNum: 34, name: 'mateenah95', result: 'Draw' },
        { gameNum: 36, name: 'johndoe99', result: 'Win' },
        { gameNum: 37, name: 'billgates2010', result: 'Win' },
        { gameNum: 28, name: 'markzuckerberg69', result: 'Loss' }
    ]
};

const TEST_ADMIN = {
    isAdmin: true,
    username: 'standard_admin',
    display_pic: 'http://google.com',
    score: 3200,
    rank: 4,
    solo: {
        win: 3,
        loss: 7,
        draw: 2
    },
    multi: {
        win: 9,
        loss: 4,
        draw: 6
    },
    uniqueId: 7,
    matchHistoryView: true, /*will match history be shown to others when profile is viewed*/
    badges: [GoldStar, Trophy, Crown], /*badges for playing this player has*/
    friends: [
        { name: "Tom", id: "1", gamesPlayed: 2, won: 1, lost: 1, draw: 0 },
        { name: "Bob", id: "3", gamesPlayed: 4, won: 1, lost: 2, draw: 1 },
        { name: "Jay", id: "2", gamesPlayed: 0 },
        { name: "Ray", id: "8", gamesPlayed: 0 },
        { name: "Max", id: "43", gamesPlayed: 0 }
    ],
    matchHistory: [
        { gameNum: 34, name: 'mateenah95', result: 'Draw' },
        { gameNum: 36, name: 'johndoe99', result: 'Win' },
        { gameNum: 37, name: 'billgates2010', result: 'Win' },
        { gameNum: 28, name: 'markzuckerberg69', result: 'Loss' }
    ]
};

const TEST_LOBBY = [
    { id: 234, host: 'mateenah95', availability: 1 },
    { id: 235, host: 'billgates99', availability: 0 },
    { id: 236, host: 'elonmusk69', availability: 1 },
    { id: 237, host: 'eltonjohn47', availability: 0 },
    { id: 238, host: 'bobbyshremure21', availability: 1 },
    { id: 239, host: 'louisfonsi73', availability: 0 }
];


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            lobby: []
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.hideShowHist = this.hideShowHist.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.resetMulti = this.resetMulti.bind(this);
        this.resetSolo = this.resetSolo.bind(this);
        this.changeName = this.changeName.bind(this);
        this.updateUser = this.updateUser.bind(this);

        setInterval(this.updateUser, 1000);
    }

    componentWillMount() {
        window.addEventListener('unload', () => {
            localStorage.setItem('chessmateUser', JSON.stringify(this.state.user))
        });

        localStorage.getItem('chessmateUser') && this.setState(state => ({ user: JSON.parse(localStorage.getItem('chessmateUser')) }));

    }

    updateUser() {
        if (this.state.user) {
            Axios.post('http://localhost:5000/player', { myid: this.state.user._id, id: this.state.user._id })
                .then(response => {
                    console.log(response.data)
                    this.setState({ user: response.data })
                })
                .catch(error => { })
            console.log('UPDATED');
        }
        else {
            console.log('NO USER LOGGED IN')
        }
    }

    login(admn) {
        this.setState(state => ({ user: admn, lobby: TEST_LOBBY }))
        //if (admn) {
        //    this.setState(state => ({ user: TEST_ADMIN, lobby: TEST_LOBBY }))
        //} else {
        //    this.setState(state => ({ user: TEST_USER, lobby: TEST_LOBBY }))
        //}
    }

    logout() {
        M.toast({ html: 'Logout Success!' })
        this.setState(state => ({ user: null }))
    }

    addFriend(playerName) {
        Axios.post('http://localhost:5000/addFriend', {
            myid: this.state.user._id,
            name: playerName
        }).then(response => {
            if ("message" in response.data) {
                alert(response.data.message)
            } else {
                this.setState(state => ({
                    user: response.data, lobby: state.lobby
                }));
            }
        })
    }

    hideShowHist() {
        const new_hide = !this.state.user.matchHistoryView;
        Axios.patch('http://localhost:5000/matchHist', {
            myid: this.state.user._id,
            hide: new_hide
        }).then(response => {
            if ("message" in response.data) {
                alert(response.data.message)
            } else {
                this.setState(state => ({
                    user: response.data, lobby: state.lobby
                }));
            }
        }).catch(error => {
            console.log(error)
            alert("strange stuff..")
        })
    }

    changeName(newName) {
        let flag = false
        if (newName) {
            Axios.patch('http://localhost:5000/changeName', {
                myid: this.state.user._id,
                username: newName
            }).then(response => {
                if ("message" in response.data) {
                    alert(response.data.message)
                } else {
                    this.setState(state => ({
                        user: response.data, lobby: state.lobby
                    }));
                    if (!this.state.user.badges.includes(Crown)) {
                        console.log("should add crown")
                        Axios.patch('http://localhost:5000/addBadge', {
                            myid: this.state.user._id,
                            badge: Crown
                        }).then(response => {
                            if ("message" in response.data) {
                                alert(response.data.message)
                            } else {
                                this.setState(state => ({
                                    user: response.data, lobby: state.lobby
                                }));
                            }
                        }).catch(error => {
                            console.log(error)
                            alert("strange stuff..")
                        })
                    }
                }
            }).catch(error => {
                console.log(error)
                alert("strange stuff..")
            })
        }
    }

    resetSolo() {
        Axios.patch('http://localhost:5000/resetStats', {
            myid: this.state.user._id,
            solo: true
        }).then(response => {
            if ("message" in response.data) {
                alert(response.data.message)
            } else {
                this.setState(state => ({
                    user: response.data, lobby: state.lobby
                }));
            }
        }).catch(error => {
            console.log(error)
            alert("strange stuff..")
        })
    }

    resetMulti() {
        Axios.patch('http://localhost:5000/resetStats', {
            myid: this.state.user._id,
            solo: false
        }).then(response => {
            if ("message" in response.data) {
                alert(response.data.message)
            } else {
                this.setState(state => ({
                    user: response.data, lobby: state.lobby
                }));
            }
        }).catch(error => {
            console.log(error)
            alert("strange stuff..")
        })
    }

    render() {
        return (
            <Router user={this.state.user} lobby={this.state.lobby}
                login={this.login} logout={this.logout} hideShowHist={this.hideShowHist} addFriend={this.addFriend}
                resetMulti={this.resetMulti} resetSolo={this.resetSolo} changeName={this.changeName}
            />
        )
    }
}

export default App;
