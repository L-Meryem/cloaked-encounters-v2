import React from 'react';

const Seed = () => {
  return (
    <ul className='tablesList child-borders chain child-shadows-hover'>
      <li className='deleteItem'>
        <span className='name'>Seed</span>
        <span className='delete'
          onClick={async () => {
            if (window.confirm(`Delete Seed`)) {
              // await deleteChain(chain._id);
              // refetchSeed();
            }
          }}
        >x</span>
      </li>

    </ul>
  );
}

export default Seed;