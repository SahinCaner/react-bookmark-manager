import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  selectedValue,
  value,
  error,
  options
}) => {
  let wrapperClass = "input__group";

  if (error && error.length > 0) {
    wrapperClass += " " + "input__group--error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="select__wrapper">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={name}
          defaultValue={selectedValue}
          onChange={onChange}
          className="form__input"
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="microcopy microcopy--error">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedValue: PropTypes.string,
  label: PropTypes.string
};

export default SelectInput;
