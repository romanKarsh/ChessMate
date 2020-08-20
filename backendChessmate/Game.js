const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    player1: String,
    player2: String,
    color1: String, //b or w
    color2: String, //b or w
    socket1: String,
    socket2: String,
    state : {
        fen: String,
        history: [String]
    }
});

module.exports = mongoose.model('Game', gameSchema);