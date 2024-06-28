import React, { useContext } from 'react';
import { TableDataContext } from '../context/TableDataContext';
import '../styles/Table.css';

const GrandTotal = () => {
  const { rows } = useContext(TableDataContext);

  const calculateGrandTotal = (rows) => {
    return rows.reduce((total, row) => {
      const childrenTotal = row.children ? calculateGrandTotal(row.children) : 0;
      return total + row.value + childrenTotal;
    }, 0);
  };

  const grandTotal = calculateGrandTotal(rows);

  return (
    <table className="table">
      <tbody>
        <tr className="grand-total">
          <td colSpan="6">Grand Total: {grandTotal}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GrandTotal;
