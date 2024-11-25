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
  let grouped: { groupName: T[keyof T]; groupItems: T[] }[] = [];
  unique.forEach((element) => {
    const elems = array.filter((item) => item[key] === element);
    if (elems) grouped.push({ groupName: element, groupItems: elems });
  });

  return grouped;
}

interface DropdownProps<T> extends HTMLAttributes<HTMLElement> {
  options: T[];
  placeholder: string;
  returnSelected: (value: T[]) => void;
  multiSelect?: boolean;
  disabled?: boolean;
  groupKey: keyof T;
  optionLabel: keyof T;
  label?: string;
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
  ...props
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);
  const [grouped, setGrouped] = useState<
    { groupName: T[keyof T]; groupItems: T[] }[]
  >([]);

  useEffect(() => {
    setGrouped(groupBy(options, groupKey));
  }, [options]);

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
    returnSelected(selected);
  }, [selected]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: T) => {
    if (selected.find((item) => item === option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      if (multiSelect) {
        setSelected([...selected, option]);
      } else {
        setSelected([option]);
      }
    }
  };

  const handleRemove = (option: T) => {
    setSelected(selected.filter((item) => item !== option));
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
              <div className="option__group">
                <span className="option__group--name tx-sm xbold">
                  {String(group.groupName)}
                </span>
                {group.groupItems.map((option, index) => (
                  <div
                    key={index}
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
