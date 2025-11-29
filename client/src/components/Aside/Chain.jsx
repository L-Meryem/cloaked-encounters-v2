import React from 'react';
import { deleteChain } from '../../utilities/fetches';
import { useChain } from '../../context/ChainContext';

const Chain = ({ onLoadChain }) => {
  const {chains, refetchChains} = useChain();

  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      {
        chains.map(chain => (
          <li key={chain._id} className='deleteItem'>
            <span className='name' onClick={() => onLoadChain(chain._id)}>{chain.name}</span>
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
      }
    </ul>
  )
};

export default Chain;