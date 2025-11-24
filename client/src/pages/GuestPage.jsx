import React, { useState } from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar/Navbar';
import Signup from '../components/Signup';

const GuestPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignUp] = useState(true);
    return (
        <>
            <Navbar isLogin={isLogin} />
            <main className="border auth">
                {isSignup ? (
                    <Login switchView={()=>setIsSignUp(false)}/>
                ):
                <Signup switchView={()=>setIsSignUp(true)}/>
            }
                
            </main>
        </>
    )
}

export default GuestPage;