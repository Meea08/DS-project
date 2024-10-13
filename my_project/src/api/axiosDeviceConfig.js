// This is where our application will make all API calls.

// In the axiosConfig.js file we will create a connection 
// to our SpringBoot endpoints.

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8082",
});