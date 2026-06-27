import api from './api';

const authService = {
    login: (email, password) => api.post('/login', { email, password }),
    register: (formData) => api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    logout: () => api.post('/logout'),
    getUser: () => api.get('/user'),
};

export default authService;
