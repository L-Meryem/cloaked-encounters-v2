import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './Search';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/exit.png';
import { useUser } from '../../context/UserContext';
import { API_URL } from '../../utilities/config';

const Navbar = ({ isLogin}) => {
    const navigate = useNavigate();
    const {userName, setUserName} = useUser();

    const logout = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setUserName('');
                navigate("/guest");
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
                        {/* <li><SearchBar /></li> */}
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


