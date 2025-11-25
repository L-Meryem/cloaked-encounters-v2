import React from 'react';
import { useEffect, useState } from 'react';
import ShareBtnOff from '../../assets/share-off.png'
import ShareBtnOn from '../../assets/share-on.png'
import { toggleShareTable } from '../../utilities/api';

const Table = ({ sendTables, render = true, onCreateTable }) => {
    const [tables, setTables] = useState([]);

    const [dieType, setDieType] = useState(20); // d20
    const [dieCount, setDieCount] = useState(1);// 1d20

    const [isShared, setIsShared] = useState({});// 1d20

    useEffect(() => {
        const fetchTables = async () => {
            const res = await fetch('/api/tables');
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

    const createTable = () => {
        const die = `${dieCount}d${dieType}`;
        onCreateTable(die); //Home page fn
    }

    const toggleShare = async (table_id, isShared) => {
        setIsShared(prev => ({ ...prev, [table_id]: !isShared }));
        await toggleShareTable(table_id, isShared);
    }


    if (render)
        return (
            <>
                <div className='createTable'>
                    <input type="text" name="dieCount" id="dieCount"
                        placeholder='#' value={dieCount}
                        onChange={e => setDieCount(e.target.value)} />
                    <select name="dieType" id="dieType" value={dieType}
                        onChange={e => setDieType(e.target.value)}>
                        <option value="4">d4</option>
                        <option value="6">d6</option>
                        <option value="8">d8</option>
                        <option value="10">d10</option>
                        <option value="12">d12</option>
                        <option value="20">d20</option>
                        <option value="100">d100</option>
                    </select>
                    <button onClick={createTable}>Create</button>
                    {/* <button onClick={cancel}>Cancel</button> */}
                </div>

                <ul className='tablesList child-borders child-shadows-hover'>
                    {
                        tables.map(table => (
                            <li key={table._id} draggable="true" className='border'
                                onDragStart={e => handleDragStart(e, table)}
                            >
                                <img className='share' 
                                src={(isShared[table._id] ?? table.shared) ? ShareBtnOn : ShareBtnOff} 
                                onClick={() => toggleShare(table._id, table.shared)} alt="share table button" />
                                <span className='name'>{table.name}</span>
                                <span className='die'>{table.die}</span>
                            </li>//on dragStart store data in dataTransfer
                        ))
                    }
                </ul>
            </>

        )
}


export default Table;