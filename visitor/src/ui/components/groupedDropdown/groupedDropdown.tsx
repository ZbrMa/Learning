import { useState, useRef, useEffect, HTMLAttributes } from "react";
import { IoChevronUp, IoChevronDown, IoClose } from "react-icons/io5";
import "./groupedDropdown.css";

const iconStyle = {
  height: "auto",
  width: "auto",
  fontWeight: 700,
  fontSize: "16px",
  marginRight: "2px",
};

function groupBy<T>(array: T[], key: keyof T) {
  const unique = new Set(array.map((item) => item[key]));
  const grouped: { groupName: T[keyof T]; groupItems: T[] }[] = [];
  unique.forEach((element) => {
    const elems = array.filter((item) => item[key] === element);
    if (elems) grouped.push({ groupName: element, groupItems: elems });
  });

  return grouped;
}

function areObjectsEqual<T extends object>(obj1: T , obj2: T): boolean {
  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];
  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => obj1[key] === obj2[key]);
};

interface DropdownProps<T> extends Omit<HTMLAttributes<HTMLElement>,'defaultValue'> {
  options: T[];
  placeholder: string;
  returnSelected: (value: T[]) => void;
  multiSelect?: boolean;
  disabled?: boolean;
  groupKey: keyof T;
  optionLabel: keyof T;
  label?: string;
  defaultValue?:T,
};

export function GroupedDropdown<T>({
  options,
  placeholder,
  returnSelected,
  multiSelect = true,
  disabled = false,
  groupKey,
  optionLabel,
  label,
  defaultValue,
  ...props
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState<T[]>(options.filter((option) => defaultValue && areObjectsEqual(option as object, defaultValue)) || []);
  const [grouped, setGrouped] = useState<
    { groupName: T[keyof T]; groupItems: T[] }[]
  >([]);

  useEffect(() => {
    setGrouped(groupBy(options, groupKey));
  }, [options,groupKey]);

  const handleOpen = () => {
    if (!isOpened && !disabled) setIsOpened(true);
    else setIsOpened(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: T) => {
    if (selected.find((item) => item === option)) {
      const filteredSelected = selected.filter((item) => item !== option);
      setSelected(filteredSelected);
      returnSelected(filteredSelected);
    } else {
      if (multiSelect) {
        const newSelected = [...selected, option]
        setSelected(newSelected);
        returnSelected(newSelected);
      } else {
        setSelected([option]);
        returnSelected([option]);
      }
    }
  };

  const handleRemove = (option: T) => {
    const filteredSelected = selected.filter((item) => item !== option);
    setSelected(filteredSelected);
      returnSelected(filteredSelected);
  };

  return (
    <div className="dropdown__container flex-col g-8" {...props}>
      {label && <label className="bold">{placeholder}:</label>}
      <div
        ref={dropdownRef}
        className={`dropdown ${isOpened ? "is-opened" : ""}`}
      >
        <div className="dropdown-inner">
          <div className="dropdown-head">
            <div className="dropdown-control">
              <div className="selected-options">
                {selected.map((item) => (
                  <div
                    key={String(item[optionLabel])}
                    className="selected-item tx-white bg-red flex items-center"
                    onClick={() => handleRemove(item)}
                  >
                    <div className="tx-xs bold">
                      {String(item[optionLabel])}
                    </div>
                    <IoClose style={iconStyle} />
                  </div>
                ))}
              </div>
              <div className="select-placeholder" onClick={handleOpen}>
                {placeholder}
              </div>
            </div>
            {isOpened ? (
              <IoChevronUp className="dropdown-chevron" onClick={handleOpen} />
            ) : (
              <IoChevronDown
                className="dropdown-chevron"
                onClick={handleOpen}
              />
            )}
          </div>
        </div>
        {isOpened && options && (
          <div className="option-container">
            {grouped.map((group, groupIndex) => (
              <div className="option__group" key={String(group.groupName) + groupIndex}>
                <span className="option__group--name tx-sm xbold">
                  {String(group.groupName)}
                </span>
                {group.groupItems.map((option, index) => (
                  <div
                    key={index+String(option[optionLabel])}
                    className={`option ${
                      selected.some(
                        (item) => item[optionLabel] === option[optionLabel]
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {String(option[optionLabel])}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
