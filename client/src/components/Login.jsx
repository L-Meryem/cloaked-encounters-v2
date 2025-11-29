import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = ({ switchView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUserName } = useUser();

    const checkUser = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', //send and save cookies for auth
                body: JSON.stringify({ email, password })
            });
            const loginStatus = await res.json();
            console.log(loginStatus);
            if (loginStatus.success) {
                setUserName(loginStatus.user.userName);
                navigate("/");
            } else
                setError(loginStatus.message);
        } catch (error) {
            setError('Something went wrong.')
        }
    };

    return (
        <div className="border paper container container-xs login">
            <h1>Login</h1>
            <form onSubmit={checkUser}>
                {error ?
                    <div className="alert alert-danger">{error}</div> : ''}
                <input type="email" name="email" id="email" placeholder='Email' required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='Password' required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div className='btn-grp'>
                    <button type="submit">Login</button>
                    <button className="switch" onClick={switchView}>Signup</button>
                </div>
            </form>
        </div >
    )
}

export default Login;