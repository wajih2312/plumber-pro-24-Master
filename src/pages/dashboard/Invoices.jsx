// Invoices Page
// Displays all invoices for the logged-in client
// Features: search, filter by paid/unpaid, view details, download as HTML invoice
// TODO: Replace initialInvoices with GET /api/invoices API call when backend is ready
// Author: Fareeha Shah | TechNexus Internship | 18 May 2026
import { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  Search,
  Eye,
  X,
} from 'lucide-react';

// Sample invoice data
const initialInvoices = [
  {
    id: 'INV-001',
    service: 'Emergency Plumbing',
    date: '2026-05-18',
    amount: '$120',
    status: 'paid',
    plumber: 'John Smith',
    address: '92 Bowery St, New York, NY',
  },
  {
    id: 'INV-002',
    service: 'Drain Cleaning',
    date: '2026-05-15',
    amount: '$80',
    status: 'unpaid',
    plumber: 'Mike Johnson',
    address: '45 Main St, London, UK',
  },
  {
    id: 'INV-003',
    service: 'Pipe Repair',
    date: '2026-05-10',
    amount: '$150',
    status: 'paid',
    plumber: 'David Lee',
    address: '12 King St, Dubai, UAE',
  },
  {
    id: 'INV-004',
    service: 'Water Heater Installation',
    date: '2026-05-05',
    amount: '$200',
    status: 'unpaid',
    plumber: 'Ali Hassan',
    address: '78 Queen Ave, Toronto, Canada',
  },
  {
    id: 'INV-005',
    service: 'Routine Maintenance',
    date: '2026-04-28',
    amount: '$60',
    status: 'paid',
    plumber: 'John Smith',
    address: '92 Bowery St, New York, NY',
  },
];

const statusConfig = {
  paid: {
    label: 'Paid',
    color: 'bg-green-100 text-[#10B981]',
    icon: <CheckCircle size={14} />,
  },
  unpaid: {
    label: 'Unpaid',
    color: 'bg-red-100 text-[#DC2626]',
    icon: <Clock size={14} />,
  },
};

