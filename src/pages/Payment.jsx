import React, { useState, useEffect } from 'react';
import {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment,
    approvePayment,
    rejectPayment
} from '../api/paymentService';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [editingPayment, setEditingPayment] = useState(null);

    const [form, setForm] = useState({
        amount: "",
        payment_date: "",
        note: "",
        receipt: null,
    });

    const { hasPermission, hasRole } = useAuth();
    const isSuperAdmin = hasRole('Super Admin');

    const loadPayments = async (page = 1, searchTerm = "") => {
        try {
            const res = await getPayments(page, searchTerm);
            setPayments(res.data.data);
            setCurrentPage(res.data.current_page);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error("Error loading payments:", err);
        }
    };

    useEffect(() => {
        loadPayments(currentPage, search);
    }, [currentPage, search]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "receipt") {
            setForm({ ...form, receipt: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const openCreateModal = () => {
        setEditingPayment(null);
        setForm({ amount: "", payment_date: "", note: "", receipt: null });
        setShowModal(true);
    };

    const openEditModal = (payment) => {
        if (payment.status !== 'pending') return;
        setEditingPayment(payment);
        setForm({
            amount: payment.amount,
            payment_date: payment.payment_date,
            note: payment.note || "",
            receipt: null,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("amount", form.amount);
        formData.append("payment_date", form.payment_date);
        formData.append("note", form.note || "");

        if (form.receipt) {
            formData.append("receipt", form.receipt);
        }

        try {
            if (editingPayment) {
                await updatePayment(editingPayment.id, formData);
            } else {
                await createPayment(formData);
            }

            loadPayments(currentPage, search);
            setShowModal(false);
            setForm({ amount: "", payment_date: "", note: "", receipt: null });
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Something went wrong! Check console.");
        }
    };

    const handleDelete = async () => {
        try {
            await deletePayment(showDeleteConfirm.id);
            loadPayments(currentPage, search);
            setShowDeleteConfirm(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approvePayment(id);
            loadPayments(currentPage, search);
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to approve payment';
            console.error(msg, err);
            alert(msg);
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectPayment(id);
            loadPayments(currentPage, search);
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to reject payment';
            console.error(msg, err);
            alert(msg);
        }
    };

    const statusBadge = (status) => {
        const classes = {
            approved: 'bg-green-100 text-green-700',
            rejected: 'bg-red-100 text-red-700',
            pending: 'bg-yellow-100 text-yellow-700',
        };
        return `px-3 py-1 rounded-full text-sm font-medium ${classes[status] || 'bg-gray-100 text-gray-700'}`;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Payments</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add New Payment
                </button>
            </div>

            <input
                type="text"
                placeholder="Search payments..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="w-full md:w-96 p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left">Date</th>
                            <th className="px-6 py-4 text-left">Amount</th>
                            <th className="px-6 py-4 text-left">Note</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Receipt</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No payments found
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{payment.payment_date}</td>
                                    <td className="px-6 py-4 font-semibold">
                                        ৳ {parseFloat(payment.amount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{payment.note}</td>
                                    <td className="px-6 py-4">
                                        <span className={statusBadge(payment.status)}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {payment.receipt && (
                                            <img
                                                src={`${api.defaults.baseURL.replace('/api', '')}/storage/${payment.receipt}`}
                                                alt="receipt"
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        {isSuperAdmin && payment.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(payment.id)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(payment.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {payment.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => openEditModal(payment)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setShowDeleteConfirm(payment)}
                                                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                    Page {currentPage} of {lastPage}
                </p>
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === lastPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingPayment ? "Edit Payment" : "Add New Payment"}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Amount (৳)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={form.amount}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Payment Date</label>
                                    <input
                                        type="date"
                                        name="payment_date"
                                        value={form.payment_date}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Note</label>
                                    <textarea
                                        name="note"
                                        value={form.note}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Receipt Image</label>
                                    <input
                                        type="file"
                                        name="receipt"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 border rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    {editingPayment ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this payment?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="flex-1 py-3 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;