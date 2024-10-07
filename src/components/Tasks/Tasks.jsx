import edit from "../../assets/editIcon.svg";
import cancel from "../../assets/cancelIcon.svg";
import { useEffect, useState } from "react";
import { deleteTask, updateTask, getAssignedUserToTask } from "../../services/task";
import AssignTaskModal from "../AssignTaskModal/AssignTaskModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import "./Tasks.css";

function Tasks({
  title,
  description,
  start_task_date,
  end_task_date,
  taskId,
  getTasks,
  complete,
  projectId,
}) {
  const [status, setStatus] = useState(complete ? "complete" : "pending");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [assignedTaskToUser, setAssignedTaskToUser] = useState([]); 
  useEffect(() => {
    setStatus(complete ? "complete" : "pending");
    handleGetAssignedUserToTask();
  }, [complete]);

  const handleDeleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        getTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const isComplete = newStatus === "complete";
    setStatus(newStatus);

    try {
      await updateTask(taskId, { complete: isComplete ? 1 : 0 });
      getTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleGetAssignedUserToTask = async () => {
    try {
      const response = await getAssignedUserToTask(taskId);

      if (response && response.assigned_users) {
        setAssignedTaskToUser(response.assigned_users); 
      } else {
        setAssignedTaskToUser([]); 
      }
    } catch (error) {
      console.error("Error fetching assigned users:", error);
      setAssignedTaskToUser([]); 
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="task-list">
      <div className="task-item">
        <div className="icon-container">
          <img src={edit} alt="Edit" onClick={handleOpenEditModal} />
          <img src={cancel} alt="Cancel" onClick={handleDeleteTask} />
        </div>
        <div className="task-info">
          <h5>{title}</h5>
          <p>{description}</p>
          <p className="assigned-person">
            Assigned to:{" "}
            {assignedTaskToUser.length > 0
              ? assignedTaskToUser.map((user) => user.name).join(", ")
              : "No one assigned"}
          </p>

          <div className="task-dates">
            <label htmlFor="start-date-1">Start Date: </label>
            <input
              type="date"
              id="start-date-1"
              className="date-input"
              value={start_task_date}
              readOnly
            />
            <label htmlFor="end-date-1">End Date:</label>
            <input
              type="date"
              id="end-date-1"
              className="date-input"
              value={end_task_date}
              readOnly
            />
          </div>

          <select
            className="status-select"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <button className="assign-button" onClick={handleOpenModal}>
          Assign Task To:
        </button>
        <AssignTaskModal
          isOpen={openModal}
          onClose={handleCloseModal}
          taskId={taskId}
          getTasks={getTasks}
          projectId={projectId}
        />

        <EditTaskModal
          isOpen={openEditModal}
          onClose={handleCloseEditModal}
          taskId={taskId}
          getTasks={getTasks}
          projectId={projectId}
        />
      </div>
    </div>
  );
}

export default Tasks;
