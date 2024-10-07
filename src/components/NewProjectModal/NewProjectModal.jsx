import { useState, useEffect } from "react";
import { createProject } from "../../services/project";
import "./NewProjectModal.css";

function NewProjectModal({ dialogRef, onClose, onProjectAdded }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  const handleCloseModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onClose();
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-CA", options).replace(/-/g, "/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const response = await createProject({
      title: projectTitle,
      description: description,
      start_project_date: formattedStartDate,
      end_project_date: formattedEndDate,
    });

    console.log(response);

    setProjectTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    handleCloseModal();

    if (onProjectAdded) onProjectAdded()
  };

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <h2>New Project</h2>
      <form className="formProject" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ProjectTitle">Title:</label>
          <input
            className="inputProject"
            type="text"
            id="ProjectTitle"
            onChange={(e) => setProjectTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            className="textareaProject"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start Date:</label>
          <input
            className="inputProject"
            type="date"
            id="start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="end">End Date:</label>
          <input
            className="inputProject"
            type="date"
            id="end"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="modal-buttons">
          <button className="form-button submit" type="submit">
            Save
          </button>
          <button
            className="form-button cancel"
            type="button"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default NewProjectModal;
