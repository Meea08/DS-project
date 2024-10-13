import React from "react";

// In the DeviceList component, we are 
// destructuring the passed props and using Bootstrap 
// classes to display a table with the list of all 
// saved devices.
const DeviceList = ({ devices, editDevice, deleteDevice }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Description</th>
          <th scope="col">Address</th>
          <th scope="col">Max. consumption</th>
          <th scope="col">User ID</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      {devices.map((device, index) => {
        return (
          <tbody key={device.id}>
            <tr>
              <th scope="row">{device.id} </th>
              <td>{device.description}</td>
              <td>{device.address}</td>
              <td>{device.maxConsumption}</td>
              <td>{device.userId}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editDevice(device)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteDevice(device.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  //onClick={() => startSimulation(device.id)}
                >
                  Start simulation
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default DeviceList;