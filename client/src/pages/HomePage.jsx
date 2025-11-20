import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Board from '../components/Board';
import Aside from '../components/Aside/Aside';
import Viewer from '../components/Viewer';
import {ReactFlowProvider} from '@xyflow/react';

const HomePage = () => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <Board />
            </div>
            <div className=" viewer border-t p-4 h-40">
              <Viewer />
            </div>
          </main>
          <aside className="w-64 border-l overflow-y-auto">
            <Aside />
          </aside>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default HomePage