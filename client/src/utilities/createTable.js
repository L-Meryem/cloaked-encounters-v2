import { getTableRange } from "./roll";

const creatEmptyTable = dieType => {

    const {min, max} = getTableRange(dieType);

    let entries = [];

    for (let i = min; i <= max; i++) {
        entries.push({
            _id: `id_${i}${Date.now()}`,
            roll: i,
            entry: ' '
        });
    }

    return {
        name: 'New table',
        die: dieType,
        entries: entries
    }
};


export default creatEmptyTable;