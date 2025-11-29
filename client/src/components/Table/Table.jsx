import React from 'react';
import { useState } from 'react';
import ShareBtnOff from '../../assets/share-off.png'
import ShareBtnOn from '../../assets/share-on.png'
import { deleteTable, toggleShareTable } from '../../utilities/fetches';
import { rollDie } from '../../utilities/roll';
import { useTable } from '../../context/TableContext';

const Table = ({ sendTables, render = true, onCreateTable, isShared, setIsShared, singleRoll }) => {
    const [dieType, setDieType] = useState(20); // d20
    const [dieCount, setDieCount] = useState(1);// 1d20

    const { tables, refetchTables, loading } = useTable();

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
                </div>

                <ul className='tablesList child-borders child-shadows-hover'>
                    {
                        loading ? (
                            <li>Loading chains...</li>
                        ) : (
                            (tables || []).map(table => (
                                <li key={table._id} draggable="true" className='border deleteItem'
                                    onDragStart={e => handleDragStart(e, table)}
                                >
                                    <img className='share'
                                        src={(isShared[table._id] ?? table.shared) ? ShareBtnOn : ShareBtnOff}
                                        onClick={() => toggleShare(table._id, isShared[table._id] ?? table.shared)} alt="share table button" />
                                    <span className='name'>{table.name}</span>
                                    <span className='die' onClick={() => rollDie(table, singleRoll)}>{table.die}</span>
                                    <span className='delete'
                                        onClick={async () => {
                                            if (window.confirm(`Delete ${table.name}?`)) {
                                                await deleteTable(table._id);
                                                refetchTables();
                                            }
                                        }}
                                    >x</span>
                                </li>//on dragStart store data in dataTransfer
                            ))
                        )
                    }
                </ul>
            </>

        )
}


export default Table;