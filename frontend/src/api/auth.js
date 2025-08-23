import axios from "axios";
import { BASE_URL } from "../variables.js";

const API = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

const userSignUp = (data) => API.post("/register", data);

const userSignIn = (data) => API.post("/login", data);

const getUserDetails = (userId = null) =>
  userId ? API.get(`/me?id=${userId}`) : API.get("/me");

const getUpdateUser = (data) => API.put("/profile", data);

export { userSignUp, userSignIn, getUserDetails, getUpdateUser };
