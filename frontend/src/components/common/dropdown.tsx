import { useState, useEffect,useRef } from "react";
import { IoClose, IoChevronUp, IoChevronDown} from "react-icons/io5";
import './styles/dropdown.css';
import { render } from "@testing-library/react";

type Props = {
    options:any;
    placeholder:string,
    returnSelected:any,
};

const iconStyle = {
    height:"auto",
    width:"auto",
    fontWeight:700,
    fontSize:"16px",
    marginRight:"2px",
};

export function Dropdown({options,placeholder,returnSelected}:Props){
    const dropdownRef = useRef<HTMLDivElement>(null);

    const[isOpened,setIsOpened] = useState<boolean>(false);
    const[selected,setSelected] = useState<any[]>([]);

    const handleOpen =()=>{
        if(!isOpened) setIsOpened(true);
        else setIsOpened(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpened(false);
        }
    };

    useEffect(()=>{
        returnSelected(selected);
    },[selected])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        if (selected.indexOf(option) > -1) {
            setSelected(selected.filter(function(e) { return e !== option; }));
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleRemove = (option: string) => {
        setSelected(selected.filter((item) => item !== option));
    };

    return(
        <div ref={dropdownRef} className={`dropdown ${isOpened? "is-opened": ""}`}>
            <div className="dropdown-inner">
                <div className="dropdown-head">
                    <div className="dropdown-control">
                        <div className="selected-options">
                            {selected?.map((key:any)=>
                                <div className="selected-item" onClick={()=>handleRemove(key)}>
                                    <div className="selected-text">{key}</div>
                                    <IoClose style={iconStyle}></IoClose>
                                </div>
                            )}
                        </div>
                        <div className="select-placeholder" onClick={handleOpen}>{placeholder}</div>
                    </div>
                    {isOpened? (<IoChevronUp className="dropdown-chevron" onClick={handleOpen}></IoChevronUp>):(<IoChevronDown className="dropdown-chevron" onClick={handleOpen}></IoChevronDown>)}
                </div>
            </div>
            <div className="option-container">
                {options?.map((key:any,index:number)=>
                    <div 
                        className={`option ${selected.includes(key.label) ? "selected" : ""}`} 
                        onClick={()=>handleSelect(key.label)}
                    >
                        {key.label}
                    </div>
                )}
            </div>
        </div>
    );
}