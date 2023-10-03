import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API's base URL
  validateStatus: (status) => {
    return status >= 200 && status < 500; // Handle 400 errors in the catch block
  },
});

// Utility function to make an API request with optional authentication token
const makeApiRequest = async ({ method, url, data = {} }) => {
  try {
    // Retrieve the authentication token from localStorage
    const authToken = localStorage.getItem("authToken");

    // Define headers with optional Authorization header
    const headers = {};
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    // Configure the request
    const config = { method, url, headers };

    // Include data for POST, PUT, PATCH requests
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      config.data = data;
    } else {
      config.params = data; // Use 'params' for GET, DELETE, etc.
    }

    // Make the request using axiosInstance
    const response = await axiosInstance(config);

    // Check if the response status code indicates success (e.g., 200-299)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      let message = `HTTP Error: ${response.status}`;
      if (response.data) {
        if (typeof response.data.error === "string") {
          // If response.data.error is a string, use it as the error message
          message = response.data.error;
        } else if (typeof response.data.error === "object") {
          // If response.data.error is an object, stringify it and use it as the error message
          message = JSON.stringify(response.data.error) || "OOPS! Something went wrong.";
        }
      }

      // Throw an error with a custom message
      throw new Error(message);
    }
  } catch (error) {
    // Handle errors, including HTTP errors
    throw error;
  }
};

// Supported HTTP methods
export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

// Export the utility function and axios instance
export { makeApiRequest, axiosInstance };
