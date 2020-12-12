/**
 * @author: Smit Patel
 */

// Libraries
import React from 'react';

// Components
import MultiSelectTreeComponent from './components/MultiSelectTreeComponent/MultiSelectTreeComponent';
import { DataProvider } from './context/DataContext';

// Interfaces
import { MultiSelectTreeComponentProps } from './interfaces';

import styles from './index.mod.css';

const MultiSelectTree: React.FC<MultiSelectTreeComponentProps> = (props) => (
  <DataProvider>
    <div className={styles.container}>
      <MultiSelectTreeComponent {...props} />
    </div>
  </DataProvider>
);

export default MultiSelectTree;
