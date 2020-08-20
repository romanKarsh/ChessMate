import React from 'react';

import githubIcon from './imgs/github-brands.svg';

import './Footer.css';


class Footer extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){
        return (
            <div className="footer-wrapper blue-grey darken-1 z-depth-5">
                <div className='row center'>
                    <br />
                    <h5>Developed By:</h5>
                    <br />
                    <div className='col s3'>
                        <div className='dev-info'>
                            <a href='https://github.com/mateenah95' target='_blank'>
                                <img src={githubIcon} height='40' width='40' />
                                <p>Mateen Ahmed</p>
                            </a>
                        </div>
                    </div>
                    <div className='col s3'>
                        <div className='dev-info'>
                            <a href='https://github.com/jprier' target='_blank'>
                                <img src={githubIcon} height='40' width='40' />
                                <p>Joshua Prier</p>
                            </a>
                        </div>
                    </div>
                    <div className='col s3'>
                        <div className='dev-info'>
                            <a href='https://github.com/cheesywow' target='_blank'>
                                <img src={githubIcon} height='40' width='40' />
                                <p>Xiqian Liu</p>
                            </a>
                        </div>
                    </div>
                    <div className='col s3'>
                        <div className='dev-info'>
                            <a href='https://github.com/romanKarsh' target='_blank'>
                                <img src={githubIcon} height='40' width='40' />
                                <p>Roman Karshakevich</p>
                            </a>
                        </div>
                    </div>
                    <br />
                </div>
                <h5 className='center'>&copy; Chessmate 2019-2020</h5>
            </div>
        )
    }

}

export default Footer;