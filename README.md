# Multi Select Tree

[![npm version](https://badge.fury.io/js/multi-select-tree.svg)](//badge.fury.io/js/multi-select-tree)

## Install

```bash
npm install multi-select-tree

# or

yarn add multi-select-tree
```

## Example

```jsx
import React from 'react';
import MultiSelectTree from 'multi-select-tree';

const data = [
  { value: 'bike', label: 'Bike', children: [{ value: 'ducati_diavel', label: 'Ducati Diavel' }] },
  {
    value: 'cars',
    label: 'Cars',
    children: [
      {
        value: 'lamborghini',
        label: 'Lamborghini',
        children: [
          { value: 'lamborghini_aventador', label: 'Lamborghini Aventador' },
          { value: 'lamborghin_huracan', label: 'Lamborghini Huracan' },
        ],
      },
      {
        value: 'ferrari',
        label: 'Ferrari',
        children: [
          { value: 'ferrari_portofino', label: 'Ferrari Portofino' },
          { value: 'ferrari_roma', label: 'Ferrari Roma' },
        ],
      },
    ],
  },
];

const App = () => {
  return (
    <MultiSelectTree
      label="Vehicals"
      placeholder="Select Vehicals"
      data={data}
      onChange={(selectedOptions) => {
        console.log(selectedOptions);
      }}
      initialState={[{ value: 'ferrari_portofino', label: 'Ferrari Portofino' }]}
    />
  );
};

export default App;
```

## Props

| Name           | Type                                 | Description                                 | Default       |
| :------------- | :----------------------------------- | :------------------------------------------ | :------------ |
| `data`         | `Array`                              | Options in tree form                        | `[]`          |
| `label`        | `string`                             | Label for the multiSelect                   | -             |
| `placeholder`  | `string`                             | Placeholder for multiSelect                 | `"Select..."` |
| `onChange`     | `((selectedOptions: Array) => void)` | Callback invoked when user changes input.   | `() => {}`    |
| `initialState` | `Array`                              | Initial selected options                    | `[]`          |
| `disabled`     | `boolean`                            | If `true`, the multiSelect will be disabled | `false`       |

## Imports

You can import below variables from `multi-select-tree`

- `MultiSelectTree` Component
- Only for `typescript` users
  - `DataInterface` Type interface of data
  - `SelectedOptionsInterface` Type Interface of selected options

```jsx
import MultiSelectTree, { DataInterface, SelectedOptionsInterface } from 'multi-select-tree';
```

## License

This project is licensed under the MIT License - Copyright (c) 2020 `Smit Patel`
