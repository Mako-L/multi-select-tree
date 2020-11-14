/**
 * @author: Smit Patel
 */

// Libraries
import _noop from 'lodash/noop';
import _filter from 'lodash/filter';
import _differenceBy from 'lodash/differenceBy';
import React, { useState, useCallback } from 'react';

// Interfaces
import { DataContextInterface, DataInterface, SelectedOptionInterface, SelectedValues } from '../interfaces';

// Utils
import { adaptInitialData } from '../utils';

const DataContext = React.createContext<DataContextInterface>({
  data: [],
  selectedOptions: [],
  initialize: _noop,
  setData: _noop,
  onSelectDeSelect: _noop,
  setSelectedOptions: _noop,
});

const DataProvider = (props: any) => {
  const [data, setData] = useState<DataInterface[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionInterface[]>([]);

  const initialize = useCallback((options, _selectedOptions) => {
    const selectedValues: SelectedValues = new Set();
    _selectedOptions.forEach((option: SelectedOptionInterface) => {
      if (!option.value || !option.label) {
        throw new Error('value and label should be present in options');
      }
      selectedValues.add(option.value);
    });

    setSelectedOptions(selectedOptions);

    setData(adaptInitialData(options, selectedValues));
  }, []);

  const onSelectDeSelect = useCallback(
    (selctedOrRemovedOptions = [], isSelection) => {
      let updatedSelectedOptions: SelectedOptionInterface[] = [];
      if (isSelection) {
        updatedSelectedOptions = [
          ...selectedOptions,
          ...selctedOrRemovedOptions.filter(
            (option: SelectedOptionInterface) => _filter(selectedOptions, ['value', option.value]).length === 0,
          ),
        ];
      } else {
        updatedSelectedOptions = _differenceBy(selectedOptions, selctedOrRemovedOptions, 'value');
      }
      setSelectedOptions(updatedSelectedOptions);
    },
    [setSelectedOptions, selectedOptions],
  );

  const contextValue: DataContextInterface = {
    data,
    setData,
    selectedOptions,
    initialize,
    onSelectDeSelect,
    setSelectedOptions,
  };

  return <DataContext.Provider value={contextValue}>{props.children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
