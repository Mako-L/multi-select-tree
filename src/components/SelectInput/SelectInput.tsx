/**
 * @author: Smit Patel
 */

// Libraries
import _isEmpty from 'lodash/isEmpty';
import React from 'react';

// Interfaces
import { SelectedOptionInterface } from '../../interfaces';

// Icons
import remove from '../../assets/cancel.svg';

// CSS
import styles from './SelectInput.mod.css';

type SelectInputProps = {
  disabled?: boolean;
  placeholder?: string;
  selectedOptions: SelectedOptionInterface[];
  setShowOptions: (value: boolean) => void;
  setSelectedOptions: (selectedOptions: SelectedOptionInterface[]) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
  disabled,
  placeholder,
  setShowOptions,
  selectedOptions,
  setSelectedOptions,
}) => {
  const onOpen = React.useCallback(() => setShowOptions(true), [setShowOptions]);

  const removeOption = React.useCallback(() => {
    setSelectedOptions([]);
  }, []);

  return (
    <div className={styles.selectInputContainer}>
      <input onFocus={onOpen} className={styles.selectInput} readOnly placeholder={placeholder} disabled={disabled} />
      {_isEmpty(selectedOptions) || disabled ? null : (
        <button onClick={removeOption} className={styles.clearAllButton} aria-label={`Clear all options`}>
          <img src={remove} className={styles.clearAllIcon} alt="Remove All" />
        </button>
      )}
    </div>
  );
};

SelectInput.defaultProps = {
  placeholder: 'Select...',
};

export default SelectInput;
