import React from 'react';
import { useState, useEffect } from 'react';
import trash from '../../assets/trash.png'
import { deleteChain } from '../../utilities/fetches';

const Chain = ({ onLoadChain }) => {
  const [chains, setChains] = useState([]);

  useEffect(() => {
    const fetchChains = async () => {
      const res = await fetch('/api/chains');
      const result = await res.json();
      setChains(result.data);
    }
    fetchChains();
  }, []);

  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      {
        chains.map(chain => (
          <li key={chain._id} className='deleteItem'>
            <span className='name' onClick={() => onLoadChain(chain._id)}>{chain.name}</span>
            <span className='delete'
              onClick={() => {
                if (window.confirm(`Delete ${chain.name}?`)) {
                  deleteChain(chain._id);
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