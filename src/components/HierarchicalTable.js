import React, { useContext } from 'react';
import TableRow from './TableRow';
import GrandTotal from './GrandTotal';
import { TableDataContext } from '../context/TableDataContext';
import '../styles/Table.css';

const HierarchicalTable = () => {
  const { rows } = useContext(TableDataContext);

  return (
    <div>
      <h2>Hierarchical Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <TableRow key={row.id} data={row} level={0} />
          ))}
        </tbody>
      </table>
      <GrandTotal />
    </div>
  );
};

export default HierarchicalTable;
