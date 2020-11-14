/**
 * @author: Smit Patel
 */

// Libraries
import React from 'react';

// base-ui
import { Select, SelectOverrides } from 'baseui/select';

// Interfaces
import { SelectedOptionInterface } from '../interfaces';

type SelectInputProps = {
  selectedOptions: SelectedOptionInterface[];
  setShowOptions: (value: boolean) => void;
  setSelectedOptions: (selectedOptions: SelectedOptionInterface[]) => void;
};

const OVERRIDES: SelectOverrides = {
  DropdownContainer: {
    style: {
      visibility: 'hidden',
      height: 0,
    },
  },
  ControlContainer: {
    style: {
      background: 'transparent',
      border: '1px solid #aaa',
      borderRadius: '5px',
    },
  },
};

const SelectInput: React.FC<SelectInputProps> = ({ selectedOptions, setShowOptions, setSelectedOptions }) => {
  const onChange = React.useCallback(
    ({ value }) => {
      setSelectedOptions(value);
    },
    [setSelectedOptions],
  );

  const onOpen = React.useCallback(() => setShowOptions(true), [setShowOptions]);

  return (
    <Select
      multi
      value={selectedOptions}
      onChange={onChange}
      onOpen={onOpen}
      searchable={false}
      valueKey="value"
      overrides={OVERRIDES}
      closeOnSelect={false}
    />
  );
};
export default SelectInput;
