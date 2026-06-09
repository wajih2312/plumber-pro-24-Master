// Plumber Management Page
// Admin can Add, Edit, Delete plumbers
// Author: Minahil Jehanzaib | TechNexus Internship | 25 May 2026

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Wrench } from 'lucide-react';

// Empty form template
const emptyForm = {
  name: '',
  email: '',
  phone: '',
  experience: '',
  rate: '',
  available: true,
};

export default function PlumberManagement({ plumbers, setPlumbers }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  // Open Add form
  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setFormError('');
    setShowForm(true);
  };

  // Open Edit form with existing data
  const openEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      email: p.email,
      phone: p.phone,
      experience: p.experience,
      rate: p.rate,
      available: p.available,
    });
    setFormError('');
    setShowForm(true);
  };

  // Delete plumber with confirmation
  const deletePlumber = (id) => {
    if (window.confirm('Are you sure you want to delete this plumber?')) {
      setPlumbers((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Save form - handles both add and edit
  const saveForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.experience ||
      !form.rate
    ) {
      setFormError('Please fill all fields.');
      return;
    }
    if (editId) {
      // Update existing plumber
      setPlumbers((prev) =>
        prev.map((p) =>
          p.id === editId
            ? { ...p, ...form, experience: +form.experience, rate: +form.rate }
            : p
        )
      );
    } else {
      // Add new plumber
      setPlumbers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          experience: +form.experience,
          rate: +form.rate,
        },
      ]);
    }
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-poppins text-[#0F172A]">
          Plumber Management
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
        >
          <Plus size={18} /> Add Plumber
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: 'Total Plumbers',
            value: plumbers.length,
            color: 'bg-[#F1F5F9] text-[#0F172A]',
          },
          {
            label: 'Available',
            value: plumbers.filter((p) => p.available).length,
            color: 'bg-green-50 text-[#10B981]',
          },
          {
            label: 'Busy',
            value: plumbers.filter((p) => !p.available).length,
            color: 'bg-red-50 text-[#DC2626]',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} rounded-2xl p-4 text-center shadow-sm`}
          >
            <p className="text-3xl font-bold font-poppins">{stat.value}</p>
            <p className="text-sm font-medium text-[#64748B] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ===== ADD / EDIT FORM ===== */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border-2 border-[#2563EB] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-poppins text-[#0F172A]">
              {editId ? 'Edit Plumber' : 'Add New Plumber'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-[#64748B] hover:text-[#0F172A]"
            >
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { field: 'name', label: 'Full Name', type: 'text' },
              { field: 'email', label: 'Email Address', type: 'email' },
              { field: 'phone', label: 'Phone Number', type: 'text' },
              {
                field: 'experience',
                label: 'Experience (years)',
                type: 'number',
              },
              { field: 'rate', label: 'Hourly Rate ($)', type: 'number' },
            ].map(({ field, label, type }) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-[#64748B] mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[field]}
                  placeholder={label}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field]: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            ))}

            {/* Available Toggle */}
            <div className="flex items-center gap-3 mt-2">
              <label className="text-sm font-semibold text-[#64748B]">
                Available?
              </label>
              <div
                onClick={() =>
                  setForm((f) => ({ ...f, available: !f.available }))
                }
                className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 flex items-center px-1
                  ${form.available ? 'bg-[#10B981]' : 'bg-gray-300'}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
                  ${form.available ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </div>
              <span
                className={`text-sm font-semibold ${form.available ? 'text-[#10B981]' : 'text-[#DC2626]'}`}
              >
                {form.available ? 'Available' : 'Busy'}
              </span>
            </div>
          </div>

          {/* Error message */}
          {formError && (
            <p className="text-[#DC2626] text-sm mb-4">{formError}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={saveForm}
              className="flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-green-600 transition text-sm"
            >
              <Save size={16} /> Save Plumber
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-[#F1F5F9] text-[#64748B] rounded-xl font-semibold hover:bg-gray-200 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F1F5F9]">
            <tr>
              {[
                'Name',
                'Email',
                'Phone',
                'Experience',
                'Rate/hr',
                'Status',
                'Actions',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {plumbers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-16 text-[#64748B]">
                  <Wrench size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No plumbers found</p>
                </td>
              </tr>
            )}
            {plumbers.map((p) => (
              <tr key={p.id} className="hover:bg-[#F8FAFC] transition">
                <td className="px-6 py-4 font-semibold text-[#0F172A]">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-[#64748B]">{p.email}</td>
                <td className="px-6 py-4 text-[#64748B]">{p.phone}</td>
                <td className="px-6 py-4 text-[#0F172A]">{p.experience} yrs</td>
                <td className="px-6 py-4 font-bold text-[#2563EB]">
                  ${p.rate}/hr
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${p.available ? 'bg-green-100 text-[#10B981]' : 'bg-red-100 text-[#DC2626]'}`}
                  >
                    {p.available ? ' Available' : ' Busy'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#F1F5F9] text-[#2563EB] rounded-lg hover:bg-blue-50 transition text-xs font-medium"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => deletePlumber(p.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-50 text-[#DC2626] rounded-lg hover:bg-red-100 transition text-xs font-medium"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="md:hidden space-y-4">
        {plumbers.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#2563EB] flex items-center justify-center font-bold">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">{p.name}</p>
                  <p className="text-xs text-[#64748B]">{p.email}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${p.available ? 'bg-green-100 text-[#10B981]' : 'bg-red-100 text-[#DC2626]'}`}
              >
                {p.available ? 'Available' : 'Busy'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-[#F1F5F9] rounded-lg p-2">
                <p className="text-xs text-[#64748B]">Experience</p>
                <p className="font-bold text-[#0F172A]">{p.experience} yrs</p>
              </div>
              <div className="bg-[#F1F5F9] rounded-lg p-2">
                <p className="text-xs text-[#64748B]">Rate</p>
                <p className="font-bold text-[#2563EB]">${p.rate}/hr</p>
              </div>
              <div className="bg-[#F1F5F9] rounded-lg p-2">
                <p className="text-xs text-[#64748B]">Phone</p>
                <p className="font-bold text-[#0F172A] text-xs">{p.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(p)}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#F1F5F9] text-[#2563EB] rounded-xl text-sm font-medium"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => deletePlumber(p.id)}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-[#DC2626] rounded-xl text-sm font-medium"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
