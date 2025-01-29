// types.ts
export type IInputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'date';

export interface IOption {
  label: string;
  value: string | number;
}

export interface IFieldConfig {
  name: string;
  label: string;
  type: IInputType;
  placeholder?: string;
  defaultValue?:any;
  options?: IOption[];
  validation?: {
    required?: boolean;
    minLength?: number;
    mustContain?: string[];
  };
}

export interface IFormConfig {
  fields: IFieldConfig[];
  onSubmit: (data: { [key: string]: any }) => void;
}
