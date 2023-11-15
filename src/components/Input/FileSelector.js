import { TextField } from "@mui/material";
import React, { useState } from "react";
import ImageResizer from "react-image-file-resizer";

const CustomImageUploader = ({ isError, errorText, onChange, value }) => {
  const [base64Image, setBase64Image] = useState(null);

  const beforeUpload = (file) => {
    // Perform image resizing and set base64Image state
    ImageResizer.imageFileResizer(
      file,
      300, // maxWidth
      300, // maxHeight
      "JPEG", // compressFormat
      80, // quality
      0, // rotation
      (resizedBase64Image) => {
        setBase64Image(resizedBase64Image);
        onChange(resizedBase64Image);
      },
      "base64", // outputType
      0, // minWidth
      0 // minHeight
    );

    return false; // Prevent default upload behavior
  };

  return (
    <>
      <div className="custom-uploader-container">
        <label
          className={`custom-uploader ${isError && "error-picker"}`}
          htmlFor="image-selector"
        >
          {base64Image ? (
            <img src={base64Image} alt="Uploaded" className="uploaded-image" />
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
