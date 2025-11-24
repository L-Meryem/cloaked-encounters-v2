import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './Search';

const Navbar = ({isLogin})=> {
    return (
        <nav className="border split-nav">
            <div className="nav-brand">
                <h3><Link to="#">Cloaked Encounter</Link></h3>
            </div>
            {isLogin && (<SearchBar />)}
            {isLogin && (
                 <div className="collapsible">
                <input id="collapsible1" type="checkbox" name="collapsible1" />
                <label htmlFor="collapsible1">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </label>
                <div className="collapsible-body">
                    <ul className="inline">
                        <li><NavLink to="#">Meryem</NavLink></li>
                    </ul>
                </div>
            </div>
            )}
           
        </nav>
    )
}

export default Navbar;


