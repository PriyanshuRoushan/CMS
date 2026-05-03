import API from "./api";

export const createUser = (userData) => API.post("/users/create", userData);
export const getUsers = () => API.get("/users");
export const getLoggedInUser = () => API.get("/users/me");
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const activateDeactivateUser = (id, userData) => API.put(`/users/${id}/status`, userData);
export const resetUserPassword = (id, userData) => API.put(`/users/${id}/reset-password`, userData);
export const changePassword = (userData) => API.put("/users/change-password", userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const searchUsers = (search) => API.get(`/users/search?search=${search}`);
export const handlePagination = (pagination) => API.get(`/users/pagination?page=${pagination.page}&limit=${pagination.limit}`);
export const getUserState = () => API.get("/users/state");
export const restoreUser = (id) => API.put(`/users/${id}/restore`);
