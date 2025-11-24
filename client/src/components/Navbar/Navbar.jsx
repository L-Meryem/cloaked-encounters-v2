import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './Search';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/exit.png'

const Navbar = ({ isLogin, userName, setUserName }) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                navigate("/guest");
                setUserName('');
            }
            else
                console.log(error);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="border split-nav">
            <div className="nav-brand">
                <h3><Link to="/">Cloaked Encounter</Link></h3>
            </div>
            {isLogin && (
                <div >
                    <ul className="menu">
                        <li><SearchBar /></li>
                        <li className='user border'>{userName}</li>
                        <li><NavLink onClick={logout}>
                            <img className="exit" src={LogoutIcon} alt="Logout" />
                        </NavLink></li>
                    </ul>
                </div>
            )}

        </nav>
    )
}

export default Navbar;


