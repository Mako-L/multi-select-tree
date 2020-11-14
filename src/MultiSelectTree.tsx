/**
 * @author: Smit Patel
 */

// Libraries
import React from 'react';

// Components
import MultiSelectTreeComponent from './components/MultiSelectTreeComponent';
import { DataProvider } from './context/DataContext';

// Interfaces
import { MultiSelectTreeComponentProps } from './interfaces';

// base-ui
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled, DarkTheme } from 'baseui';

// css
import './multiSelectTree.scss';

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const MultiSelectTree: React.FC<MultiSelectTreeComponentProps> = (props) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={props.isDarkMode ? DarkTheme : LightTheme}>
      <Centered>
        <DataProvider>
          <div className="multi-select-tree-wrapper">
            <MultiSelectTreeComponent {...props} />
          </div>
        </DataProvider>
      </Centered>
    </BaseProvider>
  </StyletronProvider>
);

export default MultiSelectTree;
