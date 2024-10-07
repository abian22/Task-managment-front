import { useEffect, useState } from "react";
import { projectMembers } from "../../services/project"; // Asegúrate de que este sea el nombre correcto para tu servicio de proyecto
import { updateTask, unassignUserFromTask } from "../../services/task";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import "./EditTaskModal.css";

const EditTaskModal = ({ isOpen, onClose, projectId, taskId, getTasks }) => {
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (projectId) {
      getProjectMembers();
    }
  }, [projectId]);

  const getProjectMembers = async () => {
    try {
      const response = await projectMembers(projectId);
      setMembers(response);
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  };

  const handleSubmit = async () => {
    if (!taskId) {
      console.error("Task ID is not valid:", taskId);
      return;
    }

    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0]; // Convertir a 'YYYY-MM-DD'
    };

    const updatedTask = {
      title,
      description,
      start_task_date: formatDate(startDate),
      end_task_date: formatDate(endDate),
    };

    // Log de los datos enviados
    console.log(
      "Datos que se envían al servidor:",
      JSON.stringify(updatedTask)
    );

    try {
      const response = await updateTask(taskId, updatedTask);
      console.log("Respuesta del servidor:", response);

      if (response.status === 200) {
        handleClose();
      } else {
        console.error("Failed to update task. Response:", response);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      // Imprimir más detalles del error si existen
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  const handleUnassignUser = async (userId) => {
    try {
      const response = await unassignUserFromTask(taskId, userId);
      console.log("User unassigned successfully:", response);
      setMembers(members.filter(member => member.user_id !== userId));
    } catch (error) {
      console.error("Error unassigning user from task:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          fullWidth
          id="taskTitle"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="taskDescription"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="taskStartDate"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="taskEndDate"
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <label htmlFor="users" style={{ marginLeft: "40px" }}>Assigned task to user:</label>
      <ul className="user-list" style={{ marginLeft: "40px" }}>
        {members.map((member) => (
          <li key={member.user_id}>
            <span>{member.name}</span>
            <button type="button" onClick={() => handleUnassignUser(member.user_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="modal-buttons" style={{ padding: "10px" }}>
        <button
          className="form-button submit"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className="form-button cancel"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
};

export default EditTaskModal;
