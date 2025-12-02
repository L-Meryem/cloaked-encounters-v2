import { useEdges } from '@xyflow/react';
import React, { Children } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../utilities/config';

//Hold user data
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/me`, 
                    { credentials: 'include'}
                );
                const data = await res.json();

                if (data.success) {
                    setUserName(data.user.userName);
                    setUserId(data.user.userId);
                }
                else
                    setUserName(null);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{userName, setUserName, userId, setUserId, loading}}>
            {children}
        </UserContext.Provider>
    );
};

// custom hook
const useUser = () => useContext(UserContext);


export { UserProvider, useUser };