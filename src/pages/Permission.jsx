import React from "react";
import { KeyRound } from "lucide-react";

const permissions = [
  { id: 1, name: "View users", guard: "web" },
  { id: 2, name: "Create users", guard: "web" },
  { id: 3, name: "Edit users", guard: "web" },
  { id: 4, name: "Delete users", guard: "web" },
];

export default function Permission() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage system-level permissions.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
          + Add permission
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <KeyRound size={15} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-800">
              All permissions
            </span>
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search permission..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-52"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 w-16">
                  #
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Permission name
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Guard
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissions.map((permission) => (
                <tr
                  key={permission.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 text-gray-400 text-xs">
                    {permission.id}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {permission.name}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      {permission.guard}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <button className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing 1 to {permissions.length} entries
          </p>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-white transition">
              Previous
            </button>
            <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-white transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}