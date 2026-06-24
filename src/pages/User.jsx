import React from "react";
import { Eye, Edit, Trash2, Users } from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarah@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: 3,
    name: "Michael Scott",
    email: "michael@dundermifflin.com",
    role: "Manager",
    status: "active",
  },
];

const avatarColors = ["bg-indigo-600", "bg-violet-500", "bg-cyan-600"];

export default function User() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage accounts and access.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
          + Add user
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Users size={15} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-800">All users</span>
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
              placeholder="Search user..."
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
                  User
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Role
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
              {users.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${avatarColors[idx % avatarColors.length]} text-white text-sm font-medium flex items-center justify-center flex-shrink-0`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        user.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
                        <Edit size={15} />
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