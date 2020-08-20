import React from 'react';

import './Header.css';

const Header = (props) => {
    return (
        <h1 className='header'>{props.title}</h1>
    )
}

export default Header;