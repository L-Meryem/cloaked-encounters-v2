const saveRowChangesToDb = async (table, row) => {
    try {
        const saveToBb = await fetch(`/api/tables/${table._id}/rows/${row._id}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roll: row.roll,
                entry: row.entry
            })
        });
        return saveToBb;
    } catch (error) {
        console.log(error);
    }
};

const deleteRowFromDb = async (tableId, rowId) => {
    try {
        const deleteRow = await fetch(`/api/tables/${tableId}/rows/${rowId}`, {
            method: "DELETE",
            credentials: 'include', //send session cookie
        });
        return deleteRow.ok;
    } catch (error) {
        console.log(error);
    }
};



export { saveRowChangesToDb, deleteRowFromDb };