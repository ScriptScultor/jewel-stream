import React from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import "./Inputs.css";

function ValidatedSelect({
  label,
  onChange,
  value,
  isError,
  errorText,
  options,
}) {
  return (
    <div className="form-select-container">
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-standard-label" error={isError}>
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          error={isError}
          id="standard-basic"
          variant="standard"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errorText && <p className="error-text">{errorText}</p>}
      </FormControl>
    </div>
  );
}

export default ValidatedSelect;
