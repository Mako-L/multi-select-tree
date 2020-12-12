/**
 * @author: Smit Patel
 */

// Libraries
import _noop from 'lodash/noop';
import _memoize from 'lodash/memoize';
import _isEmpty from 'lodash/isEmpty';
import _partialRight from 'lodash/partialRight';
import React, { ReactElement } from 'react';

// Interfaces
import { DataInterface } from '../../interfaces';

// Hooks
import useOptionsList from './useOptionsList';

// Icons
import chevronRight from '../../assets/right-chevron.svg';

// CSS
import styles from './OptionsList.mod.css';

type OptionProps = {
  label: string;
  isOpen: boolean;
  hasChild: boolean;
  isSelected: boolean;
  toggleIsOpen: any;
  onOptionChange: any;
};

type OptionsListProps = { data: DataInterface; key: string; updateData: (data: DataInterface) => void };

const getCleatIconStyles = _memoize((isOpen: boolean) => ({
  transform: `rotate(${isOpen ? 90 : 0}deg)`,
}));

const Option: React.FC<OptionProps> = ({
  label,
  isOpen,
  hasChild,
  isSelected,
  toggleIsOpen,
  onOptionChange,
}): ReactElement => (
  <li className={styles.listItem}>
    <div className={styles.buttonContainer}>
      <button
        onClick={hasChild ? toggleIsOpen : _noop}
        style={{ opacity: hasChild ? 1 : 0 }}
        className={styles.toggleChildButton}
        tabIndex={hasChild ? 0 : -1}
        aria-label={'Open Child SubTree'}
      >
        <img alt="Open Child" src={chevronRight} style={getCleatIconStyles(isOpen)} className={styles.toggleIcon} />
      </button>
      <span>{label}</span>
    </div>
    <input type="checkbox" checked={isSelected} onChange={onOptionChange} className={styles.selectCheckbox} />
  </li>
);

const OptionsList: React.FC<OptionsListProps> = ({ key, data, updateData }) => {
  const { isOpen, toggleIsOpen, onOptionChange, updateParentData } = useOptionsList(data, updateData);

  const hasChild = !_isEmpty(data.children);

  return (
    <>
      <Option
        hasChild={hasChild}
        label={data.label}
        isOpen={isOpen}
        isSelected={data.isSelected}
        onOptionChange={onOptionChange}
        toggleIsOpen={toggleIsOpen}
      />
      <div className={styles.childContainer}>
        {hasChild && isOpen
          ? data.children.map((child, index) => (
              <OptionsList data={child} key={`${key}_${index}`} updateData={_partialRight(updateParentData, index)} />
            ))
          : null}
      </div>
    </>
  );
};

export default OptionsList;
