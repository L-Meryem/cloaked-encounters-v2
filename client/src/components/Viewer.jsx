import React, { useState } from 'react';
import { rollChain, rollTable } from '../utilities/roll';

const Viewer = ({ currentChain, chainName, setChainName, onSaveChain, onSaveNewChain, onClearBoard, onClearViewer, currentChainId, viewerMessage }) => {
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
    <div id="viewer" className='border'>
      <div className='btn-grp'>
        {currentChain && (
          <>
            <button onClick={runChainRoller}>Run chain</button>
            {reRolls.length > 0 && (
              <button onClick={reRoll}>Reroll</button>
            )}
          </>
        )}
        <button onClick={onSaveChain}>
          {currentChainId ? 'Update Chain' : 'Save Chain'}
        </button>
        {currentChainId && (
          <button onClick={onSaveNewChain}>Save As New</button>
        )}
        <button onClick={onClearBoard}>Clear Board</button>
      </div>

      <div className='chain-list'>
        <input
          type="text"
          value={chainName}
          placeholder="Chain name..."
          onChange={e => setChainName(e.target.value)}
        />
        <div>
          {viewerMessage && (
            <div className="alert">{viewerMessage}</div>
          )}
        </div>
        {currentChain && (
          <ul>
            {rolls.map((roll, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={reRolls.includes(i)}
                  onChange={() => toggleRerolls(i)}
                />
                <span className='tableName'>{roll.tableName}</span>
                <span className='tableRoll'>{roll.entry}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Viewer;