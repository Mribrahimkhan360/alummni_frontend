import api from './api';

const permissionService = {
    getPermissions: (params = {}) => api.get('/permissions', { params }),
    getPermission: (id) => api.get(`/permissions/${id}`),
    createPermission: (data) => api.post('/permissions', data),
    updatePermission: (id, data) => api.put(`/permissions/${id}`, data),
    deletePermission: (id) => api.delete(`/permissions/${id}`),
};

export default permissionService;
