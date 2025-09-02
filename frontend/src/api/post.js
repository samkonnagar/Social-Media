import axios from "axios";
import { BASE_URL } from "../variables.js";

const API = axios.create({
  baseURL: `${BASE_URL}/post`,
  withCredentials: true,
});

const createPost = (data) => API.post("/", data);

const getFeed = (num = null) => num ? API.get(`?auto=${num}`) : API.get("/");

const getPost = (id) => API.get(`/user/${id}`);


export { createPost, getFeed, getPost };
