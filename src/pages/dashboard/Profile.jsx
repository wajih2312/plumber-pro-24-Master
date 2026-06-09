import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

export default function Profile() {
  const { user, login } = useAuth(); // ✅ login added

  const stored = JSON.parse(localStorage.getItem('plumber_registered'));

  const [profile, setProfile] = useState({
    fullName: stored?.name || user?.name || '',
    email: stored?.email || user?.email || '',
    phone: stored?.phone || user?.phone || '',
    address: '',
  });

  const [temp, setTemp] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ FIXED SAVE FUNCTION
  const handleSave = () => {
    const updated = { ...temp };

    // 1. update UI state
    setProfile(updated);
    setIsEditing(false);

    // 2. save to localStorage
    const stored = JSON.parse(localStorage.getItem('plumber_registered')) || {};

    const newData = {
      ...stored,
      name: updated.fullName,
      email: updated.email,
      phone: updated.phone,
    };

    localStorage.setItem('plumber_registered', JSON.stringify(newData));

    // 3. update auth context
    login({
      name: updated.fullName,
      email: updated.email,
      phone: updated.phone,
      role: 'client',
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-lg font-bold text-[#0F172A] mb-4">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* TOP BANNER */}
        <div className="h-24 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A]" />

        <div className="px-6 pb-5 -mt-10">
          {/* HEADER */}
          <div className="flex justify-between items-end">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-[#2563EB] font-bold text-xl">
              {profile.fullName?.charAt(0)}
            </div>

            {!isEditing ? (
              <button
                onClick={() => {
                  setTemp(profile);
                  setIsEditing(true);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#2563EB] text-white text-xs rounded-lg"
              >
                <Edit2 size={14} />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg"
                >
                  <Save size={14} />
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-xs rounded-lg"
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* NAME */}
          <h2 className="mt-3 text-lg font-bold text-[#0F172A]">
            {profile.fullName}
          </h2>

          <p className="text-xs text-[#64748B]">Client Account</p>

          {/* FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <Field
              label="Full Name"
              value={profile.fullName}
              editing={isEditing}
              temp={temp}
              setTemp={setTemp}
              name="fullName"
              icon={<UserCircle size={14} />}
            />
            <Field
              label="Email"
              value={profile.email}
              editing={isEditing}
              temp={temp}
              setTemp={setTemp}
              name="email"
              icon={<Mail size={14} />}
            />
            <Field
              label="Phone"
              value={profile.phone}
              editing={isEditing}
              temp={temp}
              setTemp={setTemp}
              name="phone"
              icon={<Phone size={14} />}
            />
            <Field
              label="Address"
              value={profile.address}
              editing={isEditing}
              temp={temp}
              setTemp={setTemp}
              name="address"
              icon={<MapPin size={14} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* FIELD COMPONENT */
function Field({ label, icon, value, editing, temp, name, setTemp }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs text-[#64748B] mb-1">
        {icon}
        {label}
      </label>

      {editing ? (
        <input
          value={temp[name]}
          onChange={(e) => setTemp({ ...temp, [name]: e.target.value })}
          className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-[#2563EB]"
        />
      ) : (
        <div className="px-3 py-2 text-xs bg-[#F1F5F9] rounded-lg">
          {value || '-'}
        </div>
      )}
    </div>
  );
}
