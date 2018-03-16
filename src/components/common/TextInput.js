import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  microcopy
}) => {
  let wrapperClass = "input__group";

  if (error && error.length > 0) {
    wrapperClass += " " + "input__group--error";
  }

  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={name}>{label}</label>}
        <input
          type="text"
          className="form__input"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {microcopy && <p className="microcopy">{microcopy}</p>}
        {error && <p className="microcopy microcopy--error">{error}</p>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  microcopy: PropTypes.string,
  label: PropTypes.string
};

export default TextInput;
