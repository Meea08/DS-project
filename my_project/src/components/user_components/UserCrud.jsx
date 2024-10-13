import React, { useState } from "react";
// In state definition section, here we use React’s useState
// hook for state management.
// This hook accepts an initial state value and returns an
// array with the current state value and a function for
// updating the state. When the state changes, the component
// re-renders with the new state value.
import api_user from "../../api/axiosUserConfig";
import api_device from "../../api/axiosDeviceConfig";
import UserList from "./UserList";

const UserCrud = ({ load, users }) => {
  /* state definition  */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const token = sessionStorage.getItem("jwtToken")

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  //   The handlers section within our UserCrud component sets up
  //   functions to handle the fetching of our API data and saving,
  //   editing, deleting of our table data, and resetting of our
  //   application’s state.

  /* being handlers */

  async function save(event) {
    event.preventDefault();
  
    // Assuming authToken is the variable holding your authentication token
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    };
  
    try {
      await api_user.post("/user", {
        name: name,
        password: password,
        role: role,
      }, { headers });
  
      alert("User Record Saved");
  
      // reset state
      setId("");
      setName("");
      setPassword("");
      setRole("");
      load();
    } catch (error) {
      // Handle error appropriately
      console.error("Error saving user record:", error);
    }
  }
  

  async function editUser(user) {
    setName(user.name);
    setPassword(user.password);
    setRole(user.role);
    setId(user.id);
    // load();
  }

  async function deleteUser(id) {
    const headers = {
      Authorization: `Bearer ${parseJwt(token)}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    };
  
    try {
      await api_user.delete(`/user/${id}`, { headers });
      await api_device.delete(`/device/user/${id}`, { headers });
  
      alert("User Details Deleted Successfully");
      load();
    } catch (error) {
      // Handle error appropriately
      console.error("Error deleting user details:", error);
    }
  }
  

  async function update(event) {
    // Assuming authToken is the variable holding your authentication token
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Adjust the content type if needed
    };
  
    event.preventDefault();
    if (!id) return alert("User Details Not Found");
  
    try {
      await api_user.patch(`/user/${id}`, {
        name: name,
        password: password,
        role: role,
      }, { headers });
  
      alert("User Details Updated");
  
      // reset state
      setId("");
      setName("");
      setPassword("");
      setRole("");
      load();
    } catch (error) {
      // Handle error appropriately
      console.error("Error updating user details:", error);
    }
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
            <label>Name</label>
            <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group mb-2">
            <label>Password</label>
            <input
                type="text"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="form-group mb-2">
              <label>Role</label>
              <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Administrator</option>
                <option value="client">Client</option>
              </select>
            </div>
          </div>

          <div>
            <button className="btn btn-primary m-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning m-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
        <UserList
            users={users}
            editUser={editUser}
            deleteUser={deleteUser}
        />
      </div>
  );
};

export default UserCrud;