/**
 * @author: Smit Patel
 */

// Libraries
import { useContext, useState, useCallback } from 'react';

// Interface
import { DataInterface, SelectedOptionInterface } from '../../interfaces';

// Context
import { DataContext } from '../../context/DataContext';

// Utils
import { getUpdatedData } from '../../utils';

const useOptionsList = (data: DataInterface, updateData: (data: DataInterface) => void) => {
  const [isOpen, setIsOpen] = useState(data.isOpen);

  const { onSelectDeSelect } = useContext(DataContext);

  const toggleIsOpen = useCallback(() => {
    setIsOpen((_isOpen) => !_isOpen);
  }, []);

  const updateParentData = useCallback(
    (updatedData, index) => {
      const updatedChildren = data.children.map((childData, id) => (id === index ? updatedData : childData));
      updateData({
        ...data,
        isSelected: updatedChildren.every((childData) => childData.isSelected),
        children: updatedChildren,
      });
    },
    [updateData, data],
  );

  const onOptionChange = useCallback(
    (e) => {
      const selctedOrRemovedOptions: SelectedOptionInterface[] = [];
      const updatedData = getUpdatedData(data, e?.target?.checked, selctedOrRemovedOptions);

      updateData(updatedData);
      onSelectDeSelect(selctedOrRemovedOptions, e?.target?.checked);
    },
    [data, updateData, onSelectDeSelect],
  );

  return { isOpen, toggleIsOpen, onOptionChange, updateParentData };
};

export default useOptionsList;
