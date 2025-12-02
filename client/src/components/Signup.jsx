import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utilities/config';

const Signup = ({ switchView }) => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const makeUser = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', //send and save cookies for auth
                body: JSON.stringify({ userName, email, password, confirmPassword })
            });
            const signupstatus = await res.json();
            console.log(signupstatus);
            signupstatus.success ?
                navigate("/") :
                setError(signupstatus.errors
                    ? signupstatus.errors.map(err => err.message).join(", ")
                    : signupstatus.message);
        } catch (error) {
            setError('Something went wrong.')
        }
    };

    return (
        <div className="border paper container container-xs login">
            <h1>Sign up</h1>
            <form onSubmit={makeUser}>
                {error ?
                    <div className="alert alert-danger">{error}</div> : ''}
                <input type="text" className="username" id="username" placeholder='username'
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="email" className="email" id="email" placeholder='Email' required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="password" id="password" placeholder='Password' required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <input type="password" className="password" id="password" placeholder='Confirm Password' required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className='btn-grp'>
                    <button type="submit">Signup</button>
                    <button className="switch" onClick={switchView}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;