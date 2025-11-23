const tableToNode = (table, x = 0, y = 200) => {
    //Create a node for react flow
    const arrayOfTables = Array.isArray(table)? table : [table];
    
    const nodes = arrayOfTables.map( table => ({
        id: table._id || `id_${Date.now()}`,
        type: 'tableNode', //Key for Flow to pick the component
        data: table,
        position: { x: x, y: y }
    }));

    return nodes;
}

export default tableToNode;