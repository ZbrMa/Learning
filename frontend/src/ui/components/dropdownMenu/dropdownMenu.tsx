import React, {  useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './dropdownMenu.css';
import { useClickOutside } from "../../../hooks/clickHooks";
import { IDropdownMenuOption } from "../../../types/filtersTypes";

type DropdownMenuProps = {
    options: IDropdownMenuOption[];
    children: React.ReactNode;
};

export function DropdownMenu({ options, children }: DropdownMenuProps) {
    const [opened, setOpened] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    useClickOutside(menuRef,()=>setOpened(false));

    const toggleMenu = () => {
        setOpened(!opened);
        if (optionsRef.current && triggerRef.current) {
            const rect = optionsRef.current.getBoundingClientRect();
            const triggerRect = triggerRef.current.offsetWidth;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
    
            if (rect.right > windowWidth) {
                optionsRef.current.style.left = `-${rect.right - rect.left - triggerRect}px`;
            } else {
                optionsRef.current.style.left = "0";
            }
    
            if (rect.left < 0) {
                optionsRef.current.style.left = `${-rect.left}px`;
            }
    
            if (rect.bottom > windowHeight) {
                optionsRef.current.style.top = `-${rect.height}px`;
            } else {
                optionsRef.current.style.top = "";
            }
    
            if (rect.top < 0) {
                const overflowY = -rect.top;
                optionsRef.current.style.top = `${overflowY + 10}px`;
            }
        }
    };

    return (
        <div className="dropdown__menu" ref={menuRef}>
            <div className="dropdown__menu--trigger" onClick={toggleMenu} ref={triggerRef}>
                {children}
            </div>
            <ul className={`dropdown__menu__options ${opened ? 'opened' : ''}`} ref={optionsRef}>
                {options.map((option, index) => (
                    <li key={option.label + index} className="dropdown__menu--item">
                        {option.link ? (
                            <Link to={option.link} className="flex g-16 items-center">{option.optionIcon}{option.label}</Link>
                        ) : (
                            <span onClick={option.onClick} className="flex g-16 items-center">{option.optionIcon}{option.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
