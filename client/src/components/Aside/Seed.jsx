import React, { useEffect, useState } from 'react';
import { deleteSeed } from '../../utilities/fetches';
import { useSeed } from '../../context/SeedContext';

const Seed = ({setSelectedSeed}) => {
    const {seeds, refetchSeeds, loading} = useSeed();

  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      {((seeds || []).map(seed => (
        <li className='deleteItem' key={seed._id}>
          <span className='name'
          onClick={()=> setSelectedSeed(prev => [...prev, seed])}
          >{seed.name}</span>
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