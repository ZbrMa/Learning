import React, {
  useState,
  useRef,
  CSSProperties,
} from "react";
import { Link } from "react-router-dom";
import "./dropdownMenu.css";
import { useClickOutside } from "../../../hooks/clickHooks";
import { IDropdownMenuOption } from "../../../types/filtersTypes";

type DropdownMenuProps = {
  options: IDropdownMenuOption[];
  children: React.ReactNode;
  style?: CSSProperties;
};

export function DropdownMenu({ options, children, style }: DropdownMenuProps) {
  const [opened, setOpened] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setOpened(false));

  return (
    <div className="dropdown__menu" ref={menuRef} style={style}>
      <div
        className="dropdown__menu--trigger"
        onClick={()=>setOpened(!opened)}
      >
        {children}
      </div>
      <ul
        className={`dropdown__menu__options ${opened ? "opened" : ""}`}
      >
        {options.map((option, index) =>
          option.children ? (
            option.children
          ) : (
            <li key={option.label ?? +index} className="dropdown__menu--item">
              {option.link ? (
                <Link
                to={option.link}
                className="flex g-16 items-center"
              >
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
