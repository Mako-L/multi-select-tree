/**
 * @author: Smit Patel
 */

// Libraries
import _isEmpty from 'lodash/isEmpty';

// Interfaces
import { DataInterface, SelectedOptionInterface, SelectedValues } from './interfaces';

export const adaptInitialData = (data: DataInterface[] = [], selectedValues: SelectedValues): DataInterface[] => {
  return data.map((dataOption) => {
    return {
      ...dataOption,
      isOpen: false,
      isSelected: selectedValues.has(dataOption.value),
      children: adaptInitialData(dataOption.children, selectedValues),
    };
  });
};

export const getUpdatedData = (
  data: DataInterface,
  isSelected: boolean,
  selctedOrRemovedOptions: SelectedOptionInterface[],
): DataInterface => {
  const updatedChildren: DataInterface[] = data.children.map((child) =>
    getUpdatedData(child, isSelected, selctedOrRemovedOptions),
  );
  if (_isEmpty(data.children)) {
    selctedOrRemovedOptions.push({ value: data.value, label: data.label });
  }
  return { ...data, isSelected, children: updatedChildren };
};
