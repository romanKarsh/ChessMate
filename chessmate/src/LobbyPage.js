import React from 'react';

import UserBar from './UserBar';
import GameBar from './GamesBar';

import './LobbyPage.css';

class LobbyPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col s6'>
                        <UserBar user={this.props.user} />
                    </div>

                    <div className='col s6'>
                        <GameBar username={this.props.user ? this.props.user.username : ''} />
                    </div>
                </div>
            </div>
        )
    }
}

export default LobbyPage;