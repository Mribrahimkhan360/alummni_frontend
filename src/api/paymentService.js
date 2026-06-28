// src/services/paymentService.js
import api from "./api";

export const getPayments = (page = 1, search = "") => {
    return api.get(`/payments?page=${page}&search=${search}`);
};

export const createPayment = (formData) => {
    return api.post("/payments", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updatePayment = (id, formData) => {
    return api.post(`/payments/${id}?_method=PUT`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deletePayment = (id) => {
    return api.delete(`/payments/${id}`);
};

export const approvePayment = (id) => {
    return api.patch(`/payments/${id}/approve`);
};

export const rejectPayment = (id) => {
    return api.patch(`/payments/${id}/reject`);
};