import React from 'react';
import HierarchicalTable from './components/HierarchicalTable';
import TableDataProvider from './context/TableDataContext';
import './styles/App.css';

const App = () => {
  return (
    <TableDataProvider>
      <div className="App">
        <h1>Simple Hierarchical Table</h1>
        <HierarchicalTable />
      </div>
    </TableDataProvider>
  );
};

export default App;
