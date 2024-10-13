import React from "react";
import { useNavigate } from "react-router-dom";

const Client = ({ devices }) => {
    const navigate = useNavigate();

    const handleStartSimulation = (deviceId) => {
        // Add logic to handle the start simulation button click for the specified device
        console.log(`Start simulation for device with ID ${deviceId}`);
    };

    const handleViewAllAdmins = () => {
        // Navigate to the "/allAdmins" route
        navigate("/allAdmins");
    };

    return (
        <div>
            <h1>Welcome to the Client Page</h1>
            <button
                type="button"
                className="btn btn-success"
                onClick={handleViewAllAdmins}
            >
                View All Admins
            </button>

            <table className="table table-hover mt-3" align="center">
                <thead className="thead-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Address</th>
                    <th scope="col">Max. consumption</th>
                    <th scope="col">Actions</th> {/* New column for buttons */}
                </tr>
                </thead>
                <tbody>
                {Array.isArray(devices) ? (
                    devices.map((device) => (
                        <tr key={device.id}>
                            <th scope="row">{device.id}</th>
                            <td>{device.description}</td>
                            <td>{device.address}</td>
                            <td>{device.maxConsumption}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleStartSimulation(device.id)}
                                >
                                    Start Simulation
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No devices found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Client;
