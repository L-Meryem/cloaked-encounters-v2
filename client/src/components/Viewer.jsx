import React, { useState } from 'react';
import { rollChain, rollTable } from '../utilities/roll';

const Viewer = ({ currentChain }) => {
  const [rolls, setRolls] = useState([]);
  const [reRolls, setReRolls] = useState([]);

  const runChainRoller = async () => {
    if (currentChain) {
      const chainResults = await rollChain(currentChain.tables);
      setRolls(chainResults);
      setReRolls([]);
    } else {
      console.log('No chain was passed');
    }
  };

  const toggleRerolls = tableIndex => {
    if (reRolls.includes(tableIndex)) {
      // remove if marked
      setReRolls(reRolls.filter(reroll => reroll !== tableIndex));
    } else {
      // mark
      setReRolls([...reRolls, tableIndex]);
    }
  };

  const reRoll = async () => {
    if (currentChain) {
      const newRolls = [...rolls];

      for (const tableIndex of reRolls) {
        const tableId = currentChain.tables[tableIndex];
        const res = await fetch(`/api/tables/${tableId}`);
        const result = await res.json();

        if (result.success) {
          newRolls[tableIndex] = rollTable(result.data);
        }
      }
      setRolls(newRolls);
      setReRolls([]);

    } else {
      console.log('Missing chain');
    }
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {currentChain && (
        <>
          <h3>{currentChain.name}</h3>
          <button onClick={runChainRoller}>Run chain</button>
          {reRolls.length > 0 && (
            <button onClick={reRoll}>Reroll</button>
          )}
          <ul>
            {rolls.map((roll, i) => (
              <li key={i}>
                <input type="checkbox"
                  checked={reRolls.includes(i)}
                  onChange={() => toggleRerolls(i)}
                />
                {roll.tableName}: {roll.entry}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Viewer;