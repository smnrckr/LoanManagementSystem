import React, { useState } from 'react';
import './Header.css';

const Header=()=>{
    return(
        <header className='header'>
            <nav className='navbar'>
                <ul>
                    <li><a href="/about">Hakında</a></li>
                    <li><a href="/contact">İletişim</a></li>
                </ul>
            </nav>
            
        </header>
    );

}

export default Header;