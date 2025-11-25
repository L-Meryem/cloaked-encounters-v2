import React, { useEffect, useState } from 'react';


const SharedTables = (isShared, setIsShared) => {
    const [sharedTables, setSharedTables] = useState([]);

    useEffect(() => {
        const fetchSharedTables = async () => {
            const res = await fetch('/api/tables/shared');
            const result = await res.json();
            setSharedTables(result.data);
        };

        fetchSharedTables();
    }, [[JSON.stringify(isShared)]]);


    return (
        <ul className='tablesList child-borders child-shadows-hover'>
            {
                sharedTables.map(table => (
                    <li key={table._id} draggable="true" className='border'>
                        <span className='name'>{table.name}</span> <span className='die'>{table.die}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default SharedTables;