import React, { useEffect, useState } from 'react';
import { rollChain, rollTable } from '../utilities/roll';
import { saveSeed } from '../utilities/fetches';
import { useSeed } from '../context/SeedContext';

const Viewer = ({ currentChain, chainName, setChainName, onSaveChain, onSaveNewChain, onClearBoard, currentChainId, viewerMessage, setViewerMessage, singleRolls, selectedSeed }) => {
  const [rolls, setRolls] = useState([]);
  const [reRolls, setReRolls] = useState([]);
  const { refetchSeeds } = useSeed();

  useEffect(() => {
    setRolls([]);
    setReRolls([]);
  }, [currentChainId]);

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

  const handleSaveSeed = async () => {
    const seedName = prompt('Seed name:');
    if (!seedName)
      return;
    if (rolls.length === 0) {
      setViewerMessage('Nothing to save');
      return;
    }
    const res = await saveSeed(seedName, rolls, currentChain._id);
    const result = await res.json();
    if (result.success) {
      setViewerMessage('Seed saved!');
      refetchSeeds();
    } else
      setViewerMessage('Failed to save seed');
  };
  console.log(selectedSeed);

  return (
    <div id="viewer" className='border'>
      <div className='btn-grp'>
        <label htmlFor="chainName">Your Chain</label>
        <input
          id="chainName"
          type="text"
          value={chainName}
          placeholder="Chain name:..."
          onChange={e => setChainName(e.target.value)}
        />
        {currentChain && (
          <>
            <button onClick={runChainRoller}>Run chain</button>
            {reRolls.length > 0 && (
              <button onClick={reRoll}>Reroll</button>
            )}
          </>
        )}
        {currentChain && (
          <button onClick={handleSaveSeed}>Save seed</button>
        )}
        <button onClick={onSaveChain}>
          {currentChainId ? 'Update chain' : 'Save chain'}
        </button>
        {currentChainId && (
          <button onClick={onSaveNewChain}>Clone chain</button>
        )}
        <button onClick={onClearBoard}>Clear</button>
      </div>

      <div className='chain-list'>
        <div>
          {viewerMessage && (
            <div className="alert">{viewerMessage}</div>
          )}
        </div>

        {singleRolls && singleRolls.length > 0 && (
          <ul>
            {[...singleRolls].reverse().map((roll, i) => (
              <li key={i} className='single-roll'>
                <div>
                  <span className='tableName border'>{roll.tableName}</span>
                  <span className='tableRoll border'>{roll.roll}</span>
                </div>
                <span className='tableEntry'>{roll.entry}</span>
              </li>
            ))}
          </ul>
        )}

        {selectedSeed && (
          <ul>
            {[...selectedSeed].reverse().map(seed => (
              <li className="border selectedSeed">
                <span className='seedName'>SEED: {seed.name}</span>
                <div className='seedResults'>
                  {seed.content.map(content => (
                    <div className='table'>
                      <span className='tableName border'>{content.tableName}</span>
                      <span className='tableEntry'>{content.entry}</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        {currentChain && (
          <>
            <ul>
              {rolls.map((roll, i) => (
                <li key={i} className='chain-li'>
                  <input
                    type="checkbox"
                    checked={reRolls.includes(i)}
                    onChange={() => toggleRerolls(i)}
                  />
                  <span className='tableName border'>{roll.tableName}</span>
                  <span className='tableRoll border'>{roll.roll}</span>
                  <span className='tableEntry'>{roll.entry}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Viewer;