import React, { useState } from 'react';
import Table from '../Table/Table';
import Chain from './Chain';
import SharedTables from '../Table/SharedTables';

const Aside = ({ loadChain, onCreateTable, singleRoll }) => {
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
                    <Table onCreateTable={onCreateTable} isShared={isShared} setIsShared={setIsShared} singleRoll={singleRoll} />
                </div>
                <div className="content border" id="content2">
                    <Chain onLoadChain={loadChain} />
                </div>
                <div className="content border" id="content3">
                    <p>Save your favorite chain results</p>
                </div>
                <div className="content border" id="content4">
                    <SharedTables isShared={isShared} setIsShared={setIsShared} singleRoll={singleRoll}/>
                </div>
            </div>

        </aside >
    )
}

export default Aside;