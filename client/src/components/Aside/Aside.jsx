import React, { useState } from 'react';
import Table from '../Table/Table';
import Chain from './Chain';
import SharedTables from '../Table/SharedTables';
import Seed from './Seed';

const Aside = ({ loadChain, onCreateTable, singleRoll, setSelectedSeed }) => {
    const [isShared, setIsShared] = useState({});

    return (
        < aside className="">
            <div className="row flex-spaces tabs">
                <input id="tab1" type="radio" name="tabs" defaultChecked />
                <label htmlFor="tab1" className='border'>Tables</label>

                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2" className='border'>Chains</label>

                <input id="tab3" type="radio" name="tabs" />
                <label htmlFor="tab3" className='border'>Seeds</label>

                <input id="tab4" type="radio" name="tabs" />
                <label htmlFor="tab4" className='border'>Shared</label>

                <div className="content border" id="content1">
                    <small className="instructions">Create a table or drag one to canvas</small>
                    <Table onCreateTable={onCreateTable} isShared={isShared} setIsShared={setIsShared} singleRoll={singleRoll} />
                </div>
                <div className="content border" id="content2">
                    <small className="instructions">To start, drag a chain to canvas</small>
                    <Chain onLoadChain={loadChain} />
                </div>
                <div className="content border" id="content3">
                    <Seed setSelectedSeed={setSelectedSeed}/>
                </div>
                <div className="content border" id="content4">
                    <small className="instructions">Heart a table to make your own copy</small>
                    <SharedTables isShared={isShared} setIsShared={setIsShared} singleRoll={singleRoll}/>
                </div>
            </div>

        </aside >
    )
}

export default Aside;