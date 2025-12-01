import React, { useEffect, useState } from 'react';
import { deleteSeed } from '../../utilities/fetches';
import { useSeed } from '../../context/SeedContext';

const Seed = () => {
    // const [seeds, setSeeds] = useState([]);
    const {seeds, refetchSeeds, loading} = useSeed();

    // useEffect(() => {
    //       const fetchSeeds = async () => {
    //           const res = await fetch('/api/seeds');
    //           const result = await res.json();
    //           setSeeds(result.data);
    //       };
  
    //       fetchSeeds();
    //   }, []);

  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      {((seeds || []).map(seed => (
        <li className='deleteItem' key={seed._id}>
          <span className='name'>{seed.name}</span>
          <span className='delete'
            onClick={async () => {
              if (window.confirm(`Delete Seed`)) {
                await deleteSeed(seed._id);
                refetchSeeds(); 
              }
            }}
          >x</span>
        </li>
      )))}
    </ul>
  );
}

export default Seed;