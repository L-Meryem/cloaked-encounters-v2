import React from 'react';
import { BiCollection, BiLinkAlt, BiBulb, BiShareAlt } from "react-icons/bi";
import Table from '../Table/Table';
import Chain from '../Aside/Chain/Chain';

const Aside = ({loadChain}) => {
    return (
        < div className="tabs tabs-lift flex h-full w-full" >
            <label className="tab flex-1 bg-pink-400">
                <input type="radio" name="my_tabs_4" defaultChecked  />
                <BiCollection />
            </label>
            <div className="tab-content bg-pink-100 border-base-300 p-6">
                <Table/>
            </div>

            <label className="tab flex-1 bg-yellow-300">
                <input type="radio" name="my_tabs_4" />
                <BiLinkAlt />
            </label>
            <div className="tab-content bg-yellow-100 border-base-300 p-6">
                <Chain onLoadChain={loadChain}/>
            </div>

            <label className="tab flex-1 bg-green-300">
                <input type="radio" name="my_tabs_4" />
                <BiBulb />
            </label>
            <div className="tab-content bg-green-100 border-base-300 p-6">
                <ul>
                    <li>seed 1</li>
                    <li>seed 2</li>
                </ul>
            </div>

            <label className="tab flex-1 bg-blue-300">
                <input type="radio" name="my_tabs_4" />
                <BiShareAlt />
            </label>
            <div className="tab-content bg-blue-100 border-base-300 p-6">
                <p>Shared tables....</p>
            </div>
        </div >
    )
}

export default Aside;