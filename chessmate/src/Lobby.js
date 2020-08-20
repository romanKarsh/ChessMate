import React from 'react';
import Dropdown from 'react-dropdown';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import './Lobby.css';
import 'react-dropdown/style.css'
import { exportDefaultSpecifier } from '@babel/types';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.lobby)
        this.state = {
            sort_options: [{ value: 'id', label: 'Id' }, { value: 'host', label: 'Host' }, { value: 'availability', label: 'Availability' }],
            show_only_available: false,
            host_filter: '',
            sort_by: 'id',
            games_to_show: []
        }

        this.toggleAvailabilityFilter = this.toggleAvailabilityFilter.bind(this);
        this.runFilters = this.runFilters.bind(this);
        this.updateHostFilter = this.updateHostFilter.bind(this);
        this.updateSortOption = this.updateSortOption.bind(this);
        this.joinGame = this.joinGame.bind(this);

        setInterval(this.runFilters, 1000);
    }

    updateHostFilter(e) {
        this.setState({ host_filter: e.target.value.trim() });
        setTimeout(this.runFilters, 100);
    }

    toggleAvailabilityFilter() {
        this.setState(state => ({ show_only_available: !(state.show_only_available) }));
        setTimeout(this.runFilters, 100);
    }

    updateSortOption(e) {
        this.setState({ sort_by: e.value });
        setTimeout(() => { console.log(this.state.sort_by); this.runFilters() }, 100);
    }

    compareById(el1, el2) {
        if (el1._id > el2._id) {
            return 1
        }
        else if (el1._id < el2._id) {
            return -1
        }
        else {
            return 0
        }
    }

    compareByHost(el1, el2) {
        if (el1.player1 > el2.player1) {
            return 1
        }
        else if (el1.player1 < el2.player1) {
            return -1
        }
        else {
            return 0
        }
    }

    compareByAvailability(el1, el2) {
        if (el1.player2 && !el2.player2) {
            return 1
        }
        else if (el2.player2 && !el1.player2) {
            return -1
        }
        else {
            return 0
        }
    }


    runFilters() {
        let temp = [];

        Axios.get('http://localhost:5000/games')
            .then(response => {
                // this.setState({ games_to_show: [...response.data] })
                temp = response.data;

                if (this.state.show_only_available) {
                    temp = temp.filter(game => !game.player2);
                }
                if (this.state.host_filter.length > 0) {
                    temp = temp.filter(game => game.player1.includes(this.state.host_filter))
                }
                if (this.state.sort_by === 'id') {
                    temp = temp.sort(this.compareById);
                }
                if (this.state.sort_by === 'host') {
                    temp = temp.sort(this.compareByHost);
                }
                if (this.state.sort_by === 'availability') {
                    temp = temp.sort(this.compareByAvailability);
                }
                this.setState(state => ({ games_to_show: temp }));
            })
            .catch(error => this.setState({ games_to_show: [...this.props.lobby] }))
    }

    joinGame(e) {
        const gameid = e.target.getAttribute('gameid');
        const requestURL = `http://localhost:5000/game/join/${gameid}`;
        // console.log(requestURL)
        Axios.post(requestURL, { username: this.props.username })
            .then(response => {
                console.log(response.data);
                const el = document.getElementById('game-lnk');
                const theclick = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                const clicked = el.dispatchEvent(theclick);
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className='wrapper lobby card blue-grey darken-1 z-depth-5'>
                <h3>Lobby</h3>
                <div className='lobby-body wrapper'>
                    <table className='striped'>
                        <thead>
                            <tr>
                                <th>Game #</th>
                                <th>Player 1 (Host)</th>
                                <th>Player 2</th>
                                <th>Availability</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.games_to_show.map(game => (
                                <tr key={game._id}>
                                    <td>{game._id.substring(game._id.length - 4, game._id.length)}</td>
                                    <td><em>{game.player1}</em></td>
                                    <td><em>{game.player2}</em></td>
                                    <td>{game.player2 ? <div className='inprogress'></div> : <div className='available'></div>}</td>
                                    <td>{game.player2 ? <a className="waves-effect waves-light btn" disabled>Join</a> : <a gameid={game._id} onClick={this.joinGame} className="waves-effect waves-light btn" >Join</a>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <div className='row filter-wrapper'>
                    <div className='col s6'>
                        <h5>Sort by:</h5>
                        <Dropdown options={this.state.sort_options} value={this.state.sort_by} onChange={this.updateSortOption} />
                    </div>
                    <div className='col s6'>
                        <form>
                            <p>
                                <label>
                                    <input type="checkbox" className='filled-in' className='filter-box' checked={this.state.show_only_available} onChange={this.toggleAvailabilityFilter} />
                                    <span className='filter-text'>Show Only Available Games</span>
                                </label>
                            </p>
                            <input type='text' value={this.state.host_filter} placeholder='Filter by Host' className='center white-text' onChange={this.updateHostFilter} />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby;