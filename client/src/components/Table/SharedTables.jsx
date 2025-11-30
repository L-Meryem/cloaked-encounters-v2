import React, { useEffect, useState } from 'react';
import { rollDie } from '../../utilities/roll';
import { useUser } from '../../context/UserContext';
import AddIcon from '../../assets/add.png';
import { saveNewTableToDb } from '../../utilities/fetches';
import { useTable } from '../../context/TableContext';


const SharedTables = ({ isShared, setIsShared, singleRoll }) => {
    const [sharedTables, setSharedTables] = useState([]);
    const { userId } = useUser();
    const { refetchTables} = useTable();

    useEffect(() => {
        const fetchSharedTables = async () => {
            const res = await fetch('/api/tables/shared');
            const result = await res.json();
            setSharedTables(result.data);
        };

        fetchSharedTables();
    }, [isShared]);
    return (
        <ul className='tablesList child-borders child-shadows-hover'>
            {
                sharedTables.map(table => (
                    <li key={table._id} className='border'>
                        {table.author._id !== userId && (
                            <img className="addToCollection" src={AddIcon} alt="Copy table to your collection"
                                onClick={async () => {
                                    if (window.confirm(`Copy ${table.name} table to your collection?`)) {
                                       await saveNewTableToDb(table);
                                        refetchTables();
                                    }
                                }} />
                        )}
                        <span className='name' title={table.author._id !== userId? `By ${table.author.userName}`: "By me"}>{table.name}</span> <span className='die' onClick={() => rollDie(table, singleRoll)}>{table.die}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default SharedTables;