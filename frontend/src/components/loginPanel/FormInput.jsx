import React from "react";

function FormInput({
  id,
  children,
  required,
  type,
  value,
  placeholder,
  setValue,
}) {
  return (
    <>
      <label className="" htmlFor={id}>
        {children}
      </label>
      <input
        className="bg-background-700 w-full max-w-80 h-10 p-3"
        id={id}
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}

export default FormInput;
