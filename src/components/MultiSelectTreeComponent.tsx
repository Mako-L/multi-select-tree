/**
 * @author: Smit Patel
 */

// Libraries
import React, { useState, useEffect, useContext, ReactElement, useRef, useCallback } from 'react';

// Context
import { DataContext } from '../context/DataContext';

// Interfaces
import { MultiSelectTreeComponentProps } from '../interfaces';

// Components
import OptionsListContainer from '../containers/OptionsListContainer';
import SelectInput from './SelectInput';

// Hooks
import useOnClickOutside from '../hooks/useOnClickOutside';

const MultiSelectTreeComponent: React.FC<MultiSelectTreeComponentProps> = (props): ReactElement => {
  const { initialState, data, onChange } = props;
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);

  const { initialize, selectedOptions, setSelectedOptions } = useContext(DataContext);

  useEffect(() => {
    initialize(data, initialState);
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
  }, [onChange, selectedOptions]);

  const openOptions = useCallback(() => {
    setShowOptions(false);
  }, []);

  useOnClickOutside(containerRef, openOptions);

  return (
    <>
      <SelectInput
        setShowOptions={setShowOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div ref={containerRef}>{showOptions ? <OptionsListContainer /> : null}</div>
    </>
  );
};

MultiSelectTreeComponent.defaultProps = {
  initialState: [],
};

export default MultiSelectTreeComponent;
