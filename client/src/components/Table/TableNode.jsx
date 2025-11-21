import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { deleteRowFromDb, saveRowChangesToDb } from '../../utilities/api';

const TableNode = ({ data }) => { //data from tableToNode fn
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    //Store edited rows
    const [editedRows, setEditedRows] = useState({});
    const [entries, setEntries] = useState(data.entries); //To trigger a re-render when I change rows

    const expandTable = () => {
        isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    };

    const toggleEdit = () => {
        isEditMode ? setIsEditMode(false) : setIsEditMode(true);
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
        setEditedRows({});
        setIsEditMode(false);
    }

    //Delete row /////////////

    const deleteRow = async rowId => {
        const isDeleted = await deleteRowFromDb(data._id, rowId);
        if (isDeleted)
            setEntries(entries.filter(entry => entry._id !== rowId));

        const newEditedRows = { ...editedRows };
        delete newEditedRows[rowId];
        setEditedRows(newEditedRows);

        
    }

    const handleStyle = {
        width: 30,
        height: 20,
        background: 'blue',
        border: '2px solid blue',
    };

    return (
        <div className="table-node">
            <Handle type="target" position={Position.Top} id="top-target" style={handleStyle} />
            <Handle type="source" position={Position.Top} id="top-source" style={handleStyle} />

            <table className='table border bg-blue-400'>
                <thead onDoubleClick={expandTable}>
                    <tr>
                        <th>{data.die}</th>
                        <th>{data.name}
                            {isEditMode ? <FaSave onClick={saveRowChanges} /> :
                                <FaEdit onClick={toggleEdit} />
                            }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isExpanded && (
                        entries.map(entry => (
                            <tr key={entry._id}>
                                <td>
                                    {isEditMode ? (
                                        <input type="text"
                                            value={editedRows[entry._id]?.roll ?? entry.roll} //optional chaining
                                            onChange={e => updateRow(entry._id, 'roll', e.target.value)} />
                                    ) : (entry.roll)
                                    }
                                </td>
                                <td>
                                    {isEditMode ? (
                                        <input type="text"
                                            value={editedRows[entry._id]?.entry ?? entry.entry}
                                            onChange={e => updateRow(entry._id, 'entry', e.target.value)} />
                                    ) : (entry.entry)
                                    }
                                </td>
                                {isEditMode && (
                                    <td>
                                        <FaTrash onClick={() => deleteRow(entry._id)} />
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default TableNode;