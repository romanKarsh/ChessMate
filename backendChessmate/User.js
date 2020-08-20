const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayPicture: String,
    isAdmin: Boolean,
    isBanned: Boolean,
    inGame: Boolean,
    multGame: mongoose.Schema.Types.ObjectId,  // Game id this player is in rn
    score: Number,
    multi: {
        win: Number,
        loss: Number,
        draw: Number
    },
    friends: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        gamesPlayed: Number
    }],
    matchHistoryView: Boolean, // is game history viewable to others
    matchHistory: [mongoose.Schema.Types.ObjectId],
    badges: [String],
})

module.exports = mongoose.model('User', userSchema);
