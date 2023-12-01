import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function CheckboxWithLabel({ label, defaultChecked = false }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleLabelClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          color="primary"
        />
      }
      label={label}
      onClick={handleLabelClick}
    />
  );
}

export default CheckboxWithLabel;
