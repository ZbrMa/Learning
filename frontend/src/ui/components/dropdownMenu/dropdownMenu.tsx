import React, {  useState, useRef } from "react";
import { Link } from "react-router-dom";
import './dropdownMenu.css';
import { useClickOutside } from "../../../hooks/clickHooks";

type DropdownMenuProps = {
    options: { label: string; link?: string; onClick?: React.MouseEventHandler, optionIcon?:React.ReactNode }[];
    children: React.ReactNode;
};

export function DropdownMenu({ options, children }: DropdownMenuProps) {
    const [opened, setOpened] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref,()=>setOpened(false));

    return (
        <div className="dropdown__menu" ref={ref}>
            <div className="dropdown__menu--trigger" onClick={() => setOpened(!opened)}>
                {children}
            </div>
            <ul className={`dropdown__menu__options ${opened ? 'opened' : ''}`}>
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
