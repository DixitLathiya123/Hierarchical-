import React, { useState, useContext } from 'react';
import { TableDataContext } from '../context/TableDataContext';
import '../styles/Table.css';

const TableRow = ({ data, level }) => {
  const { updateRowValue } = useContext(TableDataContext);
  const [inputValue, setInputValue] = useState("");
  const [variance, setVariance] = useState(0);

  const handlePercentageUpdate = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const newValue = data.value * (1 + percentage / 100);
      const newVariance = ((newValue - data.originalValue) / data.originalValue) * 100;
      setVariance(newVariance);
      updateRowValue(data.id, newValue);
    }
  };

  const handleDirectUpdate = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const newVariance = ((value - data.originalValue) / data.originalValue) * 100;
      setVariance(newVariance);
      updateRowValue(data.id, value);
    }
  };

  return (
    <>
      <tr className={`table-row level-${level}`}>
        <td>{data.label}</td>
        <td>{data.value?.toFixed(2)}</td>
        <td>
          <input 
            type="text" 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
          />
        </td>
        <td>
          <button onClick={handlePercentageUpdate}>Allocation %</button>
        </td>
        <td>
          <button onClick={handleDirectUpdate}>Allocation Val</button>
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>
      {data.children && data.children.map(child => (
        <TableRow key={child.id} data={child} level={level + 1} />
      ))}
    </>
  );
};

export default TableRow;
