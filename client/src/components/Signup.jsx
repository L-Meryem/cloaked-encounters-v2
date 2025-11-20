import React from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <form>
            <input type="text" name="username" id="username" placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <input type="email" name="email" id="email" placeholder='Email' required
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="password" placeholder='Password' required
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Signup</button>
        </form>
    )
}

export default Signup;