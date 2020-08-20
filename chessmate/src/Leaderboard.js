import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import Axios from 'axios';

import './Leaderboard.css';
import UserBar from "./UserBar";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.multiplayer_data = {
            users: [
                { username: 'Bob', wins: 10, losses: 0, score: 100 },
                { username: 'Jake', wins: 4, losses: 2, score: 30 },
                { username: 'Bill', wins: 5, losses: 5, score: 25 },
                { username: 'Mike', wins: 1, losses: 2, score: 0 },
                { username: 'Philip', wins: 0, losses: 3, score: -15 }
            ]
        };
        this.singleplayer_data = {
            users: [
                { rank: 1, username: 'Sandra', wins: 100, losses: 0, score: 1000 },
                { rank: 2, username: 'Alexis', wins: 45, losses: 50, score: 200 },
                { rank: 3, username: 'Taylor', wins: 40, losses: 60, score: 100 },
                { rank: 4, username: 'Andrea', wins: 12, losses: 40, score: -80 },
                { rank: 5, username: 'Leslie', wins: 10, losses: 50, score: -150 }
            ]
        };

        this.state = {
            users_to_show: [],
            multiplayer: {
                usernameFilter: '',
                minRank: 0,
                maxRank: 8,
                minScore: 0,
                maxScore: 8,
                sortBy: 'rank'
            },
            sort_options: [{ value: 'rank', label: 'Rank' }, { value: 'username', label: 'Username' }, { value: 'wins', label: 'Wins' }, { value: 'losses', label: 'Losses' }],

        }

        this.runFilters = this.runFilters.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);
        this.usernameHandler = this.usernameHandler.bind(this);
        this.multiplayerSortByHandler = this.multiplayerSortByHandler.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentDidMount() {
        this.runFilters();
    }

    clearFilters() {
        console.log('ran')

        this.setState({
            multiplayer: {
                usernameFilter: '',
                minRank: 0,
                maxRank: 8,
                minScore: 0,
                maxScore: 8,
                sortBy: 'rank'
            }
        });

        this.runFilters();
    }

    renderTableData(mode) {
        if (mode === "multi") {
            return this.state.users_to_show.map((data) => {
                const { rank, username } = data;
                return (
                    <tr key={username}>
                        <td>{rank}</td>
                        <td>{username}</td>
                        <td>{data.multi.win}</td>
                        <td>{data.multi.loss}</td>
                    </tr>
                )
            })
        }
        else {
            return this.singleplayer_data.users.map((data) => {
                const { rank, username, wins, losses, score } = data;
                return (
                    <tr key={username}>
                        <td>{rank}</td>
                        <td>{username}</td>
                        <td>{wins}</td>
                        <td>{losses}</td>
                        <td>{score}</td>
                    </tr>
                )
            })
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.singleplayer_data.users[0]);
        return header.map((key) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    sliderHandler(e) {
        let newValue = parseInt(e.target.value);

        switch (e.target.id) {
            case 'multiplayer-min-rank':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: newValue,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: prevState.multiplayer.minScore,
                        maxScore: prevState.multiplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;

            case 'multiplayer-max-rank':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: prevState.multiplayer.minRank,
                        maxRank: newValue,
                        minScore: prevState.multiplayer.minScore,
                        maxScore: prevState.multiplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'multiplayer-min-score':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: prevState.multiplayer.minRank,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: newValue,
                        maxScore: prevState.multiplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'multiplayer-max-score':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: prevState.multiplayer.minRank,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: prevState.multiplayer.minScore,
                        maxScore: newValue,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
        }

        setTimeout(() => { console.log(this.state.multiplayer); this.runFilters(); }, 100);
    }

    usernameHandler(e) {
        let newValue = e.target.value.trim();

        if (e.target.id === 'multiplayer-username-filter') {
            this.setState(prevState => ({
                multiplayer: {
                    sortBy: prevState.multiplayer.sortBy,
                    minRank: prevState.multiplayer.minRank,
                    maxRank: prevState.multiplayer.maxRank,
                    minScore: prevState.multiplayer.minScore,
                    maxScore: prevState.multiplayer.maxScore,
                    usernameFilter: newValue
                }
            }));
        }

        setTimeout(() => { console.log(this.state); this.runFilters(); }, 100);
    }

    multiplayerSortByHandler(e) {
        this.setState(prevState => ({
            multiplayer: {
                usernameFilter: prevState.multiplayer.usernameFilter,
                minRank: prevState.multiplayer.minRank,
                maxRank: prevState.multiplayer.maxRank,
                minScore: prevState.multiplayer.minScore,
                maxScore: prevState.multiplayer.maxScore,
                sortBy: e.value
            }
        }));
        setTimeout(() => { console.log(this.state); this.runFilters(); }, 100);
    }

    compareByRank(el1, el2) {
        console.log(el1.multi.win, el2.multi.win)

        if (el1.multi.win < el2.multi.win) {
            return 1
        }
        else if (el1.multi.win > el2.multi.win) {

            return -1
        }
        else {
            return 0
        }
    }

    compareByLoss(el1, el2) {
        if (el1.multi.loss < el2.multi.loss) {
            return 1
        }
        else if (el1.multi.loss > el2.multi.loss) {

            return -1
        }
        else {
            return 0
        }
    }

    compareByUsername(el1, el2) {
        if (el1.username > el2.username) {
            return 1
        }
        else if (el1.username < el2.username) {
            return -1
        }
        else {
            return 0
        }
    }

    runFilters() {
        let temp = [];

        Axios.get('http://localhost:5000/users')
            .then(response => {
                // this.setState({ games_to_show: [...response.data] })
                temp = response.data;
                // temp = this.multiplayer_data.users;
                temp = temp.sort(this.compareByRank);
                let i = 1;
                temp.forEach(el => { el.rank = i; i++ })

                if (this.state.multiplayer.usernameFilter.length > 0) {
                    temp = temp.filter(user => user.username.includes(this.state.multiplayer.usernameFilter))
                }
                if (this.state.multiplayer.sortBy === 'username') {
                    temp = temp.sort(this.compareByUsername);
                }
                if (this.state.multiplayer.sortBy === 'losses') {
                    temp = temp.sort(this.compareByLoss);
                }
                if (this.state.multiplayer.minRank > 0) {
                    temp = temp.filter(user => user.rank >= this.state.multiplayer.minRank)
                }
                if (this.state.multiplayer.maxRank < 100) {
                    temp = temp.filter(user => user.rank <= this.state.multiplayer.maxRank)
                }
                this.setState(state => ({ users_to_show: temp }));
            })
            .catch(error => this.setState({ users_to_show: this.multiplayer_data.users }))
    }


    render() {
        return (
            <div>
                <br />
                <div className="row">
                    <div className='col s6 padded'>
                        <div className="padded wrapper card blue-grey darken-1 z-depth-5">
                            <h3 id='leaderboard_title'> Sorting and Filtering </h3>
                            <button className='btn waves-effect waves-light btn inline space-around bigbutton' onClick={this.clearFilters}>Clear Filters</button>
                            <br />
                            <div className='row'>
                                <div className='col s6'>
                                    <h4>Filter Username</h4>
                                    <input id='multiplayer-username-filter' type='text' className='center white-text' value={this.state.multiplayer.usernameFilter} placeholder='Filter by username' onChange={this.usernameHandler}></input>
                                </div>
                                <div className='col s6'>
                                    <h4>Sort By</h4>
                                    <Dropdown options={this.state.sort_options} value={this.state.multiplayer.sortBy} onChange={this.multiplayerSortByHandler} />

                                </div>
                            </div>
                            <br />
                            <h4>Rank Range</h4>
                            <div className="row">
                                <div className='col s6'>
                                    <h6>Min Rank</h6>
                                    <div id='min-rank'>{this.state.multiplayer.minRank}</div>
                                    <div tooltip={this.state.multiplayer.minRank}>
                                        <input type="range" min="1" max="8" value={this.state.multiplayer.minRank} className="slider" id="multiplayer-min-rank" onChange={this.sliderHandler} />
                                    </div>
                                </div>
                                <div className='col s6'>
                                    <h6>Max Rank</h6>
                                    <div id='max-rank'>{this.state.multiplayer.maxRank}</div>
                                    <div tooltip={this.state.multiplayer.maxRank}>
                                        <input type="range" min="1" max="8" value={this.state.multiplayer.maxRank} className="slider" id="multiplayer-max-rank" onChange={this.sliderHandler} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col s6 padded'>
                        <div className="padded wrapper card blue-grey darken-1 z-depth-5" id="multiplayer_container">
                            <h3 id='leaderboard_title'> Multi-player </h3>
                            <button className='btn waves-effect waves-light btn inline space-around bigbutton' onClick={this.runFilters}>Refresh</button>
                            <br />
                            <table id='leaderboard_table' className='striped'>
                                <tbody>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Username</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                    </tr>
                                    {this.renderTableData("multi")}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Leaderboard;