import { createContext, useContext, useState, useEffect } from 'react';

const ChainContext = createContext();

const ChainProvider = ({ children }) => {
    const [chains, setChains] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchChains = async () => {
        try {
            const res = await fetch('/api/chains');
            const result = await res.json();
            if (result) {
                setLoading(true);
                setChains(result.data);
            }
        } catch (error) {
            console.log('Chain fetch error: ', error);
        } finally {
            setLoading(false);
        }
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

const useChain = () => useContext(ChainContext);

export { ChainProvider, ChainContext, useChain };