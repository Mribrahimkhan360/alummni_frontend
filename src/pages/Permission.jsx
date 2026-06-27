import React, { useEffect, useState, useCallback } from 'react';
import { KeyRound, Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import permissionService from '../api/permissionService';
import { useAuth } from '../context/AuthContext';
import { notifyMessage, notifyError } from '../utils/notify';
import { ScaleLoader } from 'react-spinners';

export default function Permission() {
    const { hasPermission } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (hasPermission('permission-list') === false) {
            navigate('/dashboard', { replace: true });
        }
    }, [hasPermission, navigate]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingPermission, setEditingPermission] = useState(null);
    const [form, setForm] = useState({ name: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchPermissions = useCallback(async () => {
        setLoading(true);
        try {
            const res = await permissionService.getPermissions();
            setPermissions(res.data.data || res.data);
        } catch (err) {
            notifyError('Failed to fetch permissions');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const filtered = permissions.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const openCreateModal = () => {
        setEditingPermission(null);
        setForm({ name: '' });
        setShowModal(true);
    };

    const openEditModal = (perm) => {
        setEditingPermission(perm);
        setForm({ name: perm.name });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingPermission) {
                await permissionService.updatePermission(editingPermission.id, form);
                notifyMessage('Permission updated successfully');
            } else {
                await permissionService.createPermission(form);
                notifyMessage('Permission created successfully');
            }
            setShowModal(false);
            fetchPermissions();
        } catch (err) {
            notifyError(err.response?.data?.message || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await permissionService.deletePermission(id);
            notifyMessage('Permission deleted successfully');
            setShowDeleteConfirm(null);
            fetchPermissions();
        } catch (err) {
            notifyError('Failed to delete permission');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Permissions</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage system-level permissions.</p>
                </div>
                {hasPermission('permission-create') && (
                    <button onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
                        <Plus size={16} /> Add Permission
                    </button>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
                    <div className="flex items-center gap-2">
                        <KeyRound size={15} className="text-indigo-600" />
                        <span className="text-sm font-medium text-gray-800">All Permissions ({permissions.length})</span>
                    </div>
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search permission..." value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><ScaleLoader color="#0E2A47" /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 w-16">#</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Permission Name</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Guard</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{p.id}</td>
                                        <td className="px-5 py-3.5 font-medium text-gray-900">{p.name}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                                                {p.guard_name || 'web'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-end gap-1.5">
                                                {hasPermission('permission-edit') && (
                                                    <button onClick={() => openEditModal(p)}
                                                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                                                        <Pencil size={15} />
                                                    </button>
                                                )}
                                                {hasPermission('permission-delete') && (
                                                    <button onClick={() => setShowDeleteConfirm(p)}
                                                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-red-50 text-red-500 transition">
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
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            {editingPermission ? 'Edit Permission' : 'Create Permission'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name</label>
                                <input type="text" value={form.name} onChange={e => setForm({ name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                                <button type="submit" disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
                                    {submitting ? 'Saving...' : editingPermission ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Permission</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                            <button onClick={() => handleDelete(showDeleteConfirm.id)}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
