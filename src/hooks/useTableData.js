import { useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const useTableData = () => {
  const [rows, setRows] = useState(initialData);

  const updateRowValue = (id, newValue) => {
    const updateValues = (data) => {
      return data.map(row => {
        if (row.id === id) {
          row.value = newValue;
        } else if (row.children) {
          row.children = updateValues(row.children);
        }
        return row;
      });
    };
    setRows(updateValues(rows));
  };

  useEffect(() => {
    const calculateParentValues = (data) => {
      return data.map(row => {
        if (row.children) {
          row.value = row.children.reduce((sum, child) => sum + child.value, 0);
          row.children = calculateParentValues(row.children);
        }
        return row;
      });
    };
    setRows(calculateParentValues(rows));
  }, [rows]);

  return { rows, updateRowValue };
};

export default useTableData;
