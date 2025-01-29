import { useRef, useState, useEffect, memo, InputHTMLAttributes, CSSProperties } from 'react';
import { IOption } from '../../../types/form';
import { IoClose, IoChevronUp, IoChevronDown} from "react-icons/io5";
import { forwardRef, SelectHTMLAttributes } from "react";
import './select.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label:string,
    options:IOption[] | undefined,
    labelPosition?:'in' | 'out';
};

export const Select = forwardRef<HTMLSelectElement,SelectProps>(function Select({label,options,labelPosition='in',...props},ref){

    if(labelPosition==='out'){
        return(
            <div className="select__container">
                <label>{label}:</label>
                <select {...props} ref={ref}>
                    {options?.map((option,index)=>(
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        );    
    };
    return null;
}
);


interface MySelectProps extends InputHTMLAttributes<HTMLInputElement> {
    options: IOption[];
    placeholder?: string;
    returnSelected: (value: number | string) => void;
    isDisabled?: boolean;
    defaultValue?:string | number,
    label?:string,
    hasSearchBar?:boolean,
    optionsStyle?:CSSProperties,
};

export const MySelect = memo(function MySelect({
    options,
    placeholder,
    returnSelected,
    isDisabled = false,
    defaultValue,
    label,
    hasSearchBar = false,
    optionsStyle,
    ...props
  }: MySelectProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [disabled, setDisabled] = useState(isDisabled);
    const [selected, setSelected] = useState<IOption | null>(null);
    const [filter, setFilter] = useState("");
  
    useEffect(() => {
      const newSelected = options.find((option) => option.value === defaultValue);
      if (newSelected && newSelected.value !== selected?.value) {
        setSelected(newSelected);
      }
    }, [defaultValue, options,selected?.value]);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };
  
    useEffect(() => {
      setDisabled(isDisabled);
    }, [isDisabled]);
  
    useEffect(() => {
      if (selected) {
        returnSelected(selected.value);
      }
    }, [selected,returnSelected]);
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const handleSelect = (option: IOption) => {
      setSelected(option);
      setIsOpened(false);
    };
  
    useEffect(() => {
      if (!isOpened) setFilter("");
    }, [isOpened]);
  
    return (
      <div
        ref={dropdownRef}
        className={`dropdown ${isOpened ? "is-opened" : ""} ${disabled ? "disabled" : ""}`}
      >
        {label && (
          <label className="dropdown--label">
            {label}: {props.required ? "*" : ""}
          </label>
        )}
        <div
          className={`dropdown-inner ${label ? "mt-8" : ""}`}
          onClick={()=>setIsOpened(!isOpened)}
        >
          <div className="dropdown-head">
            <div className="dropdown-control">
              <div className="selected-option">
                {selected ? selected.label : placeholder}
              </div>
            </div>
            {!disabled && (
              isOpened ? (
                <IoChevronUp className="dropdown-chevron" />
              ) : (
                <IoChevronDown className="dropdown-chevron" />
              )
            )}
          </div>
        </div>
        {isOpened && options && (
          <div className="option-container" style={optionsStyle}>
            {hasSearchBar && (
              <input
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Hledej..."
              />
            )}
            {options
              .filter((option) =>
                option.label.toLowerCase().includes(filter.toLowerCase())
              )
              .map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selected && selected.value === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  });


type DropdownProps = {
    options:IOption[];
    placeholder:string,
    returnSelected: (value:(number | string)[]) => void;
    multiSelect?:boolean,
    disabled?:boolean,
    defaultValues?:IOption[],
};

export function Dropdown({
    options,
    placeholder,
    returnSelected,
    multiSelect = true,
    disabled = false,
    defaultValues
  }: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<IOption[]>(defaultValues ?? []);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const handleSelect = (option: IOption) => {
      if (selected.find((item) => item.value === option.value)) {
        const filteredSelected =selected.filter((item) => item.value !== option.value);
        setSelected(filteredSelected);
        returnSelected(filteredSelected.map(item=>item.value));
      } else {
        if (multiSelect) {
          const newSelected = [...selected,option];
          setSelected(newSelected);
          returnSelected(newSelected.map(item=>item.value));
        } else {
          setSelected([option]);
          returnSelected([option.value]);
        }
      }
    };
  
    const handleRemove = (option: IOption) => {
      if(!disabled) {
        const filteredSelected = selected.filter((item) => item.value !== option.value)
        setSelected(filteredSelected);
        returnSelected(filteredSelected.map(item=>item.value))
      }
    };
  
    return (
      <div ref={dropdownRef} className={`dropdown ${isOpened ? "is-opened" : ""} ${disabled ? "disabled" : ""}`}>
        <div className="dropdown-inner">
          <div className="dropdown-head" onClick={()=>setIsOpened(!isOpened)}>
            <div className="dropdown-control">
              <div className="selected-options">
                {selected.map((item) => (
                  <div
                    key={item.value}
                    className="selected-item tx-white bg-red flex items-center"
                    onClick={() => handleRemove(item)}
                  >
                    <div className="tx-xs bold">{item.label}</div>
                    {!disabled && <IoClose style={{ height: "auto", width: "auto", fontWeight: 700, fontSize: "16px", marginRight: "2px" }} />}
                  </div>
                ))}
              </div>
              {!disabled && <div className="select-placeholder">{placeholder}</div>}
            </div>
            {!disabled && (isOpened ? (
              <IoChevronUp className="dropdown-chevron" onClick={()=>setIsOpened(!isOpened)} />
            ) : (
              <IoChevronDown className="dropdown-chevron" onClick={()=>setIsOpened(!isOpened)} />
            ))}
          </div>
        </div>
        {isOpened && options && (
          <div className="option-container">
            {options.map((option, index) => (
              <div
                key={index}
                className={`option ${selected.some((item) => item.value === option.value) ? "selected" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }