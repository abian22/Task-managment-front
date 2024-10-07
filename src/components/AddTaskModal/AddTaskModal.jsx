import { useEffect, useState } from "react";
import { projectMembers } from "../../services/project";
import { createTask } from "../../services/task";
import { Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "./AddTaskModal.css"; // Asegúrate de crear este archivo CSS

const AddTaskModal = ({ isOpen, onClose, projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [members, setMembers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    if (projectId) {
      getProjectMembers();
    }
  }, [projectId,]);

  async function getProjectMembers() {
    try {
      const response = await projectMembers(projectId);
      setMembers(response);
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      complete: false,
      start_task_date: startDate, // Cambiado para coincidir con el formato esperado
      end_task_date: endDate,     // Cambiado para coincidir con el formato esperado
      assigned_users: assignedUsers, // Asegúrate de que esto sea un array de IDs
    };

    try {
      const response = await createTask(newTask, projectId); // Llama a createTask con los datos y projectId
      if (response.status === 201) { // Asume que el status 201 significa éxito
        console.log("Task created successfully:", response.data);
        handleClose(); // Cierra el modal después de guardar
      } else {
        console.error("Failed to create task. Response:", response);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setAssignedUsers([]);
    onClose(); 
  };

  // const handleChangeAssignedUsers = (event) => {
  //   setAssignedUsers(event.target.value); // Establece el valor de assignedUsers como un array de IDs seleccionados
  // };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskTitle">Title:</label>
            <input
              type="text"
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Description:</label>
            <textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="taskStartDate">Start Date:</label>
            <input
              type="date"
              id="taskStartDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskEndDate">End Date:</label>
            <input
              type="date"
              id="taskEndDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <h4>Assign user to task</h4>
            <Grid>
              <Select labelId="simple-select-label" label="Option">
                <MenuItem>none</MenuItem>
                {members.map((user, key) => (
                  <MenuItem value={user.name} key={key}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
