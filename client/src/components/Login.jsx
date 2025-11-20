import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const checkUser = async e => {
        e.preventDefault();
        try {
            const res = await fetch('api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', //send and save cookies for auth
                body: JSON.stringify({ email, password })
            });
            const loginStatus = await res.json();
            console.log(loginStatus);
            loginStatus.success ?
                navigate("/") :
                setError(loginStatus.message);
        } catch (error) {
            setError('Something went wrong.')
        }
    };

    return (
        <form onSubmit={checkUser}>
            {error ? <small>{error}</small> : ''}
            <input type="email" name="email" id="email" placeholder='Email' required
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="password" placeholder='Password' required
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;