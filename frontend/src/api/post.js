import axios from "axios";
import { BASE_URL } from "../variables.js";

const API = axios.create({
  baseURL: `${BASE_URL}/post`,
  withCredentials: true,
});

const createPost = (data) => API.post("/", data);

const getFeed = (num = null) => (num ? API.get(`?auto=${num}`) : API.get("/"));

const getPostDetails = (postId) => API.get(`/${postId}`);

const updatePost = (postId, data) => API.put(`/${postId}`, data);

const deletePost = (postId) => API.delete(`/${postId}`);

const getPost = (id) => API.get(`/user/${id}`);

const likePost = (postId) => API.post(`/${postId}/like`);

const unlikePost = (postId) => API.post(`/${postId}/unlike`);

const addComment = (postId, data) => API.post(`/${postId}/comment`, data);

const updateComment = (commentId, data) =>
  API.put(`/${commentId}/comment`, data);

const deleteComment = (commentId) => API.delete(`/${commentId}/comment`);

const savePost = (postId) => API.post(`/${postId}/save`);

const unsavePost = (postId) => API.post(`/${postId}/unsave`);

const getSavedPosts = () => API.get("/saved");

const sharePost = (postId) => API.post(`/${postId}/share`);

export {
  createPost,
  getFeed,
  getPost,
  getPostDetails,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  updateComment,
  deleteComment,
  savePost,
  unsavePost,
  getSavedPosts,
  sharePost,
};
