/**
 * @author: Smit Patel
 */

export interface DataInterface {
  value: string | number;
  label: string;
  additional?: any;
  isSelected: boolean;
  isOpen: boolean;
  children: DataInterface[];
}

export interface MultiSelectTreeComponentProps {
  label: string;
  disabled?: boolean;
  placeholder?: string;
  data: DataInterface[];
  initialState?: DataInterface[];
  onChange: (selectedOptions: SelectedOptionInterface[]) => void;
}

export interface TreeStructureInterface {
  value: string | number;
  label: string;
  children?: TreeStructureInterface[];
  additional?: any;
}

export interface SelectedOptionInterface {
  value: string | number;
  label: string;
}

export type SelectedValues = Set<string | number>;

export interface DataContextInterface {
  data: DataInterface[];
  selectedOptions: SelectedOptionInterface[];
  onSelectDeSelect: (options: SelectedOptionInterface[], isSelected: boolean) => void;
  initialize: (options: any, selectedOptions: any) => void;
  setData: (data: DataInterface[]) => void;
  setSelectedOptions: (options: SelectedOptionInterface[]) => void;
}
