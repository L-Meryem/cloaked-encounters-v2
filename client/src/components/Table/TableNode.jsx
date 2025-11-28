import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { saveNewTableToDb, saveRowChangesToDb, saveTableNameToDB } from '../../utilities/fetches';
import { rollDie, rollTable } from '../../utilities/roll';


const TableNode = ({ data, singleRoll, onToggleState, id }) => { //data from tableToNode fn
    // const [isExpanded, setIsExpanded] = useState(false);
    // const [isEditMode, setIsEditMode] = useState(false);
    const isExpanded = data.isExpanded || false;
    const isEditMode = data.isEditMode || false;
    //Store edited rows
    const [editedRows, setEditedRows] = useState({});
    const [entries, setEntries] = useState(data.entries); //To trigger a re-render when I change rows
    const [tableName, setTableName] = useState(data.name);

    const expandTable = () => {
        // isExpanded ? setIsExpanded(false) : setIsExpanded(true);
         onToggleState(id, 'isExpanded'); 
    };

    const toggleEdit = () => {
        // isEditMode ? setIsEditMode(false) : setIsEditMode(true);
        onToggleState(id, 'isEditMode');
    };

    //Update rolls and entries///
    const updateRow = (rowId, field, value) => {
        const tempEditedRows = { ...editedRows }; //react doesnt see changes inside objects
        tempEditedRows[rowId] = {
            ...tempEditedRows[rowId], //avoid override
            [field]: value
        };
        setEditedRows(tempEditedRows);
    }

    const saveRowChanges = async () => {
        if (!data._id) {

            const finalEntries = entries.map(entry => {
                const editedEntry = editedRows[entry._id];
                return {
                    roll: editedEntry?.roll || entry.roll,
                    entry: editedEntry?.entry || entry.entry
                }
            });
            await saveNewTableToDb({
                name: tableName,
                die: data.die,
                entries: finalEntries
            });
            setEntries(finalEntries);
            console.log(`${tableName} saved!`);
        } else {

            if(tableName !== data.name)
                await saveTableNameToDB(data._id, tableName);

            const newEntries = [...entries];
            for (const rowId in editedRows) {
                const row = editedRows[rowId];
                await saveRowChangesToDb(data, {
                    _id: rowId,
                    roll: row.roll,
                    entry: row.entry
                });
                newEntries.forEach(entry => { //Trigger re-render
                    if (entry._id === rowId) {
                        if (row.roll)
                            entry.roll = row.roll;
                        if (row.entry)
                            entry.entry = row.entry;
                    }
                });
            }
            setEntries(newEntries);
        }
        setEditedRows({});
        // setIsEditMode(false);
        onToggleState(id, 'isEditMode');
    };

    const handleStyle = {
        width: 60,
        height: 15,
        background: 'skyblue',
        border: '2px solid black',
        borderRadius: 0,
    };

    // const rollDie = table =>{
    //     const roll = rollTable(table);
    //     console.log(roll.tableName, roll.roll, roll.entry);
    //     if(singleRoll)
    //         singleRoll(roll);
    // };

    return (
        <div className="table-node">
            <Handle type="target" position={Position.Top} id="top-target" style={handleStyle} />
            <Handle type="source" position={Position.Top} id="top-source" style={handleStyle} />

            <table className='border'>
                <thead onDoubleClick={expandTable}>
                    <tr>
                        <th className="roll" onClick={() => rollDie(data, singleRoll)}>{data.die}</th>
                        <th>{isEditMode ? (
                            <input type="text" value={tableName}
                                onChange={e => setTableName(e.target.value)} />
                        ) : (data.name)}
                            <div>{
                                isEditMode ? <FaSave onClick={saveRowChanges} /> : <FaEdit onClick={toggleEdit} />
                            }
                            </div>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isExpanded && (
                        entries.map(entry => (
                            <tr key={entry._id}>
                                <td>
                                    {entry.roll}
                                </td>
                                <td>
                                    {isEditMode ? (
                                        <input type="text"
                                            value={editedRows[entry._id]?.entry ?? entry.entry}//optional chaining
                                            onChange={e => updateRow(entry._id, 'entry', e.target.value)} />
                                    ) : (entry.entry)
                                    }
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default TableNode;