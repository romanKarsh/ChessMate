
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');


const mongoose = require('mongoose');
const { ObjectID } = require('mongodb')
const User = require('./User');
const Game = require('./Game');

// const dbCon = require('./database');

const PUBLIC_PATH = path.join(path.dirname(__filename), 'public');
const PORT = process.env.PORT || 5000;

const app = express();
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.use(express.static(PUBLIC_PATH));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PATCH");
    next();
})

app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

const sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if ("myid" in req.body) {
        User.findById(req.body.myid).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send({ message: "Unauthorized" })
        })
    } else {
        res.status(401).send({ message: "Unauthorized" })
    }
}

app.get('/', (req, res, next) => {
    res.send('<h1>Welcome To ChessMate API</h1>');
});

app.get('/signup', (req, res, next) => {
    res.send('<h1>Please use POST endpoint.</h1>')
});

app.get('/profile', sessionChecker, (req, res, next) => {  // sessionChecker will redirect to / if not logged in
    res.send('<h1>This is your profile</h1>')
})

app.post('/player', authenticate, (req, res, next) => {
    let message = '';
    let us = null;
    User.findById(req.body.id).then((user) => {
        if (!user) {
            message = "no such user"
            return Promise.reject()
        } else {
            const fid = user.friends.map((obj) => {
                return obj.id;
            })
            us = user;
            return User.find( { _id: { $in: fid } } )
        }
    }).then((stuff) => {
        for (let i = 0; i < stuff.length; i++) {
            us.friends[i].name = stuff[i].username
        }
        return User.replaceOne({ _id : us._id }, us);
    }).then((final) => {
        if (final.nModified > 0) {
            res.send(us, 200) // send new updated user
        } else {
            res.send({ message: "backend problem" }, 200)
        }
    }).catch((error) => {
        if (message) {
            res.send({ message}, 200)
        } else {
            res.send({ message: "backend problem" }, 200)
        }
    })
});

app.post('/addFriend', authenticate, (req, res, next) => {
    // example of body { "id":"5de1e33c9ac5e8236c82f769" }
    // FOR SOME REASON CAN'T SET STATUS TO ANYTHING BUT 200, REACT COMPLAINS..
    const friendName = req.body.name;
    let message = ''
    User.findOne({ username: friendName }).then((theUser) => {
        if (!theUser) {
            message = "can't add, no such user"
            return Promise.reject()
        } else if (req.user._id.equals(theUser._id)) {
            message = "can't add yourself"
            return Promise.reject()
        } else {
            return User.findOneAndUpdate({ _id: req.user._id, 'friends.id': { $ne: theUser._id } },
                { $addToSet: { friends: { id: theUser._id, name: theUser.username, gamesPlayed: 0 } } }, { new: true })
        }
    }).then((user) => {
        if (!user) {
            //res.status(404).send({ message: "can't add, already friends" })  // could not find this student
            res.send({ message: "can't add, already friends" }, 200)
        } else {
            res.send(user);
        }
    }).catch((error) => {
        if (message) {
            //res.status(404).send({ message })  // could not find this student
            res.send({ message }, 200)
        } else {
            //res.status(500).send({ message: 'Some BACKEND error occured.' })
            res.send({ message: "backend problem" }, 200)
        }
    })
})


app.post('/ban', (req, res, next) => {
    const banUserId = req.body.userId;
    if (!ObjectID.isValid(banUserId)) {
        res.send({ message: "can't ban, not a valid _id" }, 200)
    } else if (req.body.myId == banUserId) {
        res.send({ message: "can't ban yourself" }, 200)
    } else {
        let message = ''
        User.findOne({ _id: banUserId }).then((theUser) => {
            if (!theUser) {
                message = "can't ban, no such user"
                return Promise.reject()
            } else {
                let isBanned = req.body.isBanned;
                return User.findOneAndUpdate({ _id: banUserId },
                    { $set: { isBanned: isBanned?false:true } }, { new: true })
            }
        }).then((user) => {
            res.send(user);
        }).catch((error) => {
            if (message) {
                res.send({ message }, 200)
            } else {
                res.send({ message: "backend problem" }, 200)
            }
        })
    }
})


