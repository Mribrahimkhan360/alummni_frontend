import React from "react";
import { ShieldCheck, Plus, Search, Pencil, Trash2, Users } from "lucide-react";

const roles = [
  { id: 1, name: "Admin", permissions: 25, users: 3 },
  { id: 2, name: "Alumni", permissions: 8, users: 120 },
  { id: 3, name: "Student", permissions: 5, users: 450 },
];

export default function Role() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Role management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage system roles and permissions.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
          <Plus size={16} />
          Create role
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Total roles
          </p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">3</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Total users
          </p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">573</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Permissions
          </p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">38</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <ShieldCheck size={15} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-800">
              System roles
            </span>
          </div>
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search role..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-52"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Role
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Permissions
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Users
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {role.name}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {role.permissions}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Users size={14} />
                      {role.users}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                        <Pencil size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-500 transition">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}