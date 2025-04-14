import React, { useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import styles from './MultiDropdown.module.scss'; 
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Text from 'components/Text';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled: initialDisabled,
  getTitle,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState('');
  const [disabled, setDisabled] = useState(initialDisabled);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFilteredOptions(options);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, options]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    setDisabled(initialDisabled);
  }, [initialDisabled]);

  useEffect(() => {
    const filtered =
      inputValue.trim() === ''
        ? options
        : options.filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleInputChange = React.useCallback(
    (newValue: string) => {
      if (disabled) return;
      setInputValue(newValue);
    },
    [disabled]
  );

  const handleOptionClick = React.useCallback((clickedOption: Option) => {
    const isSelected = value.some((option) => option.key === clickedOption.key);
    if (isSelected) {
      onChange(value.filter((option) => option.key !== clickedOption.key));
    } else {
      onChange([...value, clickedOption]);
    }
    setInputValue('');
  }, [value, onChange]); 

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    []
  );

  const inputDisplayValue = inputValue || (value.length > 0 ? getTitle(value) : '');

  return (
    <div className={`${styles.multidropdown} ${className}`} ref={dropdownRef}>
      <Input
        id="dropdown_input"
        ref={inputRef}
        placeholder={value.length === 0 ? getTitle(value) : 'Type'}
        value={inputDisplayValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        {...props}
      />
      {isOpen && !disabled && (
        <ul className={styles.option}>
          {filteredOptions.map((option) => {
            const isSelected = value.some((selected) => selected.key === option.key);
            return (
              <Text
                key={option.key}
                className={`${styles.textOption} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </Text>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
