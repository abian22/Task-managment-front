import { useState } from "react";
import "./AddMemberModal.css"; // Asegúrate de crear este archivo CSS
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { addMemberToProject, getUserIdByEmail } from "../../services/project";

const AddMemberModal = ({ isOpen, onClose, projectId }) => {
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");

    if (!isOpen) return null;

    const handleMembers = async () => {
        try {
            // Obtener el user_id basado en el email
            const userId = await getUserIdByEmail(email);

            if (!userId) {
                alert("User not found or error occurred");
                return;
            }

            // Crear el objeto de datos que enviarás al backend
            const memberData = {
                user_id: userId,
                rol: rol,
            };

            // Llamar a la función que añade miembros al proyecto
            const response = await addMemberToProject(projectId, memberData);
            console.log(response);

            // Limpiar los campos de entrada después de añadir el miembro
            setEmail("");
            setRol("");
            onClose(); // Opcional: cierra el modal después de guardar

        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    X
                </button>
                <h2>Add members to the project</h2>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoFocus
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h4>Select rol</h4>
                    <Select
                        labelId="simple-select-label"
                        label="Option"
                        value={rol} 
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="project manager">Project Manager</MenuItem>
                        <MenuItem value="member">Member</MenuItem>
                    </Select>
                </Grid>
                <div className="modal-buttons">
                    <button className="form-button submit" type="submit" onClick={handleMembers}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;
