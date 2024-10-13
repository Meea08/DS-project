import React, { useState } from "react";
// In state definition section, here we use React’s useState 
// hook for state management. 
// This hook accepts an initial state value and returns an 
// array with the current state value and a function for
// updating the state. When the state changes, the component 
// re-renders with the new state value.
import api_device from "../../api/axiosDeviceConfig";
import DeviceList from "./DeviceList";

const DeviceCrud = ({ load, devices }) => {
  /* state definition  */
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [maxConsumption, setMaxCons] = useState("");
  const [userId, setUserId] = useState("");
  //   The handlers section within our DeviceCrud component sets up 
  //   functions to handle the fetching of our API data and saving, 
  //   editing, deleting of our table data, and resetting of our 
  //   application’s state.

  /* being handlers */

  async function save(event) {
    event.preventDefault();
    await api_device.post("/device", {
      description: description,
      address: address,
      maxConsumption: maxConsumption,
      userId: userId,
    });
    alert("Device Record Saved");
    // reset state
    setId("");
    setDescription("");
    setAddress("");
    setMaxCons("");
    setUserId("");
    load();
  }

  async function editDevice(device) {
    setId(device.id);
    setDescription(device.description);
    setAddress(device.address);
    setMaxCons(device.maxConsumption);
    setUserId(device.userId);
  }

  async function deleteDevice(id) {
    await api_device.delete("/device/" + id);
    alert("Device Details Deleted Successfully");
    load();
  }

  async function update(event) {
    event.preventDefault();
    if (!id) return alert("Device Details Not Found");
    await api_device.patch("/device/" + id, {
      description: description,
      address: address,
      maxConsumption: maxConsumption,
      userId: userId,
    });
    alert("Device Details Updated");
    // reset state
    setId("");
    setDescription("");
    setAddress("");
    setMaxCons("");
    setUserId("");
    load();
  }
  /* end handlers */

  //  our jsx section, gives a clear idea of what the component 
  //  is going to render to the DOM

  // In our components JSX we are making use of bootstrap classes 
  // for styling.
  /* jsx */
  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            hidden
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <label>Max. Consumption</label>
          <input
            type="text"
            className="form-control"
            value={maxConsumption}
            onChange={e => setMaxCons(e.target.value)}
          />

          <label>User id</label>
          <input
            type="text"
            className="form-control"
            value={userId}
            // onButtonClick={e => setUserId(e.target.value)}
            onChange={e => setUserId(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={save}>
            Add new device
          </button>
          <button className="btn btn-warning m-4" onClick={update}>
            Update device
          </button>
        </div>
      </form>
      <DeviceList
        devices={devices}
        editDevice={editDevice}
        deleteDevice={deleteDevice}
      />
    </div>
  );
};

export default DeviceCrud;