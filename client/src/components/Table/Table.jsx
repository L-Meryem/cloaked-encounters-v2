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

    const handleDragStart = (e, table) => {
        e.dataTransfer.setData('application/json', JSON.stringify(table));
        e.dataTransfer.effectAllowed = 'move';
    };

    if (render)
        return (
            <ul>
                {
                    tables.map(table => (
                        <li key={table._id} draggable="true"
                            onDragStart={e => handleDragStart(e, table)}
                        >{table.name}</li>
                        //on dragStart store data in dataTransfer
                    ))
                }
            </ul>
        )
}


export default Table;