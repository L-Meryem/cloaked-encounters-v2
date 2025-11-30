import React from 'react';
import { deleteChain } from '../../utilities/fetches';
import { useChain } from '../../context/ChainContext';

const Chain = ({ onLoadChain }) => {
  const { chains, refetchChains, loading } = useChain();

  const handleDragStart = (e, chain) => {
    e.dataTransfer.setData('application/json', JSON.stringify(chain));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      {
        loading ? (
          <li>Loading chains...</li>
        ) : (
          (chains || []).map(chain => (
            <li className='deleteItem'
              key={chain._id}
              draggable="true"
              onDragStart={e => handleDragStart(e, chain)}
            >
              <span className='name'>{chain.name}</span>
              <span className='delete'
                onClick={async () => {
                  if (window.confirm(`Delete ${chain.name}?`)) {
                    await deleteChain(chain._id);
                    refetchChains();
                  }
                }}
              >x</span>
            </li>
          ))
        )
      }
    </ul>
  )
};

export default Chain;