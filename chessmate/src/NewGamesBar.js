import React from 'react';
import Dropdown from 'react-dropdown';
import M from 'materialize-css';
import Axios from 'axios';

import './NewGamesBar.css';
import 'react-dropdown/style.css'


class NewGamesBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer_options: [{ value: 'timed', label: 'Timed' }, { value: 'untimed', label: 'Untimed' }],
            color_options: [{ value: 'white', label: 'White' }, { value: 'black', label: 'Black' }],
            timed: '',
            color: '',
            error: ''
        }
        this.updateTimedMode = this.updateTimedMode.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.launchNewGame = this.launchNewGame.bind(this);
        this.getError = this.getError.bind(this);
        this.clear = this.clear.bind(this);
    }


    updateTimedMode(e) {
        this.setState({ timed: e.value });
    }

    updateColor(e) {
        this.setState({ color: e.value });
    }

    launchNewGame() {
        if (!this.state.timed) {
            this.setState({ error: 'Please select timed mode!' });
        }
        else if (!this.state.color) {
            this.setState({ error: 'Please select a game color!' });
        }
        else {
            Axios.post('http://localhost:5000/game/create', {
                username: this.props.username,
                color: this.state.color === 'white' ? 'w' : 'b'
            }).then(response => {
                console.log(response.data);
                M.toast({ html: `New ${this.state.color.toUpperCase()} Game Created Successfully!` });
                this.clear();
                const el = document.getElementById('game-lnk');
                const theclick = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                const clicked = el.dispatchEvent(theclick);
            }).catch(error => {
                console.error(error);
                M.toast({ html: `Some Error Occured! Could Not Create New Game!` });
                this.clear();
            });
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

    clear() {
        this.setState({
            timed: '',
            color: '',
            error: ''
        })
    }

    // getCorrectOutupt() {
    //     if (this.props.username.length === 0) {
    //         return (

    //         )
    //     }
    //     else {
    //         return (

    //         )
    //     }
    // }
    render() {
        return (
            <div className={this.props.username ? 'wrapper newGamesBar card blue-grey darken-1' : 'wrapper newGamesBar card blue-grey darken-1 disabled'}>
                <h4>Custom Game</h4>
                <div className='row'>
                    <div className='col s6'>
                        <h5>Timed/Untimed:</h5>
                        <Dropdown options={this.state.timer_options} onChange={this.updateTimedMode} value={this.state.timed} placeholder='Select Time Mode' />
                    </div>
                    <div className='col s6'>
                        <h5>Color:</h5>
                        <Dropdown options={this.state.color_options} onChange={this.updateColor} value={this.state.color} placeholder='Select Color' />
                    </div>
                </div>
                <div className='row'>
                    <a onClick={this.launchNewGame} className="waves-effect waves-light btn-large">New Game</a>
                </div>
                {this.getError()}
            </div>
        )
    }
}

export default NewGamesBar;