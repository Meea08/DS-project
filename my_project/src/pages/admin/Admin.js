import "bootstrap/dist/css/bootstrap.css";
import api_user from "../../api/axiosUserConfig";
import api_device from "../../api/axiosDeviceConfig";
// The useEffect hook here is used to run side effects 
// in our App.js. These side effects include operations 
// that change the state of the application, such as 
// fetching data from an API, updating the DOM, setting 
// up event listeners, and more.
import React, { useEffect, useState } from "react";
import "../../../src/App"
import UserCrud from "../../components/user_components/UserCrud";
import DeviceCrud from "../../components/device_components/DeviceCrud";

// the App.js file is the root component of our 
// application, and it is responsible for rendering 
// and displaying all other components in the 
// application.
function Admin() {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const token = sessionStorage.getItem("jwtToken")

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  /* manage side effects */
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    
    // Assuming authToken is the variable holding your authentication token
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    };
    
    console.log(parseJwt(token))

    try {
      const result = await api_user.get("/user", { headers });
      setUsers(result.data);
  
      const result_device = await api_device.get("/device", { headers });
      setDevices(result_device.data);
    } catch (error) {
      // Handle error appropriately
      console.error("Error loading data:", error);
    }
  }
  

  return (
    <div>
      <h1 className="text-center">List Of Users</h1>
      <UserCrud load={load} users={users} />
      <h1 className="text-center">List Of Devices</h1>
      <DeviceCrud load={load} devices={devices} />
    </div>

  );
}

export default Admin;