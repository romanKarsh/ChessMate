import React from 'react';
import { Link } from 'react-router-dom';

import html_icon from './imgs/html-icon.png';
import css_icon from './imgs/css-icon.png';
import js_icon from './imgs/js-icon.png';
import react_icon from './imgs/react-icon.png';
import mongo_icon from './imgs/mongo-icon.png';
import node_icon from './imgs/node-icon.png';
import express_icon from './imgs/express-icon.png';

import './HomePage.css';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col s4 center'>
                        <br />
                        <br />
                        <div className='circles blue-grey darken-1 '>
                            <h5>Multiplayer Support</h5>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className='circles blue-grey darken-1 '>
                            <h5>Dedicated Lobby</h5>
                        </div>
                    </div>
                    <div className='col s4 center'>
                        <h2>Welcome To ....</h2>
                        <div className='row'>
                            <div className='col s6 inner-l wrapper'>
                                <h1 className='center'>Chess</h1>
                            </div>
                            <div className='col s6 inner-r wrapper'>
                                <h1 className='center'>Mate</h1>
                            </div>
                        </div>
                        <br />
                        <div className='blue-grey darken-1 wrapper'>
                            <h4 className='special-head'>What is ChessMate?</h4>
                            <div className='special'>
                                <h5>ChessMate is an online singleplayer + multiplayer chess game project built from scratch using the JavaScript MERN stack. The project is a part of the CSC309 - Programming on the Web coursework at the University of Toronto - St George for the fall 2019 semester.</h5>
                                <br />
                                <Link to='/game'><button className="waves-effect waves-light btn playbutton">Play Now!</button></Link>
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className='col s4 center'>
                        <br />
                        <br />
                        <div className='circles blue-grey darken-1 '>
                            <h5>Dedicated Leaderboard</h5>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className='circles blue-grey darken-1 '>
                            <h5 className='insideCircle'>Admin Controls</h5>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row wrapper center blue-grey darken-1'>
                    <h3 className='special-head'>Development Stack Breakdown</h3>
                    <br />
                    <div className='col s3 wrapper'>
                        <h4 className='blue-grey-text'> . </h4>
                        <div className='col s12 lime darken-1'>
                            <h5>Languages:</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                        <div className='col s12 cyan darken-1'>
                            <h5>Libraries/Frameworks:</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                    </div>
                    <div className='col s3 wrapper'>
                        <h4 className='orange darken-4'>Front End</h4>
                        <div className='col s12'>
                            <h5 className='langs-frames'>HTML</h5>
                            <h5 className='langs-frames'>CSS</h5>
                            <h5 className='langs-frames'>JavaScript</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                        <div className='col s12'>
                            <h5 className='langs-frames'>Materialize</h5>
                            <h5 className='langs-frames'>React</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                    </div>
                    <div className='col s3 wrapper'>
                        <h4 className='green darken-4'>Data Layer</h4>
                        <div className='col s12'>
                            <h5 className='langs-frames'>JSON</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                        <div className='col s12'>
                            <h5 className='langs-frames'>MongoDB/Mongoose</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                    </div>
                    <div className='col s3 wrapper'>
                        <h4 className='pink darken-1'>Back End</h4>
                        <div className='col s12'>
                            <h5 className='langs-frames'>JavaScript</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                        <div className='col s12'>
                            <h5 className='langs-frames'>Node</h5>
                            <h5 className='langs-frames'>Express</h5>
                        </div>
                        <p className='blue-grey-text'> . </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;