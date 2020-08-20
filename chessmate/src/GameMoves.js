import React from 'react';

import './GameMoves.css';

class GameInfo extends React.Component{
   constructor(props){
       super(props)
       this.state = {
           moves: <tbody/>
       };
       this.updateMoves = this.updateMoves.bind(this);

   }

    updateMoves(moves){
        let chunks = []
       let table = "";
       for (let i = 0; i < moves.length; i ++){
           let chunk = ''
           if (moves[i].color === 'w') {
               chunk += "<tr>";
               chunk += "<td className='filter-text'>";
               chunk += moves[i].san;
               chunk += "</td>";
           } else if (moves[i].color === 'b'){
               chunk += "<td className='filter-text'>";
               chunk += moves[i].san;
               chunk += "</td>";
               chunk += "</tr>";
           }
           table+= chunk;
           chunks.push(chunk)

       }
       if (moves.length > 0 && moves[moves.length - 1].color === 'w') {
           table += "</tr>";
       }
        let reversed = "";
        if (chunks.length %2 ===0){
            for (let i = chunks.length - 2; i >= 0; i -=2){
                reversed += chunks[i];
                reversed += chunks[i+1];
            }
        }else{
            reversed += chunks[chunks.length - 1];
            reversed += "</tr>";
            for (let i = chunks.length - 3; i >= 0; i -=2){
                reversed += chunks[i];
                reversed += chunks[i+1];
            }
        }
        if ( document.getElementById("moves_list") !== null){
            document.getElementById("moves_list").innerHTML = reversed;
        }

   }

   render(){
     return(
         <div className='wrapper gamemoves card blue-grey darken-1 z-depth-5'>
             <h3>Moves</h3>
             <table className='striped'>
                <thead>
                    <tr>
                      <th className='filter-text'>White {this.props.user ? "(" + this.props.user.username + ")" : ""}</th>
                      <th className='filter-text'>Black </th>
                    </tr>
                </thead>
                <tbody id='moves_list'>
                </tbody>
             </table>
         </div>
     )
   }
}

export default GameInfo;
