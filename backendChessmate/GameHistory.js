const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    player1: mongoose.Schema.Types.ObjectId,
    player1Name: String,
    player2: mongoose.Schema.Types.ObjectId,
    player2Name: String,
    result: {type: Number, min: 0, max: 2 } // 0 draw, 1 win player1 and 2 win player2
})

module.exports = mongoose.model('GameHistory', boardSchema);