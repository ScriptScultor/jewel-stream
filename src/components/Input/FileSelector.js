import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Inputs.css"; // Import your CSS file

const CustomImageUploader = ({
  identifier = "image-upload",
  isError,
  errorText,
  onChange,
  value,
}) => {
  const [base64Image, setBase64Image] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const beforeUpload = (file) => {
    const maxSize = 1.5 * 1024 * 1024; // 1.5 MB in bytes
    setUploadError("");

    if (file.size <= maxSize) {
      setIsLoading(true); // Set loading state when a new file is selected
      setBase64Image(file);
      onChange(file);
    } else {
      setBase64Image(null);
      onChange(null); // Clear the previous file
      setUploadError("Image size must be below 1.5 MB.");
    }
  };

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoading(false); // Set loading to false when the image is loaded
    };

    if (base64Image || value) {
      setIsLoading(true); // Set loading to true before starting to load the image

      const imgElement = new Image();
      imgElement.onload = handleImageLoad;
      imgElement.src = base64Image ? URL.createObjectURL(base64Image) : value;
    }
  }, [base64Image, value]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div
        className={`custom-uploader-container${isLoading ? " shimmer" : ""}`}
      >
        <label
          className={`custom-uploader ${
            isError || Boolean(uploadError) ? "error-picker" : ""
          }`}
          htmlFor={identifier}
        >
          {base64Image || value ? (
            <>
              {isLoading && <div className="shimmer-effect"></div>}
              <img
                src={base64Image ? URL.createObjectURL(base64Image) : value}
                alt="Uploaded"
                className={`uploaded-image ${isLoading ? "hidden" : ""}`}
                loading="lazy"
                onLoad={handleImageLoad} // Add this line to handle image load event
              />
            </>
          ) : (
            <>
              <span className="upload-text">Click to Upload</span>
            </>
          )}
        </label>
        {(errorText || uploadError) && (
          <p className="error-text">{errorText || uploadError}</p>
        )}
      </div>
      <TextField
        onChange={(event) => {
          beforeUpload(event.target.files[0]);
        }}
        error={isError || Boolean(uploadError)}
        helperText={uploadError || errorText}
        id={identifier}
        variant="standard"
        type="file"
        className="d-none"
      />
    </>
  );
};

export default CustomImageUploader;
