const getTableRange = (dieType) => {

    const dieParts = dieType.split('d');
    let [count, type] = dieParts.map(Number);

    if (!count || count === 0) {
        count = 1;
    }
    let min, max;

    if (count === 1) {
        min = 1;
        max = type;
    }
    else {
        min = count;
        max = count * type;
    }

    return { min, max };
}

const rollDie = (table, singleRoll) => {
    const roll = rollTable(table);
    console.log(singleRoll);
    console.log(roll.tableName, roll.roll, roll.entry);
    if (singleRoll)
        singleRoll(roll);
};

const rollTable = table => {

    const { min, max } = getTableRange(table.die);
    let roll, row;

    //find row
    do {
        roll = Math.floor(Math.random() * (max - min + 1) + min);

        //total values + 1 + min to hit the start
        // Example
        // 3d4 -> [3 , 12] 
        // Math.random() * 10 = 0,1,..,9   add 3 to start from 3
        row = table.entries.find(entry => entry.roll === roll);

    } while (!row || !row.entry || row.entry .trim() ==='' || row.entry.trim().toLowerCase() === 'reroll');

    return {
        tableName: table.name,
        roll: roll,
        entry: row.entry
    }
};


const rollChain = async (tableIds) => {

    const fetchPromises = tableIds.map(tableId =>
        fetch(`/api/tables/${tableId}`).then(res => res.json())
    );

    const tableResults = await Promise.all(fetchPromises);

    // Roll on each table in order
    const results = [];
    for (const result of tableResults) {
        if (result.success) {
            const rollResult = rollTable(result.data);
            results.push(rollResult);
        }
    }

    return results;
};




export { getTableRange, rollTable, rollChain, rollDie };