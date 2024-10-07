import { useEffect, useRef, useState } from "react";
import NewProjectModal from "../../components/NewProjectModal/NewProjectModal";
import Project from "../../components/Project/Project";
import { getAllMyProjects } from "../../services/project";

import addMemberIcon from "../../assets/addMemberIcon.svg"
import "./Index.css";
function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef(null);
  const [projects, setProjects] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleGetAllMyProjects()
    handleProjectAdded()
  }, []);

  const handleGetAllMyProjects = async () => {
    const response = await getAllMyProjects();
    const projectsArray = Object.values(response.data.projects);
    console.log(projectsArray)
    setProjects(projectsArray);
   
  };

  const handleProjectDelete = (projectId) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
  };

  const handleProjectAdded = async () => {
    await handleGetAllMyProjects();
    handleCloseModal();
  };


  return (
    <div className="app-container">
      <header>
        <h3>Project Management</h3>
        <button className="add-button" onClick={handleOpenModal}>
          Add Project
        </button>
      
      </header>

      {isModalOpen && (
        <NewProjectModal dialogRef={dialogRef} onClose={handleCloseModal}  onProjectAdded={handleProjectAdded}/>
      )}

      {projects.map((p) => (
        <Project
          key={p.id} 
          projectId={p.id}
          title={p.title}
          description={p.description}
          onDelete={handleProjectDelete}
        />
      ))}
    </div>
  );
}

export default Index;
