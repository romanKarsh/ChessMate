import React from 'react';

import './GameLostPieces.css'

class GameLostPieces extends React.Component{
   constructor(props){
     super(props)
   }

   render(){
     return(
         <div className='wrapper gamelostpieces card blue-grey darken-1 z-depth-5'>
             <h4> Lost Pieces </h4>
             <div className='row'>
                <ul className='pieces'>
                  <h5>White {this.props.user ? "(" + this.props.user.username + ")" : ""}</h5>
                  <li>♙</li>
                  <li>♞</li>
                  <li>♜</li>
                  <li>♟</li>
                </ul>
             </div>
             <div className='row'>
                <ul className='pieces'>
                  <h5>Black (Computer)</h5>
                  <li>♖</li>
                  <li>♙</li>
                  <li>♙</li>
                  <li>♙</li>
                </ul>
             </div>
         </div>
     )
   }
}

export default GameLostPieces;