app.patch('/addBadge', authenticate, (req, res, next) => {
    //example is { "badge":"./imgs/gold_star.png"}
    const newBadge = req.body.badge;
    User.findOneAndUpdate({ _id: req.user._id }, { $push: { badges: newBadge } }, { new: true }).then((user) => {
        if (!user) {
            res.send({ message: "no such user.. strange" }, 200)
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.send({ message: "backend problem" }, 200)
    })
})

app.patch('/matchHist', authenticate, (req, res, next) => {
    //example is { "hide": false}
    const hid = req.body.hide;
    User.findOneAndUpdate({ _id: req.user._id }, { $set: { matchHistoryView: hid } }, { new: true }).then((user) => {
        if (!user) {
            res.send({ message: "no such user.. strange" }, 200)
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.send({ message: "backend problem" }, 200)
    })
})

app.patch('/changeName', authenticate, (req, res) => {
    //example is { "myid":"5de1e33c9ac5e8236c82f769", "username":"newpret" }
    const body = { username: req.body.username }
    if (req.body.username.length < 4) {
        res.send({ message: "name too short" }, 200)
    } else {
        User.findOne({ username: req.body.username }, (error, theUser) => {
            if (error) {
                res.send({ message: "backend problem" }, 200)
            } else {
                if (theUser) {
                    res.send({ message: "name already taken" }, 200)
                } else {
                    User.findOneAndUpdate({ _id: req.user._id }, { $set: body }, { new: true }).then((user) => {
                        if (!user) {
                            res.send({ message: "no such user.. strange" }, 200)
                        } else {
                            res.send(user)
                        }
                    }).catch((error) => {
                        res.send({ message: "backend problem" }, 200)
                    })
                }
            }
        })
    }
})

app.patch('/resetStats', authenticate, (req, res) => { // multi or solo
    //example is { "solo":true}
    let prop = "multi";
    if (req.body.solo) {
        prop = "solo";
    }
    const body = { [prop]: { win: 0, loss: 0, draw: 0 } }
    User.findOneAndUpdate({ _id: req.user._id }, { $set: body }, { new: true }).then((user) => {
        if (!user) {
            res.send({ message: "no such user.. strange" }, 200)
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.send({ message: "backend problem" }, 200)
    })
})

app.patch('/increaseStats', authenticate, (req, res) => { // multi or solo
    //example is { "solo":true, "res":1} // res options are 0, 1 and 2
    let prop = "multi";
    if (req.body.solo) {
        prop = "solo";
    }
    let gameres = "win"
    if (req.body.res == 0) {
        gameres = "draw";
    } else if (req.body.res == 2) {
        gameres = "loss"
    }
    let query = prop + "." + gameres
    let body = {
        [query]: 1
    }
    User.findOneAndUpdate({ _id: req.user._id }, { $inc: body }, { new: true }).then((user) => {
        if (!user) {
            res.send({ message: "no such user.. strange" }, 200)
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.send({ message: "backend problem" }, 200)
    })
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.post('/signup', (req, res, next) => {
    const username = req.body.username;
    let password = req.body.password;
    const displayPicture = req.body.displayPicture;

    User.findOne({ username }, (error, theUser) => {
        if (error) {
            res.send({ message: 0 });
        }
        else {
            if (theUser) {
                res.send({ message: -1 });
            }
            else {
                bcrypt.hash(password, 1, (error, hash) => {
                    if (error) {
                        res.send({ message: 0 });
                    }
                    else {
                        password = hash;
                        const newUser = new User({
                            username,
                            password,
                            displayPicture,
                            score: 0,
                            multi: {
                                win: 0,
                                loss: 0,
                                draw: 0,
                            },
                            isAdmin: false,
                            isBanned: false,
                            inGame: false,
                            matchHistoryView: true,
                            badges: [],
                            friends: [],
                            matchHistory: []
                        });

                        newUser.save()
                            .then(response => res.send({ message: 1 }))
                            .catch(err => res.send({ message: 0 }));
                    }
                })
            }
        }
    });
});

app.get('/login', (req, res, next) => {
    res.send('<h1>Please use POST endpoint.</h1>')
});

app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let message = '';

    User.findOne({ username }, (error, theUser) => {
        if (error) {
            message = 'Some backend error occured 1!';
        }
        else {
            if (theUser) {
                if (!theUser.isBanned) {
                  bcrypt.compare(password, theUser.password)
                      .then(result => {
                          if (result) {
                              message = theUser;
                              req.session.user = theUser._id;
                          }
                          else {
                              message = 'Invalid credentials!';
                          }
                      })
                      .catch(error => message = 'Some backend error occured 2!');
                } else {
                  message = 'User has been banned!';
                }
            }
            else {
                message = 'User not found!';
            }
        }
        setTimeout(() => res.send({ message }), 200);
        // res.send({ message });
    });
});

app.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send({ message: 'Some error occured' })
        }
        res.send(users);
    })
});


