import React, { memo } from 'react';
import Select from 'react-select';

function getValueObj(options, val) {
  return options?.find(({ label, value }) => {
    return value == val;
  });
}

function ReactSelect({
  closeMenuOnSelect = true,
  onChange,
  value = '',
  className = '',
  altInput,
  options = [],
  disabled = false,
  isClearable = false,
  ...props
}) {
  return (
    <Select
      {...props}
      closeMenuOnSelect={closeMenuOnSelect}
      onChange={onChange}
      value={typeof value === 'object' ? value : getValueObj(options, value)}
      className={
        'block w-full border-gray-300 focus:border-greenVogue-100 focus:ring-greenVogue-100 rounded-md shadow-sm ' +
        className +
        (altInput ? ' bg-white' : ' bg-gray-200')
      }
      styles={{
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: provided => ({ ...provided, minHeight: '42px' }),
      }}
      isDisabled={disabled}
      menuPortalTarget={document.body}
      options={options}
      isClearable={isClearable}
    />
  );
}

export default memo(ReactSelect);
