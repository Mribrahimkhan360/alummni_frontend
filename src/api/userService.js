import api from './api';

const userService = {
    getUsers: (params = {}) => api.get('/users', { params }),
    getUser: (id) => api.get(`/users/${id}`),
    createUser: (data) => api.post('/users', data),
    updateUser: (id, data) => api.post(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`),
    assignRole: (userId, role) => api.post(`/users/${userId}/roles`, { role }),
};

export default userService;
