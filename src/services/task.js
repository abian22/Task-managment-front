import api from "./serviceConfig";

export async function createTask(data, id) {
  const token = localStorage.getItem("token");
  const response = await api.post(`/createTask/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
}

export async function getTasksByProject(id) {
  const token = localStorage.getItem("token");
  const response = await api.get(`/getTasksByProject/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.tasks;
}

export async function deleteTask(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.delete(`/deleteTask/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

export async function updateTask(taskId, data) {
  const token = localStorage.getItem("token");

  try {
    const response = await api.put(`/updateTask/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}


export async function assignUserToTask(taskId, userId) {
  const token = localStorage.getItem("token");

  try {
    const response = await api.post(
      `/tasks/${taskId}/assignUser`,
      { user_id: userId }, // Asegúrate de que el cuerpo es un objeto JSON
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Asegúrate de que este encabezado esté presente
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error details:", error.response.data);
      throw new Error(`Error: ${error.response.data.message}`);
    } else {
      console.error("Network or other error:", error.message);
      throw error;
    }
  }
}

export async function getAssignedUserToTask(taskId) {
  const token = localStorage.getItem("token");
  const response = await api.get(`tasks/${taskId}/assignedUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;

}


export async function unassignUserFromTask(taskId, userId) {
  const token = localStorage.getItem("token");

  try {
    const response = await api.delete(`tasks/${taskId}/unassign`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: userId 
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error unassigning user from task:", error);
    throw error;
  }
}
