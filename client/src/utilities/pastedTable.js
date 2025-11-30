const  pastedTableText = text => {
    const lines = text.split('\n')
        .map(line => line.trim())
        .filter(l => l.length);

    const table =  lines.map((line, index) => {
        const entryText = line.replace(/^\d+\s*[\.\)\-]?\s*/, '');

        return {
            entry: entryText
        };
    });

    return table;
}

export default pastedTableText;