import React, { createContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

export const TableDataContext = createContext();

const TableDataProvider = ({ children }) => {
  const [rows, setRows] = useState(initialData);

  const updateRowValue = (id, newValue) => {
    const updateValues = (data) => {
      return data.map(row => {
        if (row.id === id) {
          const originalValue = row.originalValue;
          const newVariance = ((newValue - originalValue) / originalValue) * 100;
          row.value = newValue;
          row.variance = newVariance;
        } else if (row.children) {
          row.children = updateValues(row.children);
          row.value = row.children.reduce((sum, child) => sum + child.value, 0);
          const originalValue = row.originalValue;
          const newVariance = ((row.value - originalValue) / originalValue) * 100;
          row.variance = newVariance;
        }
        return row;
      });
    };
    setRows(updateValues(rows));
  };

  useEffect(() => {
    setRows(prevRows => {
      const calculateParentValues = (data) => {
        return data.map(row => {
          if (row.children) {
            row.value = row.children.reduce((sum, child) => sum + child.value, 0);
            row.children = calculateParentValues(row.children);
          }
          return row;
        });
      };
      return calculateParentValues(prevRows);
    });
  }, []);
  
  return (
    <TableDataContext.Provider value={{ rows, updateRowValue }}>
      {children}
    </TableDataContext.Provider>
  );
};

export default TableDataProvider;
