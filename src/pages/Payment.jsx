import React, { useState } from 'react';
import { CreditCard, Plus, Search, Eye, Edit, Trash2, X, Download } from 'lucide-react';
import { ScaleLoader } from 'react-spinners';

const mockPayments = [
    { id: 1, user_id: 1, amount: 2500.00, payment_date: '2026-06-15', note: 'Alumni reunion contribution', receipt: 'https://placehold.co/200x200/1e40af/ffffff?text=Receipt+1', created_at: '2026-06-15T10:00:00Z' },
    { id: 2, user_id: 1, amount: 500.00, payment_date: '2026-05-20', note: 'Scholarship fund', receipt: null, created_at: '2026-05-20T14:30:00Z' },
    { id: 3, user_id: 1, amount: 1200.00, payment_date: '2026-04-10', note: 'Annual dinner ticket', receipt: 'https://placehold.co/200x200/9333ea/ffffff?text=Receipt+3', created_at: '2026-04-10T09:15:00Z' },
    { id: 4, user_id: 1, amount: 3000.00, payment_date: '2026-03-01', note: 'Building fund donation', receipt: 'https://placehold.co/200x200/059669/ffffff?text=Receipt+4', created_at: '2026-03-01T16:45:00Z' },
    { id: 5, user_id: 1, amount: 750.00, payment_date: '2026-02-14', note: 'Workshop registration', receipt: null, created_at: '2026-02-14T11:20:00Z' },
    { id: 6, user_id: 1, amount: 1800.00, payment_date: '2026-01-25', note: 'Library sponsorship', receipt: 'https://placehold.co/200x200/dc2626/ffffff?text=Receipt+6', created_at: '2026-01-25T08:00:00Z' },
    { id: 7, user_id: 1, amount: 950.00, payment_date: '2025-12-10', note: 'Sports event fee', receipt: null, created_at: '2025-12-10T13:30:00Z' },
    { id: 8, user_id: 1, amount: 4000.00, payment_date: '2025-11-05', note: 'Endowment contribution', receipt: 'https://placehold.co/200x200/2563eb/ffffff?text=Receipt+8', created_at: '2025-11-05T10:00:00Z' },
    { id: 9, user_id: 1, amount: 600.00, payment_date: '2025-10-18', note: 'Seminar participation', receipt: null, created_at: '2025-10-18T15:00:00Z' },
    { id: 10, user_id: 1, amount: 2200.00, payment_date: '2025-09-22', note: 'Alumni meetup sponsorship', receipt: 'https://placehold.co/200x200/7c3aed/ffffff?text=Receipt+10', created_at: '2025-09-22T09:30:00Z' },
];

const PER_PAGE = 5;

export default function Payment() {
    const [payments] = useState(mockPayments);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const [form, setForm] = useState({ amount: '', payment_date: '', note: '', receipt: null });
    const [submitting, setSubmitting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [previewReceipt, setPreviewReceipt] = useState(null);

    const filtered = payments.filter(p =>
        p.note?.toLowerCase().includes(search.toLowerCase()) ||
        String(p.amount).includes(search)
    );

    const total = filtered.length;
    const lastPage = Math.max(1, Math.ceil(total / PER_PAGE));
    const currentPage = Math.min(page, lastPage);
    const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    const today = () => new Date().toISOString().split('T')[0];

    const openCreateModal = () => {
        setEditingPayment(null);
        setForm({ amount: '', payment_date: today(), note: '', receipt: null });
        setShowModal(true);
    };

    const openEditModal = (payment) => {
        setEditingPayment(payment);
        setForm({
            amount: String(payment.amount),
            payment_date: payment.payment_date,
            note: payment.note || '',
            receipt: null,
        });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'receipt') {
            setForm(prev => ({ ...prev, receipt: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setShowModal(false);
        }, 800);
    };

    const handleDelete = () => {
        setShowDeleteConfirm(null);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 }).format(amount);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Payments</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage your payment records.</p>
                </div>
                <button onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
                    <Plus size={16} /> Add Payment
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <CreditCard size={15} className="text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">All Payments ({total})</span>
                    </div>
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search payments..."
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
                ) : paginated.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <CreditCard size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">{search ? 'No payments found' : 'No payments yet'}</p>
                        {!search && (
                            <button onClick={openCreateModal}
                                className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                + Add your first payment
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 w-12">#</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Amount</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Note</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Receipt</th>
                                        <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginated.map((p, idx) => (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">
                                                {(currentPage - 1) * PER_PAGE + idx + 1}
                                            </td>
                                            <td className="px-5 py-3.5 font-medium text-gray-900">
                                                {formatCurrency(p.amount)}
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500">
                                                {formatDate(p.payment_date)}
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500 max-w-[200px] truncate">
                                                {p.note || <span className="text-gray-300 italic">—</span>}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {p.receipt ? (
                                                    <button onClick={() => setPreviewReceipt(p.receipt)}
                                                        className="group relative">
                                                        <img src={p.receipt} alt="receipt"
                                                            className="w-10 h-10 rounded-lg object-cover border border-gray-200 group-hover:ring-2 group-hover:ring-indigo-500 transition" />
                                                        <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition">
                                                            <Eye size={14} className="text-white opacity-0 group-hover:opacity-100 transition" />
                                                        </div>
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-300 italic text-xs">No file</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex justify-end gap-1.5">
                                                    <button onClick={() => openEditModal(p)}
                                                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                                                        <Edit size={15} />
                                                    </button>
                                                    <button onClick={() => setShowDeleteConfirm(p)}
                                                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-500 transition">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500">
                                Page {currentPage} of {lastPage} ({total} total)
                            </p>
                            <div className="flex gap-1.5">
                                <button
                                    disabled={currentPage <= 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 transition">
                                    Previous
                                </button>
                                <button
                                    disabled={currentPage >= lastPage}
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
                                {editingPayment ? 'Edit Payment' : 'Add Payment'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                    <input type="number" name="amount" value={form.amount} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required min="0" step="0.01" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                                    <input type="date" name="payment_date" value={form.payment_date} onChange={handleFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                                <textarea name="note" value={form.note} onChange={handleFormChange} rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    placeholder="Optional note..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Receipt {editingPayment && '(leave empty to keep current)'}
                                </label>
                                <input type="file" name="receipt" onChange={handleFormChange} accept="image/*"
                                    className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
                                    {submitting ? 'Saving...' : editingPayment ? 'Update Payment' : 'Create Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Payment</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete this payment of{' '}
                            <strong>{formatCurrency(showDeleteConfirm.amount)}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                Cancel
                            </button>
                            <button onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {previewReceipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setPreviewReceipt(null)}>
                    <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setPreviewReceipt(null)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition z-10">
                            <X size={16} className="text-gray-600" />
                        </button>
                        <img src={previewReceipt} alt="Receipt preview"
                            className="w-full rounded-xl shadow-2xl" />
                        <a href={previewReceipt} download
                            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition shadow-lg">
                            <Download size={15} /> Download Receipt
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
