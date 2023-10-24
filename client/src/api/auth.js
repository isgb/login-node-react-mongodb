import axios from "./axios";

axios

// const API = "http://localhost:4000/api"

// export const registerRequest = (user) => axios.post(`${API}/register`, user);

// export const loginRequest = (user) => axios.post(`${API}/login`, user);

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify')