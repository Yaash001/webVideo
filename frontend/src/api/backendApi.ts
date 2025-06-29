import axios from "axios";
const backendApi = axios.create({baseURL:"http://localhost:8080",})
export default backendApi;