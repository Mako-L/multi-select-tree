/**
 * @author: Smit Patel
 */

// Libraries
import React, { useState, useEffect, useContext, ReactElement, useRef, useCallback } from 'react';

// Context
import { DataContext } from '../../context/DataContext';

// Interfaces
import { MultiSelectTreeComponentProps } from '../../interfaces';

// Components
import OptionsListContainer from '../../containers/OptionsListContainer';
import SelectInput from '../SelectInput/SelectInput';
import SelectedOptions from '../SelectedOptions/SelectedOptions';

// Hooks
import useOnClickOutside from '../../hooks/useOnClickOutside';

import styles from './MultiSelectTreeComponent.mod.css';

const MultiSelectTreeComponent: React.FC<MultiSelectTreeComponentProps> = (props): ReactElement => {
  const { initialState, data, onChange, disabled } = props;
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);

  const { initialize, selectedOptions, setSelectedOptions } = useContext(DataContext);

  useEffect(() => {
    initialize(data, initialState);
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
  }, [onChange, selectedOptions]);

  const closeOptions = useCallback(() => {
    setShowOptions(false);
  }, []);

  useOnClickOutside(containerRef, closeOptions);

  return (
    <>
      <label className={styles.label}>{props.label}</label>
      <SelectedOptions selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} disabled={disabled} />
      <SelectInput
        disabled={disabled}
        placeholder={props.placeholder}
        selectedOptions={selectedOptions}
        setShowOptions={setShowOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div ref={containerRef} className={styles.optionsRefContainer}>
        {showOptions && !disabled ? <OptionsListContainer /> : null}
      </div>
    </>
  );
};

MultiSelectTreeComponent.defaultProps = {
  initialState: [],
};

export default MultiSelectTreeComponent;
