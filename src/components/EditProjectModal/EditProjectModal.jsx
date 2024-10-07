import "./EditProjectModal.css";
import {
  updateProject,
  projectMembers,
  getOneProject,
  removeMemberFromProject
} from "../../services/project";
import { useEffect, useState } from "react";

function EditProjectModal({ isOpen, onClose, projectId }) {
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialData, setInitialData] = useState({}); // Estado para los datos originales
  useEffect(() => {
    if (isOpen) {
      fetchProjectData();
      getProjectMembers();
    }
  }, [isOpen, projectId]);

  async function fetchProjectData() {
    try {
      const [projectResponse, membersResponse] = await Promise.all([
        getOneProject(projectId),
        projectMembers(projectId),
      ]);
      console.log(membersResponse);
      const projectDetails = projectResponse.data;
      console.log("Project Details:", projectDetails); // Verifica la estructura

      setInitialData(projectDetails);
      setTitle(projectDetails.title || "");
      setDescription(projectDetails.description || "");
      setStartDate(projectDetails.startDate || "");
      setEndDate(projectDetails.endDate || "");

      // Asegúrate de que estás accediendo correctamente a los miembros
      console.log("Members Response:", membersResponse); // Verifica la estructura
      setMembers(membersResponse.data || membersResponse); // Ajusta según la estructura real
    } catch (error) {
      console.error("Failed to fetch project data:", error);
    }
  }

  async function getProjectMembers() {
    const response = await projectMembers(projectId);
    setMembers(response);
    console.log(members);
  }

  async function handleUpdateProject() {
    try {
      const updatedProject = {
        title: title.trim() || initialData.title,
        description: description.trim() || initialData.description,
        startDate: startDate.trim() || initialData.startDate,
        endDate: endDate.trim() || initialData.endDate,
      };

      const response = await updateProject(projectId, updatedProject);
      console.log("Project updated successfully:", response);

      onClose(); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  }


  async function handleDeleteMember(userId) {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await removeMemberFromProject(projectId, userId);
        setMembers(members.filter(member => member.user_id !== userId));
        onClose(); // Opcional: Cierra el modal después de eliminar el miembro
      } catch (error) {
        console.error("Failed to delete member:", error);
      }
    }
  }

  return isOpen ? (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="edit-modal-dialog">
        <h2>Edit Project</h2>
        <form className="edit-form">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="start">Start Date:</label>
            <input
              type="date"
              id="start"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end">End Date:</label>
            <input
              type="date"
              id="end"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="users">Users:</label>
            <ul className="user-list">
              {members.map((member) => (
                <li key={member.user_id}>
                  <span>{member.name}</span>
                  <select defaultValue={member.rol}>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="project manager">Project Manager</option>
                  </select>
                  <button type="button" onClick={() => handleDeleteMember(member.user_id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-buttons">
            <button
              className="form-button submit"
              type="button"
              onClick={handleUpdateProject}
            >
              Save
            </button>
            <button
              className="form-button cancel"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  ) : null;
}

export default EditProjectModal;
