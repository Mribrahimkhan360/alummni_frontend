import React, { useEffect, useState, useCallback } from 'react';
import { ShieldCheck, Plus, Pencil, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import roleService from '../api/roleService';
import permissionService from '../api/permissionService';
import { useAuth } from '../context/AuthContext';
import { notifyMessage, notifyError } from '../utils/notify';
import { ScaleLoader } from 'react-spinners';

export default function Role() {
    const { hasPermission } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (hasPermission('role-list') === false) {
            navigate('/dashboard', { replace: true });
        }
    }, [hasPermission, navigate]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [form, setForm] = useState({ name: '' });
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [rolesRes, permsRes] = await Promise.all([
                roleService.getRoles(),
                permissionService.getPermissions(),
            ]);
            setRoles(rolesRes.data.data || rolesRes.data);
            setPermissions(permsRes.data.data || permsRes.data);
        } catch (err) {
            notifyError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openCreateModal = () => {
        setEditingRole(null);
        setForm({ name: '' });
        setSelectedPermissions([]);
        setShowModal(true);
    };

    const openEditModal = (role) => {
        setEditingRole(role);
        setForm({ name: role.name });
        setSelectedPermissions(role.permissions?.map(p => p.name) || []);
        setShowModal(true);
    };

    const togglePermission = (permName) => {
        setSelectedPermissions(prev =>
            prev.includes(permName)
                ? prev.filter(p => p !== permName)
                : [...prev, permName]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingRole) {
                await roleService.updateRole(editingRole.id, form);
                await roleService.assignPermissions(editingRole.id, selectedPermissions);
                notifyMessage('Role updated successfully');
            } else {
                const res = await roleService.createRole(form);
                if (selectedPermissions.length > 0) {
                    const roleId = res.data.id || res.data.data?.id;
                    await roleService.assignPermissions(roleId, selectedPermissions);
                }
                notifyMessage('Role created successfully');
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            notifyError(err.response?.data?.message || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await roleService.deleteRole(id);
            notifyMessage('Role deleted successfully');
            setShowDeleteConfirm(null);
            fetchData();
        } catch (err) {
            notifyError('Failed to delete role');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Role Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and manage system roles and permissions.</p>
                </div>
                {hasPermission('role-create') && (
                    <button onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
                        <Plus size={16} /> Create Role
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><ScaleLoader color="#0E2A47" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={15} className="text-indigo-600" />
                            <span className="text-sm font-medium text-gray-800">System Roles ({roles.length})</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Role</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Permissions</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {roles.map(role => (
                                    <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3.5 font-medium text-gray-900">{role.name}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions?.slice(0, 5).map(p => (
                                                    <span key={p.id} className="px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded-full">
                                                        {p.name}
                                                    </span>
                                                ))}
                                                {role.permissions?.length > 5 && (
                                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                                                        +{role.permissions.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-end gap-1.5">
                                                {hasPermission('role-edit') && (
                                                    <button onClick={() => openEditModal(role)}
                                                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                                                        <Pencil size={15} />
                                                    </button>
                                                )}
                                                {hasPermission('role-delete') && (
                                                    <button onClick={() => setShowDeleteConfirm(role)}
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
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingRole ? `Edit Role: ${editingRole.name}` : 'Create Role'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                                <input type="text" value={form.name} onChange={e => setForm({ name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-1">
                                    {permissions.map(p => (
                                        <label key={p.id} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 px-2 rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.includes(p.name)}
                                                onChange={() => togglePermission(p.name)}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">{p.name}</span>
                                        </label>
                                    ))}
                                    {permissions.length === 0 && (
                                        <p className="text-sm text-gray-400 text-center py-4">No permissions available</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
                                    {submitting ? 'Saving...' : editingRole ? 'Update Role' : 'Create Role'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Role</h3>
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
