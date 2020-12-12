/**
 * @author: Smit Patel
 */

// Libraries
import _partialRight from 'lodash/partialRight';
import React, { useContext, useCallback } from 'react';

// Components
import OptionsList from '../components/OptionsList/OptionsList';

// Context
import { DataContext } from '../context/DataContext';

// CSS
import styles from './OptionsListContainer.mod.css';

const OptionsListContainer = () => {
  const { data, setData } = useContext(DataContext);

  const updateData = useCallback(
    (updatedData, index) => {
      setData(data.map((childData, id) => (id === index ? updatedData : childData)));
    },
    [data, setData],
  );

  return (
    <ul className={styles.optionsContainer}>
      {data.map((option, index) => (
        <OptionsList key={`${index}`} data={option} updateData={_partialRight(updateData, index)} />
      ))}
    </ul>
  );
};

export default OptionsListContainer;
