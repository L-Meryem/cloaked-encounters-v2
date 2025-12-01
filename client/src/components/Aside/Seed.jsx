import React, { useEffect, useState } from 'react';

const Seed = () => {
    const [seeds, setSeeds] = useState([]);

    useEffect(() => {
          const fetchSeeds = async () => {
              const res = await fetch('/api/seeds');
              const result = await res.json();
              setSeeds(result.data);
          };
  
          fetchSeeds();
      }, []);

  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      {((seeds || []).map(seed => (
        <li className='deleteItem'>
          <span className='name'>{seed.name}</span>
          <span className='delete'
            onClick={async () => {
              if (window.confirm(`Delete Seed`)) {
                await deleteChain(chain._id);
              }
            }}
          >x</span>
        </li>
      )))}
    </ul>
  );
}

export default Seed;