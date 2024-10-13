import React, { useState, useEffect } from 'react';
import api_user from "../../api/axiosUserConfig";
import api_device from "../../api/axiosDeviceConfig";

function LoginForm({ pull_data, navigateTo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    console.log(devices); // Log devices whenever it changes
  }, [devices]); // Add devices as a dependency to the useEffect

  async function getUSerDevices(userId) {
    try {
      const result_device = await api_device.get("/device/user/" + userId);
      setDevices(result_device.data);
    } catch (error) {
      console.error("Error fetching user devices: ", error);
      setDevices([]);
    }
  }

  const handleLogin = async () => {
    try {
      const response = await api_user.post("http://localhost:8080/user/login", {
        username: username,
        password: password
      });

      if (response.status === 200 && response.data) {

        console.log(response.data);

        // After successful login, make a request to /user/authenticate to get the JWT token
        const authenticateResponse = await api_user.post("auth/1/authenticate", {
          username: username, // Use 'username' here as per your backend endpoint
          password: password
        });

        if (authenticateResponse.status === 200 && authenticateResponse.data) {
          // Set the JWT token in state and local storage
         // console.log(authenticateResponse.data);
          // const jwtToken1 = authenticateResponse.data;
          sessionStorage.setItem("jwtToken", authenticateResponse.data);
          //sessionStorage.getItem("jwtToekn")
          console.log(authenticateResponse.data);
        }

        getUSerDevices(response.data.id);
        pull_data(response.data);
        sessionStorage.setItem("userId", response.data.id);
        console.log("Stored User ID:", sessionStorage.getItem("userId"));
        navigateTo(response.data.role);
      }
    } catch (error) {
      console.error("Login failed: ", error);
      alert("Invalid credentials");
    }
  };

  return (
      <div>
        <h1>Login</h1>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
  );
}

export default LoginForm;
