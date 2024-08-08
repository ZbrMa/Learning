import { useState, useEffect,useRef } from "react";
import { IoClose, IoChevronUp, IoChevronDown} from "react-icons/io5";
import './styles/dropdown.css';
import { render } from "@testing-library/react";

type Props = {
    options:{label:string,value:any}[];
    placeholder:string,
    returnSelected:any,
    multiSelect?:boolean,
};

const iconStyle = {
    height:"auto",
    width:"auto",
    fontWeight:700,
    fontSize:"16px",
    marginRight:"2px",
};

export function Dropdown({options,placeholder,returnSelected,multiSelect=true}:Props){
    const dropdownRef = useRef<HTMLDivElement>(null);

    const[isOpened,setIsOpened] = useState<boolean>(false);
    const[selected,setSelected] = useState<{label:string,value:any}[]>([]);

    const handleOpen =()=>{
        if(!isOpened) setIsOpened(true);
        else setIsOpened(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpened(false);
        }
    };

    useEffect(() => {
        const selectedValues = selected.map(item => item.value);
        returnSelected(multiSelect ? selectedValues : selectedValues[0]);
    }, [selected]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: { label: string, value: any }) => {
        if (selected.find(item => item.value === option.value)) {
            setSelected(selected.filter(item => item.value !== option.value));
        } else {
            if (multiSelect) {
                setSelected([...selected, option]);
            } else {
                setSelected([option]);
            }
        }
    };

    const handleRemove = (option: { label: string, value: any }) => {
        setSelected(selected.filter(item => item.value !== option.value));
    };

    return (
        <div ref={dropdownRef} className={`dropdown ${isOpened ? "is-opened" : ""}`}>
            <div className="dropdown-inner">
                <div className="dropdown-head">
                    <div className="dropdown-control">
                        <div className="selected-options">
                            {selected.map((item) =>
                                <div key={item.value} className="selected-item" onClick={() => handleRemove(item)}>
                                    <div className="selected-text">{item.label}</div>
                                    <IoClose style={iconStyle} />
                                </div>
                            )}
                        </div>
                        <div className="select-placeholder" onClick={handleOpen}>{placeholder}</div>
                    </div>
                    {isOpened
                        ? <IoChevronUp className="dropdown-chevron" onClick={handleOpen} />
                        : <IoChevronDown className="dropdown-chevron" onClick={handleOpen} />}
                </div>
            </div>
            {isOpened && (
                <div className="option-container">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selected.some(item => item.value === option.value) ? "selected" : ""}`}
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