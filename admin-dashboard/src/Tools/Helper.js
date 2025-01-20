import axios from "axios";

// Helper function to get the token from localStorage
const token = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token ? `Bearer ${user.token}` : "";
};

export const Helper = {
  // GET request
  Get: async ({ url, hasToken = false, data = null }) => {
    try {
      const config = {
        headers: {},
        params: data || {},
      };

      if (hasToken) {
        config.headers.Authorization = token();
      }

      const response = await axios.get(url, config);

      return {
        message: response.data.message || "Success",
        response: response.data,
      };
    } catch (err) {
      console.error("GET Error:", err);
      return {
        message: err.response?.data?.message || err.message,
        response: null,
      };
    }
  },

  // GET request with AbortController
  Get_Abort: async ({ url, hasToken = false, data = null, signal }) => {
    try {
      const config = {
        headers: {},
        params: data || {},
        signal,
      };

      if (hasToken) {
        config.headers.Authorization = token();
      }

      const response = await axios.get(url, config);

      return {
        message: response.data.message || "Success",
        response: response.data,
      };
    } catch (err) {
      console.error("GET_Abort Error:", err);
      return {
        message: err.response?.data?.message || err.message,
        response: null,
      };
    }
  },

  // POST request
  Post: async ({ url, hasToken = false, data = null }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      if (hasToken) {
        config.headers.Authorization = token();
      }

      console.log("Request URL:", url); // Log the URL being requested
      const response = await axios.post(url, data, config);

      return {
        message: response.data.message || "Success",
        response: response.data,
      };
    } catch (err) {
      console.error("POST Error:", err);
      return {
        message: err.response?.data?.message || err.message,
        response: null,
      };
    }
  },

  // PUT request
  Put: async ({ url, hasToken = false, data = null }) => {
    try {
      const config = {
        headers: {},
      };

      if (hasToken) {
        config.headers.Authorization = token();
      }

      const response = await axios.put(url, data, config);

      return {
        message: response.data.message || "Success",
        response: response.data,
      };
    } catch (err) {
      console.error("PUT Error:", err);
      return {
        message: err.response?.data?.message || err.message,
        response: null,
      };
    }
  },

  // PATCH request
  Patch: async ({ url, hasToken = false, data = null }) => {
    try {
      const config = {
        headers: {},
      };

      if (hasToken) {
        config.headers.Authorization = token();
      }

      const response = await axios.patch(url, data, config);

      return {
        message: response.data.message || "Success",
        response: response.data,
      };
    } catch (err) {
      console.error("PATCH Error:", err);
      return {
        message: err.response?.data?.message || err.message,
        response: null,
      };
    }
  },

  // DELETE request
  Delete: async ({ url, hasToken = false, data = null }) => {
    try {
      const config = {
        headers: {},
        data: data || {},
      };

      if (hasToken) {
        config.headers.Authorization = token();
      }

      const response = await axios.delete(url, config);

      return {
        message: response.data.message || "Success",
        response: response.data,
      };
    } catch (err) {
      console.error("DELETE Error:", err);
      return {
        message: err.response?.data?.message || err.message,
        response: null,
      };
    }
  },
};