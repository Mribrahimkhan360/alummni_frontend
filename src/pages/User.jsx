import React, { useEffect, useState, useCallback } from 'react';
import { Eye, Edit, Trash2, Users, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import userService from '../api/userService';
import { useAuth } from '../context/AuthContext';
import { notifyMessage, notifyError } from '../utils/notify';
import { ScaleLoader } from 'react-spinners';

export default function User() {
    const { hasPermission } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (hasPermission('user-list') === false) {
            navigate('/dashboard', { replace: true });
        }
    }, [hasPermission, navigate]);
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form, setForm] = useState({
        name: '', email: '', password: '', student_id: '',
        passing_year: '', department: '', gender: '', image: null,
    });
    const [submitting, setSubmitting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page, per_page: 10 };
            if (search) params.search = search;
            const res = await userService.getUsers(params);
            setUsers(res.data.data);
            setMeta(res.data.meta);
        } catch (err) {
            notifyError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const openCreateModal = () => {
        setEditingUser(null);
        setForm({ name: '', email: '', password: '', student_id: '', passing_year: '', department: '', gender: '', image: null });
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setForm({
            name: user.name,
            email: user.email,
            student_id: user.student_id,
            passing_year: user.passing_year,
            department: user.department,
            gender: user.gender,
            password: '',
            image: null,
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm(prev => ({ ...prev, image: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (key === 'password' && !value) return;
                if (value !== null && value !== '') {
                    payload.append(key, value);
                }
            });

            if (editingUser) {
                payload.append('_method', 'PUT');
                await userService.updateUser(editingUser.id, payload);
                notifyMessage('User updated successfully');
            } else {
                await userService.createUser(payload);
                notifyMessage('User created successfully');
            }
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            const msg = err.response?.data?.message || 'Operation failed';
            notifyError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);
            notifyMessage('User deleted successfully');
            setShowDeleteConfirm(null);
            fetchUsers();
        } catch (err) {
            notifyError('Failed to delete user');
        }
    };

    const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration'];

    const avatarColors = ['bg-indigo-600', 'bg-violet-500', 'bg-cyan-600', 'bg-emerald-600', 'bg-rose-600'];

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage accounts and access.</p>
                </div>
                {hasPermission('user-create') && (
                    <button onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
                        <Plus size={16} /> Add User
                    </button>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <Users size={15} className="text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">All Users ({meta.total})</span>
                    </div>
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search user..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <ScaleLoader color="#0E2A47" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <Users size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No users found</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">User</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Email</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Student ID</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Department</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Year</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Role</th>
                                        <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((u, idx) => (
                                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${avatarColors[idx % avatarColors.length]} text-white text-sm font-medium flex items-center justify-center`}>
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500">{u.email}</td>
                                            <td className="px-5 py-3.5 text-gray-500">{u.student_id}</td>
                                            <td className="px-5 py-3.5 text-gray-500">{u.department}</td>
                                            <td className="px-5 py-3.5 text-gray-500">{u.passing_year}</td>
                                            <td className="px-5 py-3.5">
                                                {u.roles?.map(role => (
                                                    <span key={role.id} className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full mr-1">
                                                        {role.name}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex justify-end gap-1.5">
                                                    {hasPermission('user-list') && (
                                                        <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                                                            <Eye size={15} />
                                                        </button>
                                                    )}
                                                    {hasPermission('user-edit') && (
                                                        <button onClick={() => openEditModal(u)}
                                                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                                                            <Edit size={15} />
                                                        </button>
                                                    )}
                                                    {hasPermission('user-delete') && (
                                                        <button onClick={() => setShowDeleteConfirm(u)}
                                                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-500 transition">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500">
                                Page {meta.current_page} of {meta.last_page} ({meta.total} total)
                            </p>
                            <div className="flex gap-1.5">
                                <button
                                    disabled={meta.current_page <= 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 transition">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg">
                                    {meta.current_page}
                                </button>
                                <button
                                    disabled={meta.current_page >= meta.last_page}
                                    onClick={() => setPage(p => p + 1)}
                                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 transition">
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingUser ? 'Edit User' : 'Create User'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" name="name" value={form.name} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                                    <input type="text" name="student_id" value={form.student_id} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year</label>
                                    <input type="number" name="passing_year" value={form.passing_year} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select name="department" value={form.department} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required>
                                        <option value="">Select</option>
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select name="gender" value={form.gender} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required>
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                <input type="file" name="image" onChange={handleFormChange}
                                    className="w-full text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password {editingUser && '(leave empty to keep current)'}
                                </label>
                                <input type="password" name="password" value={form.password} onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required={!editingUser} minLength={8} />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
                                    {submitting ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(showDeleteConfirm.id)}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
