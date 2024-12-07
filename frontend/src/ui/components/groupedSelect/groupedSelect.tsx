import React, { useState, useRef, useEffect, HTMLAttributes } from "react";
import { IoChevronUp, IoChevronDown, IoClose } from "react-icons/io5";
import "./groupedSelect.css";

const iconStyle = {
  height: "auto",
  width: "auto",
  fontWeight: 700,
  fontSize: "16px",
  marginRight: "2px",
};

// Pomocná funkce pro seskupení položek
function groupBy<T>(array: T[], key: keyof T) {
  const unique = new Set(array.map((item) => item[key]));
  let grouped: { groupName: T[keyof T]; groupItems: T[] }[] = [];
  unique.forEach((element) => {
    const elems = array.filter((item) => item[key] === element);
    if (elems) grouped.push({ groupName: element, groupItems: elems });
  });
  return grouped;
}

// Kontrola rovnosti objektů
function areObjectsEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every((key) => obj1[key] === obj2[key]);
}

interface GroupedSelectProps<T> extends Omit<HTMLAttributes<HTMLElement>, 'defaultValue'> {
  options: T[];
  placeholder: string;
  returnSelected: (value: T) => void;
  multiSelect?: false;  // Zakazujeme multi-select (pro single-select)
  disabled?: boolean;
  groupKey: keyof T;
  optionLabel: keyof T;
  label?: string;
  defaultValue?: T;
  hasSearchBar?: boolean;
}

export function GroupedSelect<T>({
  options,
  placeholder,
  returnSelected,
  multiSelect = false,  // Definujeme, že multiSelect je false
  disabled = false,
  groupKey,
  optionLabel,
  label,
  defaultValue,
  hasSearchBar = false,
  ...props
}: GroupedSelectProps<T>) {
  const grselectRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState<T | null>(defaultValue || null);  // Pouze jedna vybraná možnost
  const [grouped, setGrouped] = useState<{ groupName: T[keyof T]; groupItems: T[] }[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setGrouped(groupBy(options, groupKey));
  }, [options]);

  useEffect(() => {
    if (selected) {
      returnSelected(selected);  // Po změně vybrané hodnoty voláme returnSelected s jednou položkou
    }
  }, [selected]);

  const handleOpen = () => {
    if (!disabled) setIsOpened((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (grselectRef.current && !grselectRef.current.contains(event.target as Node)) {
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
    setSelected(option); 
    setIsOpened(false);
  };

  return (
    <div className="grselect__container flex-col g-8" {...props}>
      {label && <label className="bold">{label}:</label>}
      <div ref={grselectRef} className={`grselect ${isOpened ? "is-opened" : ""}`}>
        <div className="grselect-inner">
          <div className="grselect-head flex items-center g-16" onClick={handleOpen}>
                {selected ? (
                  String(selected[optionLabel])
                ) : (
                    placeholder
                )}
            {isOpened ? (
              <IoChevronUp className="grselect-chevron"/>
            ) : (
              <IoChevronDown className="grselect-chevron"/>
            )}
          </div>
        </div>
        {isOpened && options && (
          <div className="option-container">
            {hasSearchBar && (
              <input
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Hledej..."
                value={filter}
              />
            )}
            {grouped.map((group, groupIndex) => (
              <div key={groupIndex} className="option__group">
                <span className="option__group--name tx-sm xbold">{String(group.groupName)}</span>
                {group.groupItems
                  .filter((option) =>
                    String(option[optionLabel]).toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((option, index) => (
                    <div
                      key={index + String(option[optionLabel])}
                      className={`option ${
                        selected && selected[optionLabel] === option[optionLabel] ? "selected" : ""
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
