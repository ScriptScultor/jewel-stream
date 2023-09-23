import React from "react";
import TextField from "@mui/material/TextField";

function ValidatedTextField({
  label,
  onChange,
  type,
  value,
  isError,
  errorText,
}) {
  return (
    <div className="form-input-container">
      <TextField
        label={label}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        error={isError}
        helperText={errorText}
        fullWidth
        id="standard-basic"
        variant="standard"
        type={type}
      />
    </div>
  );
}

export default ValidatedTextField;
