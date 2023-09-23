const isValidEmail = (email) => {
  // Regular expression pattern for a valid email address
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the pattern and return true if it's valid, false otherwise
  return emailPattern.test(email);
};

// Validation function for Full Name
function validateFullName(fullName) {
  // Trim any leading and trailing spaces from the input
  const trimmedName = fullName.trim();

  // Check if the full name is at least 2 characters long (you can adjust this minimum length)
  if (trimmedName.length < 2) {
    return "Full name must be at least 2 characters long";
  }

  // Use a regular expression to check if the name contains only letters and spaces
  const namePattern = /^[a-zA-Z\s]+$/;
  if (!namePattern.test(trimmedName)) {
    return "Full name can only contain letters and spaces";
  }

  // If the input passes all checks, it's considered valid
  return "";
}

// Validation function for Email
function validateEmail(email) {
  // Check if the email is valid using the isValidEmail function
  const required = email.trim() === "";
  if (required) {
    return "Email is required";
  }
  const valid = isValidEmail(email);
  return valid ? "" : "Please provide a valid email";
}

// Validation function for Phone Number
function validatePhoneNumber(phoneNumber) {
  // Remove spaces, hyphens, or any non-digit characters
  const cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");

  // Check if the cleaned number is exactly 10 digits long
  if (cleanedNumber.length !== 10) {
    return "Indian phone numbers must have 10 digits";
  }

  // Check if the first digit is between 6 and 9 (inclusive)
  if (!/^[6-9]/.test(cleanedNumber)) {
    return "Indian phone numbers must start with a digit between 6 and 9";
  }

  // If the input passes all checks, it's considered valid
  return "";
}

// Validation function for Password
function validatePassword(password) {
  // Check if the password meets the minimum length requirement
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  // Check if the password contains both uppercase and lowercase letters
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    return "Password must contain both uppercase and lowercase letters";
  }

  // Check if the password contains at least one numeric digit
  if (!/\d/.test(password)) {
    return "Password must contain at least one numeric digit";
  }

  // Optionally, check if the password contains at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return "Password should contain at least one special character (!@#$%^&*)";
  }

  // If the password passes all checks, it's considered valid
  return "";
}

const validateGstNumber = (gstNumber) => {
  // GST number validation logic
  // Add your validation rules here
  // Return an error message if the GST number is invalid, or an empty string if it's valid
  // For example, if GST number should be 15 characters long:
  if (gstNumber.length !== 15) {
    return "GST number must be 15 characters long";
  }

  // Add more validation rules as needed

  // If the input passes all checks, it's considered valid
  return "";
};

const isRequired = (value) => {
  return value !== null && value !== undefined && !isEmptyString(value)
    ? ""
    : "Please provide a value";
};

// Utility function to check if a string is empty
const isEmptyString = (str) => {
  return str.trim() === "";
};

// Export all validation functions in an object
export const validationFunctions = {
  isValidEmail,
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  isEmptyString,
  isRequired,
  validateGstNumber,
};
