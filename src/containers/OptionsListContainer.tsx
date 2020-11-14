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

const OptionsListContainer = () => {
  const { data, setData } = useContext(DataContext);

  const updateData = useCallback(
    (updatedData, index) => {
      setData(data.map((childData, id) => (id === index ? updatedData : childData)));
    },
    [data, setData],
  );

  return (
    <div style={{ border: '1px solid #aaa', borderRadius: '5px', background: '#f6f6f6' }}>
      {data.map((option, index) => (
        <OptionsList key={`${index}`} data={option} updateData={_partialRight(updateData, index)} />
      ))}
    </div>
  );
};

export default OptionsListContainer;
