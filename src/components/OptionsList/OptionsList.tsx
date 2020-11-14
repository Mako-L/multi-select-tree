/**
 * @author: Smit Patel
 */

// Libraries
import _noop from 'lodash/noop';
import _isEmpty from 'lodash/isEmpty';
import _memoize from 'lodash/memoize';
import _partialRight from 'lodash/partialRight';
import React, { ReactElement, useCallback } from 'react';

// // base-ui
// @ts-ignore
import ChevronRight from 'baseui/icon/chevron-right';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button, KIND, SHAPE } from 'baseui/button';
import { Checkbox } from 'baseui/checkbox';
import { styled } from 'baseui';

// Interfaces
import { DataInterface } from '../../interfaces';

// Hooks
import useOptionsList from './useOptionsList';

type OptionProps = {
  label: string;
  isOpen: boolean;
  hasChild: boolean;
  isSelected: boolean;
  toggleIsOpen: any;
  onOptionChange: any;
};

type OptionsListProps = { data: DataInterface; key: string; updateData: (data: DataInterface) => void };

const getIconOverrides = _memoize((isOpen: boolean) => ({
  Svg: {
    style: {
      transform: `rotate(${isOpen ? 90 : 0}deg)`,
      transition: '0.4s',
    },
  },
}));

const getButtonOverrides = _memoize((hasChild: boolean) => ({
  Root: {
    style: {
      opacity: hasChild ? 1 : 0,
    },
  },
}));

const LIST_OVERRIDES = { Root: { style: { backgroundColor: 'transparent' } } };

const Option: React.FC<OptionProps> = ({
  label,
  isOpen,
  hasChild,
  isSelected,
  toggleIsOpen,
  onOptionChange,
}): ReactElement => {
  const checkBoxRenderer = useCallback(() => <Checkbox checked={isSelected} onChange={onOptionChange} />, [
    isSelected,
    onOptionChange,
  ]);

  return (
    <div className="flex items-center justify-between">
      <ListItem endEnhancer={checkBoxRenderer} sublist overrides={LIST_OVERRIDES}>
        <div className="flex items-center">
          <Button
            onClick={hasChild ? toggleIsOpen : _noop}
            kind={KIND.minimal}
            shape={SHAPE.circle}
            overrides={getButtonOverrides(hasChild)}
          >
            <ChevronRight size={36} overrides={getIconOverrides(isOpen)} />
          </Button>
          <ListItemLabel>{label}</ListItemLabel>
        </div>
      </ListItem>
    </div>
  );
};

const StyledDiv = styled('div', () => ({
  paddingLeft: '15px',
}));

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
      <StyledDiv>
        {hasChild && isOpen
          ? data.children.map((child, index) => (
              <OptionsList data={child} key={`${key}_${index}`} updateData={_partialRight(updateParentData, index)} />
            ))
          : null}
      </StyledDiv>
    </>
  );
};

export default OptionsList;
