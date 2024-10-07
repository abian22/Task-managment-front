import api from "./serviceConfig";

export async function createProject(data) {
  const token = localStorage.getItem("token");
  const response = await api.post("/createProject", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
}

export async function getAllMyProjects() {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get("/getAllMyProjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function getOneProject(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(`/getProject/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function getUserIdByEmail(email) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(`/getUserByEmail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { email },
    });

    if (response.data.status === 200) {
      return response.data.user_id;
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
}

export async function deleteProject(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.delete(`/deleteProject/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting projects:", error);
    throw error;
  }
}

export async function updateProject(id, data) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.put(`/updateProject/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting projects:", error);
    throw error;
  }
}

export async function projectMembers(projectId) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.get(`/project/${projectId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching project members:", error);
    throw error; 
  }
}

export async function addMemberToProject(projectId, member) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      `/addMembersToProject/${projectId}`,
      { members: [member] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching project members:", error);
    throw error; 
  }
}

export async function removeMemberFromProject(projectId, userId) {
  const token = localStorage.getItem("token");

  try {
    const response = await api.delete(
      `/project/${projectId}/member/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing member:", error);
    throw error; // Re-lanza el error para que pueda ser manejado por el llamador
  }
}
