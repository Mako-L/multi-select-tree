/**
 * @author: Smit Patel
 */

// Libraries
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import _partialRight from 'lodash/partialRight';

// Interface
import { SelectedOptionInterface } from '../../interfaces';

// Icons
import remove from '../../assets/cancel.svg';

// CSS
import styles from './SelectedOptions.mod.css';

type Props = {
  disabled?: boolean;
  selectedOptions: SelectedOptionInterface[];
  setSelectedOptions: (options: SelectedOptionInterface[]) => void;
};

const SelectedOptions: React.FC<Props> = ({ selectedOptions, setSelectedOptions, disabled }) => {
  const removeOption = React.useCallback(
    (_, optionToRemove) => {
      setSelectedOptions(selectedOptions.filter((option) => option.value !== optionToRemove.value));
    },
    [selectedOptions],
  );

  if (_isEmpty(selectedOptions)) {
    return null;
  }

  return (
    <ul className={styles.selectedOptionsContainer}>
      {selectedOptions.map((selectedOption) => (
        <li key={selectedOption.value} className={styles.selectedOption}>
          <span className={styles.selectedOptionLabel}>{selectedOption.label}</span>
          {disabled ? null : (
            <button
              onClick={_partialRight(removeOption, selectedOption)}
              className={styles.clearOptionButton}
              aria-label={`Remove ${selectedOption.label}`}
            >
              <img src={remove} className={styles.clearIcon} alt="Remove" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SelectedOptions;
