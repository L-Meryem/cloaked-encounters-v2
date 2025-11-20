import React from 'react';
import { useEffect, useState } from 'react';

const Table = ({ sendTables, render = true }) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            const res = await fetch('api/tables');
            const tables = await res.json();
            setTables(tables.data);
            if (sendTables)
                sendTables(tables.data);
        }
        fetchTables();
    }, [sendTables]);
    if (render)
        return (
            <ul>
                {
                    tables.map(table => (
                        <li key={table._id}>{table.name}</li>
                    ))
                }
            </ul>
        )
}


export default Table;