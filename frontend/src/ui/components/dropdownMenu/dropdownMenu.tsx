import React, {
  useState,
  useRef,
  HTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import "./dropdownMenu.css";
import { useClickOutside } from "../../../hooks/clickHooks";
import { IDropdownMenuOption } from "../../../types/filtersTypes";

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  options: IDropdownMenuOption[];
  children: React.ReactNode;
  orientation?:'up'|'down'|'left'|'right',
};

export function DropdownMenu({ options, children,orientation='down',...props }: DropdownMenuProps) {
  const [opened, setOpened] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setOpened(false));

  return (
    <div className="dropdown__menu" ref={menuRef} {...props}>
      <div
        className="dropdown__menu--trigger"
        onClick={()=>setOpened(!opened)}
      >
        {children}
      </div>
      <ul
        className={`dropdown__menu__options ${orientation} ${opened ? "opened" : ""}`}
      >
        {options.map((option, index) =>
          option.children ? (
            option.children
          ) : (
            <li key={option.label ?? +index} className="dropdown__menu--item">
              {option.link ? (
                <Link to={option.link} className="flex g-16 items-center">
                  {option.optionIcon}
                  {option.label}
                </Link>
              ) : (
                <span
                  onClick={(e) => {
                    if (option.onClick) {
                      option.onClick(e);
                    }
                    setOpened(false);
                  }}
                  className="flex g-16 items-center"
                >
                  {option.optionIcon}
                  {option.label}
                </span>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
