import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const SeedContext = createContext();

const SeedProvider = ({ children }) => {
    const [seeds, setSeeds] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSeed = async () => {
        try {
            const res = await fetch('/api/seeds');
            const result = await res.json();
            if (result) {
                setLoading(true);
                setSeeds(result.data);
            }
        } catch (error) {
            console.log('Seed fetch error: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeed();
    }, []);

    const refetchSeeds = () => fetchSeed();

    return (
        <SeedContext.Provider value={{ seeds, loading, refetchSeeds }}>
            {children}
        </SeedContext.Provider>
    );
};

const useSeed = () => useContext(SeedContext);

export { SeedProvider, SeedContext, useSeed };