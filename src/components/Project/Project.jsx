import "./Project.css";
import { useEffect, useState } from "react";
import edit from "../../assets/editIcon.svg";
import cancel from "../../assets/cancelIcon.svg";
import addMemberIcon from "../../assets/addMemberIcon.svg";
import AddMemberModal from "../AddMemberModal/AddMemberModal";
import EditProjectModal from "../EditProjectModal/EditProjectModal";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { deleteProject } from "../../services/project";
import { getTasksByProject } from "../../services/task";
import Tasks from "../Tasks/Tasks";
function Project({ title, description, projectId, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    handleGetTasksByProject();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditOpenModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddTaskOpenModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleAddTaskCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await deleteProject(projectId);
        if (onDelete) onDelete(projectId);
        console.log(response);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleGetTasksByProject = async () => {
    const response = await getTasksByProject(projectId);
    setTasks(response);
    console.log("tareas:  " + tasks);
  };

  return (
    <div className="project-container">
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
    
          <img
            src={addMemberIcon}
            alt="Add Member"
            className="add-member-icon"
            onClick={handleOpenModal}
          />
          <img
            src={edit}
            alt="Edit"
            className="cancel-icon"
            onClick={handleEditOpenModal}
          />
          <img
            src={cancel}
            className="cancel-icon"
            onClick={handleDeleteProject}
          />
      </div>
      <p>{description}</p>
      <button className="add-button" onClick={handleAddTaskOpenModal}>
        Add Task
      </button>
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId={projectId}
      />
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={handleEditCloseModal}
        projectId={projectId}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleAddTaskCloseModal}
        projectId={projectId}
      />
      {tasks.map((task) => (
        <Tasks
          key={task.id}
          taskId={task.id}
          title={task.title}
          description={task.description}
          start_task_date={task.start_task_date}
          end_task_date={task.end_task_date}
          getTasks={handleGetTasksByProject}
          complete={task.complete}
          projectId={projectId}
        />
      ))}
    </div>
  );
}

export default Project;