app.get('/games', (req, res, next) => {
    Game.find({}, (err, game) => {
        if (err) {
            res.send({ message: 'Some error occured' })
        }
        res.send(game);
    })
});

// 'mongodb+srv://testuser:testpassword@chessmate-lktsr.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://testuser:testpassword@chessmate-lktsr.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.log(`Chessmate API listening on port ${PORT}...`))
    })
    .catch(err => console.log(err))


const http = require('http').createServer(app);
const io = require('socket.io')(http);
let current_socket = "";
http.listen(5001, () => console.log(`Chessmate API listening on port ${PORT}...`))


app.post('/game/create', (req, res) => {
    const ChessGame = new Game({
        player1: req.body.username,
        color1: req.body.color,
        socket1: current_socket
    });
    ChessGame.save().then((result) => {
        User.updateOne({ username: req.body.username }, { inGame: true }).then((user) => { console.log(user); res.send(result) }).catch(err => console.log(err))
    }, (error) => {
        res.status(400).send(error)
    })
});

app.post('/game/join/:id', (req, res) => {
    let id = req.params.id;
    Game.findById(id).then((ChessGame) => {
        if (!ChessGame) {
            res.status(404).send()
        } else {
            ChessGame.player2 = req.body.username;
            if (ChessGame.color1 === "b") {
                ChessGame.color2 = "w";
            } else {
                ChessGame.color2 = "b";
            }
            ChessGame.socket2 = current_socket;

            ChessGame.save().then((result) => {
                User.updateOne({ username: req.body.username }, { inGame: true }).then((user) => { console.log(user); res.send(result) }).catch(err => console.log(err))
            }, (error) => {
                res.status(400).send(error)
            });
            console.log("socket: " + ChessGame.socket1 + ", game: " + id);
            io.to(ChessGame.socket1).emit('id', id);
            io.to(ChessGame.socket2).emit('id', id);

            io.to(ChessGame.socket1).emit('side', ChessGame.color1);
            io.to(ChessGame.socket2).emit('side', ChessGame.color2);

            //mateen code
            io.to(ChessGame.socket1).emit('time', ChessGame.time);
            io.to(ChessGame.socket2).emit('time', ChessGame.time);

        }
    }).catch((error) => {
        res.status(500).send()  // server error
    })
});


app.get('/game/:id', (req, res) => {
    const id = req.params.id;
    Game.findById(id).then((ChessGame) => {
        if (!ChessGame) {
            res.status(404).send()
        } else {
            io.to(ChessGame.socket1).emit('id', id);
            io.to(ChessGame.socket1).emit('id', id);

            io.to(ChessGame.socket1).emit('side', ChessGame.color1);
            io.to(ChessGame.socket2).emit('side', ChessGame.color2);
        }
    }).catch((error) => {
        res.status(500).send()  // server error
    })
});

app.post('/game/:id/result', (req, res) => {
    const id = req.params.id;
    // console.log("resultid:" + id);
    Game.findById(id).then((ChessGame) => {
        if (!ChessGame) {
            res.status(404).send()
        } else {
            const player1 = ChessGame.player1;
            const player2 = ChessGame.player2;

            User.updateOne({ username: player1 }, { inGame: false }).then((user) => { console.log('CHECK1') }).catch(err => console.log(err))
            User.updateOne({ username: player2 }, { inGame: false }).then((user) => { console.log('CHECK2') }).catch(err => console.log(err))

            const result = req.body.result;
            if (result === ChessGame.color1) {
                // TODO
                // player1 won
                // player2 lost
                res.status(200).send()
            } else if (result === ChessGame.color2) {
                // player1 lost
                // player2 won
                res.status(200).send()
            } else if (result === "draw") {
                // player1 draw
                // player2 draw
                res.status(200).send()
            } else {
                res.status(404).send()
            }
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send()  // server error
    })
});

io.on('connection', function (socket) {
    // console.log(socket.id)
    current_socket = socket.id;
    socket.on('move', function (move) {
        socket.broadcast.emit('move', move);
    });
    socket.on('fen', function (fen) {
        // console.log('fen: ' + fen);
        socket.broadcast.emit('fen', fen);
    });
    socket.on('time', function (time) {
        socket.broadcast.emit('time', time);
    })
});
