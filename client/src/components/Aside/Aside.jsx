import React, { useState } from 'react';
import { BiCollection, BiLinkAlt, BiBulb, BiShareAlt, BiPlus } from "react-icons/bi";
import Table from '../Table/Table';
import Chain from './Chain/Chain';

const Aside = ({ loadChain, onCreateTable }) => {
    const [isNewTable, setIsNewTable] = useState(false);

    const createTableOn = () => {
        console.log("Plus clicked!");
        setIsNewTable(true);
    };

    return (
        < aside className="">
            <div className="row flex-spaces tabs">
                <input id="tab1" type="radio" name="tabs" defaultChecked />
                <label htmlFor="tab1" className='border'>Tables</label>

                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2" className='border'>Chains</label>

                <input id="tab3" type="radio" name="tabs" />
                <label htmlFor="tab3" className='border'>Seed</label>

                <input id="tab4" type="radio" name="tabs" />
                <label htmlFor="tab4" className='border'>Share</label>

                <div className="content border" id="content1">
                    <button onClick={createTableOn} >
                        <BiPlus />
                    </button>
                    <Table newTable={isNewTable} onCreateTable={onCreateTable} />
                </div>
                <div className="content border" id="content2">
                    <Chain onLoadChain={loadChain} />
                </div>
                <div className="content border" id="content3">
                    <h4>Seeds</h4>
                </div>
                <div className="content border" id="content4">
                   <h4>Shared tables</h4>
                </div>
            </div>

        </aside >
    )
}

export default Aside;