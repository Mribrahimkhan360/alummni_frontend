import api from './api';

const roleService = {
    getRoles: (params = {}) => api.get('/roles', { params }),
    getRole: (id) => api.get(`/roles/${id}`),
    createRole: (data) => api.post('/roles', data),
    updateRole: (id, data) => api.put(`/roles/${id}`, data),
    deleteRole: (id) => api.delete(`/roles/${id}`),
    assignPermissions: (roleId, permissions) => api.post(`/roles/${roleId}/permissions`, { permissions }),
};

export default roleService;
