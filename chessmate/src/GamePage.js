import React from 'react';

import Game from './Game';
import GameTime from './GameTime';
import GameMoves from './GameMoves';
import GameLostPieces from './GameLostPieces';

//import './GamePage.css';

class GamePage extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col s6'>
                        <Game />
                    </div>
                    <div className='col s6'>
                        <GameTime user={this.props.user}/>
                    </div>
                    {/*<div className='col s6'>*/}
                        {/*<GameLostPieces user={this.props.user}/>*/}
                    {/*</div>*/}
                    <div className='col s6'>
                        <GameMoves user={this.props.user}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default GamePage;