export default function Invoices() {
  const [invoices] = useState(initialInvoices);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  // Filter + Search
  const filtered = invoices
    .filter((inv) => (filter === 'all' ? true : inv.status === filter))
    .filter(
      (inv) =>
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.service.toLowerCase().includes(search.toLowerCase())
    );

  // Fake PDF download
  const handleDownload = (inv) => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #f0f4f8; display: flex; justify-content: center; padding: 40px 20px; }
    .invoice { background: white; width: 700px; padding: 60px; box-shadow: 0 4px 30px rgba(0,0,0,0.08); }

    /* Header */
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 50px; }
    .logo { }
    .logo h1 { font-family: 'Poppins', sans-serif; font-size: 48px; font-weight: 900; color: #0F172A; line-height: 1; }
    .logo p  { font-size: 13px; color: #64748B; margin-top: 4px; letter-spacing: 2px; text-transform: uppercase; }
    .invoice-label { text-align: right; }
    .invoice-label h2 { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 900; color: #2563EB; }
    .invoice-label p  { font-size: 13px; color: #64748B; margin-top: 4px; }

    /* Status Badge */
    .status-badge {
      display: inline-block;
      padding: 6px 18px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 8px;
      background: ${inv.status === 'paid' ? '#dcfce7' : '#fee2e2'};
      color: ${inv.status === 'paid' ? '#10B981' : '#DC2626'};
    }

    /* Divider */
    .divider { height: 3px; background: linear-gradient(to right, #0F172A, #2563EB); margin: 30px 0; border-radius: 2px; }

    /* Info Grid */
    .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
    .info-item label { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px; }
    .info-item p     { font-size: 14px; font-weight: 600; color: #0F172A; }

    /* Table */
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    thead tr { background: #0F172A; }
    thead th { padding: 14px 16px; text-align: left; font-size: 12px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 1px; }
    thead th:last-child { text-align: right; }
    tbody tr { border-bottom: 1px solid #F1F5F9; }
    tbody tr:nth-child(even) { background: #F8FAFC; }
    tbody td { padding: 16px; font-size: 14px; color: #0F172A; }
    tbody td:last-child { text-align: right; font-weight: 600; color: #2563EB; }

    /* Totals */
    .totals { display: flex; justify-content: flex-end; margin-bottom: 40px; }
    .totals-box { width: 280px; }
    .totals-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
    .totals-row span:first-child { color: #64748B; }
    .totals-row span:last-child  { font-weight: 600; color: #0F172A; }
    .totals-row.total { border-bottom: none; padding-top: 14px; }
    .totals-row.total span { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 700; color: #0F172A; }
    .totals-row.total span:last-child { color: #2563EB; }

    /* Note */
    .note { background: #F1F5F9; border-left: 4px solid #2563EB; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 40px; }
    .note p { font-size: 13px; color: #64748B; line-height: 1.6; }
    .note strong { color: #0F172A; }

    /* Footer */
    .footer { display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid #F1F5F9; }
    .footer-left p  { font-size: 12px; color: #64748B; margin-bottom: 4px; }
    .footer-right { text-align: right; }
    .footer-right p { font-size: 12px; color: #64748B; margin-bottom: 4px; }
    .brand { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 900; color: #0F172A; }
    .brand span { color: #2563EB; }
  </style>
</head>
<body>
<div class="invoice">

  <!-- Header -->
  <div class="header">
    <div class="logo">
      <h1>🔧 Plumber<br/>Pro 24/7</h1>
      <p>Professional Plumbing Services</p>
    </div>
    <div class="invoice-label">
      <h2>INVOICE</h2>
      <p>${inv.id}</p>
      <div class="status-badge">${inv.status}</div>
    </div>
  </div>

  <!-- Gradient Divider -->
  <div class="divider"></div>

  <!-- Info Grid -->
  <div class="info-grid">
    <div class="info-item">
      <label>Billed To</label>
      <p>Fareeha Shah</p>
    </div>
    <div class="info-item">
      <label>Invoice Date</label>
      <p>${inv.date}</p>
    </div>
    <div class="info-item">
      <label>Due Date</label>
      <p>${inv.date}</p>
    </div>
    <div class="info-item">
      <label>Invoice No</label>
      <p>${inv.id}</p>
    </div>
  </div>

  <!-- Table -->
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Plumber</th>
        <th>Location</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${inv.service}</td>
        <td>${inv.plumber}</td>
        <td>${inv.address}</td>
        <td>${inv.amount}</td>
      </tr>
    </tbody>
  </table>

  <!-- Totals -->
  <div class="totals">
    <div class="totals-box">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>${inv.amount}</span>
      </div>
      <div class="totals-row">
        <span>Tax (0%)</span>
        <span>$0.00</span>
      </div>
      <div class="totals-row">
        <span>Discount</span>
        <span>$0.00</span>
      </div>
      <div class="totals-row total">
        <span>Total Due</span>
        <span>${inv.amount}</span>
      </div>
    </div>
  </div>

  <!-- Note -->
  <div class="note">
    <p><strong>Payment Note:</strong> All remaining amounts are due on the agreed date.
    Thank you for choosing <strong>Plumber Pro 24/7</strong>!
    For queries contact us at <strong>plumb@plumbinf.com</strong></p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <p>📍 92 Bowery St, New York, NY 10013</p>
      <p>📞 (041) 471-4025</p>
      <p>✉️ plumb@plumbinf.com</p>
    </div>
    <div class="footer-right">
      <div class="brand">🔧 Plumber<span>Pro</span></div>
      <p>Professional Plumbing Services</p>
      <p>Available 24/7 Worldwide</p>
    </div>
  </div>

</div>
</body>
</html>
  `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${inv.id}_Invoice.html`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-poppins text-[#0F172A] mb-6">
        My Invoices
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: 'Total Invoices',
            value: invoices.length,
            color: 'bg-[#F1F5F9] text-[#0F172A]',
          },
          {
            label: 'Paid',
            value: invoices.filter((i) => i.status === 'paid').length,
            color: 'bg-green-50 text-[#10B981]',
          },
          {
            label: 'Unpaid',
            value: invoices.filter((i) => i.status === 'unpaid').length,
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

      {/* Search + Filter Row */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 flex-1">
          <Search size={18} className="text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by invoice ID or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-[#0F172A] font-inter"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {['all', 'paid', 'unpaid'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition
                ${
                  filter === tab
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white text-[#64748B] border border-gray-200 hover:bg-[#F1F5F9]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      {/* ===== DESKTOP TABLE - hidden on mobile ===== */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F1F5F9] text-[#64748B] font-semibold">
            <tr>
              <th className="text-left px-6 py-4">Invoice ID</th>
              <th className="text-left px-6 py-4">Service</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Amount</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-16 text-[#64748B]">
                  <FileText size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No invoices found</p>
                </td>
              </tr>
            )}
            {filtered.map((inv) => {
              const status = statusConfig[inv.status];
              return (
                <tr key={inv.id} className="hover:bg-[#F1F5F9] transition">
                  <td className="px-6 py-4 font-semibold text-[#2563EB]">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 text-[#0F172A]">{inv.service}</td>
                  <td className="px-6 py-4 text-[#64748B]">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-[#0F172A]">
                    {inv.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                    >
                      {status.icon} {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(inv)}
                        className="flex items-center gap-1 px-3 py-1 bg-[#F1F5F9] text-[#64748B] rounded-lg hover:bg-blue-50 hover:text-[#2563EB] transition text-xs font-medium"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleDownload(inv)}
                        className="flex items-center gap-1 px-3 py-1 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
                      >
                        <Download size={14} /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS - shown only on mobile ===== */}
      <div className="md:hidden space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#64748B]">
            <FileText size={48} className="mx-auto mb-3 opacity-30" />
            <p>No invoices found</p>
          </div>
        )}
        {filtered.map((inv) => {
          const status = statusConfig[inv.status];
          return (
            <div key={inv.id} className="bg-white rounded-2xl shadow-sm p-5">
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[#2563EB] font-poppins">
                  {inv.id}
                </span>
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                >
                  {status.icon} {status.label}
                </span>
              </div>
              {/* Details */}
              <p className="text-[#0F172A] font-semibold mb-1">{inv.service}</p>
              <p className="text-[#64748B] text-sm mb-1">{inv.date}</p>
              <p className="text-[#0F172A] font-bold text-lg mb-4">
                {inv.amount}
              </p>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(inv)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#F1F5F9] text-[#64748B] rounded-xl text-sm font-medium hover:bg-blue-50 hover:text-[#2563EB] transition"
                >
                  <Eye size={16} /> View
                </button>
                <button
                  onClick={() => handleDownload(inv)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Invoice Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-poppins text-[#0F172A]">
                {selected.id}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Invoice Header Design */}
            <div className="bg-gradient-to-r from-[#0F172A] to-[#2563EB] rounded-xl p-4 mb-6 text-white">
              <p className="text-xs opacity-70">PLUMBER PRO 24/7</p>
              <p className="text-2xl font-bold font-poppins mt-1">
                {selected.amount}
              </p>
              <span
                className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-semibold
                ${selected.status === 'paid' ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}
              >
                {statusConfig[selected.status].icon}
                {statusConfig[selected.status].label}
              </span>
            </div>

            {/* Invoice Details */}
            <div className="space-y-3 text-sm">
              {[
                { label: 'Service', value: selected.service },
                { label: 'Date', value: selected.date },
                { label: 'Plumber', value: selected.plumber },
                { label: 'Address', value: selected.address },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <span className="text-[#64748B] font-medium">
                    {item.label}
                  </span>
                  <span className="text-[#0F172A] font-semibold text-right max-w-xs">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(selected)}
              className="mt-6 w-full py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Invoice
            </button>

            <button
              onClick={() => setSelected(null)}
              className="mt-3 w-full py-3 bg-[#F1F5F9] text-[#64748B] rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
