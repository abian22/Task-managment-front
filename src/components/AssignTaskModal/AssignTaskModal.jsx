import { useEffect, useState } from 'react';
import { projectMembers } from "../../services/project";
import { assignUserToTask } from "../../services/task";
import "./AssignTaskModal.css";

const AssignTaskModal = ({ isOpen, onClose, taskId, projectId }) => {
  const [members, setMembers] = useState([]);
  const [assignedUser, setAssignedUser] = useState(""); // Inicialmente una cadena vacía

  useEffect(() => {
    if (projectId) {
      fetchProjectMembers();
    }
  }, [projectId]);

  const fetchProjectMembers = async () => {
    try {
      const response = await projectMembers(projectId);
      setMembers(response);
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  };

  const handleAssignUser = (event) => {
    setAssignedUser(event.target.value); 
  };

  const handleSubmit = async () => {
    
      try {
        await assignUserToTask(taskId, assignedUser);
        console.log("User assigned successfully.");
        handleClose();
      } catch (error) {
        console.error("Error assigning user to task:", error);
      }
   
  };

  const handleClose = () => {
    setAssignedUser(""); // Restablece a un valor vacío
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Assign Task</h2>
        <div className="modal-content">
          <label htmlFor="user-select">Select User</label>
          <select
            id="user-select"
            value={assignedUser}
            onChange={handleAssignUser}
          >
            {members.map((user) => (
              <option key={user.id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit} className="modal-button submit">
            Save
          </button>
          <button onClick={handleClose} className="modal-button cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskModal;
