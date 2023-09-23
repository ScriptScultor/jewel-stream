import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Replace with your API's base URL
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
      // If the status code indicates an error, throw an error with the response data
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    // Handle errors
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
