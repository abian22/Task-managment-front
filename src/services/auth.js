import api from './serviceConfig'

export async function login(loginData) {
  const response = await api.post('/login', loginData)
  return response
}

export async function signUp(signUpData) {
  const response = await api.post('/register', signUpData)
  return response
}
//Incluye el token en la solicitud
export function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function resendVerification() {
  console.log('Token:', localStorage.getItem('token'))
  const response = await api.post("/resend-verification")
  return response
}

export async function logout() {
  localStorage.removeItem('token')
}