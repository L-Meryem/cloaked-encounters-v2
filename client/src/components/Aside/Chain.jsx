import React from 'react';
import { useState, useEffect } from 'react';

const Chain = ({onLoadChain}) => {
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
    <ul className='tablesList child-borders chain'>
      {
        chains.map(chain => (
          <li key={chain._id} onClick={() => onLoadChain(chain._id)}>{chain.name}</li>
        ))
      }
    </ul>
  )
};

export default Chain;