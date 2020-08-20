const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    name: String,
    white: [], // positions of white pieces
    black: []  // positions of black pieces
})

module.exports = mongoose.model('Board', boardSchema);