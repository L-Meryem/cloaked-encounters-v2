import { createContext, useContext, useState, useEffect } from 'react';

const TableContext = createContext();

const TableProvider = ({ children }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTables = async () => {
        const res = await fetch('/api/tables');
        const result = await res.json();
        setTables(result.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const refetchTables = () => fetchTables();

    return (
        <TableContext.Provider value={{ tables, loading, refetchTables }}>
            {children}
        </TableContext.Provider>
    );
};

const useTable = ()=> useContext(TableContext);

export { TableProvider, TableContext, useTable };