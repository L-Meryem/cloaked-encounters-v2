import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './Search';

const Navbar = () => {
    return (
        <nav className="border split-nav">
            <div className="nav-brand">
                <h3><a href="#">Cloaked Encounter</a></h3>
            </div>
            <SearchBar />
            <div className="collapsible">
                <input id="collapsible1" type="checkbox" name="collapsible1" />
                <label for="collapsible1">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </label>
                <div className="collapsible-body">
                    <ul className="inline">
                        <li><NavLink for="#">Meryem</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;


