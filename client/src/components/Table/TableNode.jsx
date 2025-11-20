import { Handle, Position } from '@xyflow/react';

const TableNode = ({ data }) => { //data from tableToNode fn
    return (
        <div className="table-node">
            <Handle type="target" position={Position.Top} id="top-target" />
            <Handle type="source" position={Position.Top} id="top-source" />
            <h4 key={data._id}>{data.name}</h4>
        </div>
    );
}
export default TableNode;