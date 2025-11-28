import React from 'react';
import { useState, useEffect } from 'react';
import trash from '../../assets/trash.png'
import { deleteChain } from '../../utilities/api';

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
          <li key={chain._id}>
            <span className='name' onClick={() => onLoadChain(chain._id)}>{chain.name}</span>
            <img className='trash' src={trash} alt="delete chain" onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${chain.name} chain?`)) {
                deleteChain(chain._id);
              }
            }} />
          </li>
        ))
      }
    </ul>
  )
};

export default Chain;