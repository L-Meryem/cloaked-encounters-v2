import { createContext, useContext, useState, useEffect } from 'react';

const ChainContext = createContext();

const ChainProvider = ({ children }) => {
    const [chains, setChains] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchChains = async () => {
        const res = await fetch('/api/chains');
        const result = await res.json();
        setChains(result.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchChains();
    }, []);

    const refetchChains = () => fetchChains();

    return (
        <ChainContext.Provider value={{ chains, loading, refetchChains }}>
            {children}
        </ChainContext.Provider>
    );
};

const useChain = ()=> useContext(ChainContext);

export { ChainProvider, ChainContext, useChain };