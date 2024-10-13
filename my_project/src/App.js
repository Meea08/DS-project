import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './pages/login/LoginForm';
import Admin from './pages/admin/Admin';
import Client from './pages/client/Client';
import AllAdmins from './pages/client/AllAdmins'; // Import the AllAdmins component
import WebSocket from './components/websocket_components/WebSocket';

function App() {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

    const callback = (dataFromChild) => {
        setDevices(dataFromChild);
    };
    const navigateTo = async (route) => {
        if (route === "admin") {
            // try {
            //     // Fetch the user's role based on the JWT token
            //     // const jwtToken = sessionStorage.getItem("jwtToken");
            //     // console.log(sessionStorage.getItem("jwtToken"));

            //     // if (!jwtToken) {
            //     //     alert("JWT token is missing. Please log in.");
            //     //     return;
            //     // }

            //     // const getRoleResponse = await api_user.post("http://localhost:8080/user/getRole",{token: jwtToken} );

            //     if (getRoleResponse.status === 200 && getRoleResponse.data) {
            //         const userRole = getRoleResponse.data;

            //         if (userRole === "admin") {
            //             navigate("/admin");
            //         } else {
            //             alert("You do not have permission to access this page.");
            //         }
            //     } else {
            //         alert("Unable to determine user role.");
            //     }
            // } catch (error) {
            //     console.error("Error fetching user role: ", error);
            //     alert("An error occurred while checking user role.");
            // }
            navigate("/admin")
        } else if (route === "client") {
            navigate("/client");
        } else if (route === "allAdmins") {
            navigate("/allAdmins");
        } else if (route === "websocket") {
            navigate("/websocket");
        }
    };


    return (
        <div>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/client" element={<Client devices={devices} />} />
                <Route path="/allAdmins" element={<AllAdmins />} /> {/* Route for AllAdmins component */}
                <Route path="/websocket" element={<WebSocket />} />
                <Route path="/" element={<LoginForm pull_data={callback} navigateTo={navigateTo} />} />
            </Routes>
        </div>
    );
}

export default App;
