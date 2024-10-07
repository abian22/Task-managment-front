import api from './serviceConfig';

export async function resetPassword(data) {
    try {
        const response = await api.post('/password/reset',{
            headers: {
                'Content-Type': 'application/json'
            },
            data: data // Enviando el cuerpo de la solicitud con Axios
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`¡Error HTTP! estado: ${error.response.status}`);
        } else {
            throw new Error(`Ocurrió un error inesperado: ${error.message}`);
        }
    }
}

export async function getProfile() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,  // Asegúrate de que el formato es correcto
        },
      });
  
      return response.data.data;
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      throw error;
    }
  }

