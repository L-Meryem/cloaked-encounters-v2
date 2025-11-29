import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const TableContext = createContext();

const TableProvider = ({ children }) => {
    const {userId} = useUser();
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTables = async () => {
        try {
            const res = await fetch('/api/tables');
            const result = await res.json();
            if (result) {
                setLoading(true);
                setTables(result.data);
            }
        } catch (error) {
            console.log('Table fetch error: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('useEffect fired');
        fetchTables();
    }, [userId]);

    const refetchTables = () => fetchTables();

    return (
        <TableContext.Provider value={{ tables, loading, refetchTables }}>
            {children}
        </TableContext.Provider>
    );
};

const useTable = () => useContext(TableContext);

export { TableProvider, TableContext, useTable };