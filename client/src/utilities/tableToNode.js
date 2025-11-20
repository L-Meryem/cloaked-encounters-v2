const tableToNode = (tables, x = 0, y = 200) => {
    //Create a node for react flow
    const nodes = tables.map((table, index) => ({
        id: table._id,
        type: 'tableNode', //Key for Flow to pick the component
        data: table,
        position: { x: x, y: index * y }
    }));

    return nodes;
}

export default tableToNode;