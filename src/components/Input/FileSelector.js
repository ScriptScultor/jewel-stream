import { TextField } from "@mui/material";
import React, { useState } from "react";

const CustomImageUploader = ({ isError, errorText, onChange, value }) => {
  const [base64Image, setBase64Image] = useState(null);

  const beforeUpload = (file) => {
    setBase64Image(file);
    onChange(file);
    return;
  };

  return (
    <>
      <div className="custom-uploader-container">
        <label
          className={`custom-uploader ${isError && "error-picker"}`}
          htmlFor="image-selector"
        >
          {base64Image ? (
            <img
              src={URL.createObjectURL(base64Image)}
              alt="Uploaded"
              className="uploaded-image"
            />
          ) : (
            <>
              <span className="upload-text">Click to Upload</span>
            </>
          )}
        </label>
        {errorText && <p className="error-text">{errorText}</p>}
      </div>
      <TextField
        onChange={(event) => {
          beforeUpload(event.target.files[0]);
        }}
        error={isError}
        helperText={errorText}
        id="image-selector"
        variant="standard"
        type="file"
        className="d-none"
      />
    </>
  );
};

export default CustomImageUploader;
