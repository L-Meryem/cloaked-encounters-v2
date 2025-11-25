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

const saveNewTableToDb = async table => {
    try {
        const saveToBb = await fetch(`/api/tables`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: table.name,
                die: table.die,
                entries: table.entries.map(entry => ({
                    roll: entry.roll,
                    entry: entry.entry
                }))
            })
        });
        return saveToBb;
    } catch (error) {
        console.log(error);
    }
};

const toggleShareTable = async (tableId, shared) => {
    try {
        const res = await fetch(`/api/tables/${tableId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shared: shared ? false : true
            })
        });
        return res;
    } catch (error) {
        console.log(error); 
    }
};


export { saveRowChangesToDb, saveNewTableToDb, toggleShareTable };