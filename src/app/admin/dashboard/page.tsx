'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Building2, DollarSign, TrendingUp, CheckCircle, XCircle,
  Eye, Clock, AlertTriangle, BarChart3, Settings, Shield, Plus
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { formatPrice } from '@/lib/utils';

const MOCK_PENDING_LISTINGS = [
  {
    id: '1',
    title: 'Cozy Family Home',
    agent: 'Agent Smith',
    price: 650000,
    city: 'Austin',
    submittedAt: '2024-01-18',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'
  },
  {
    id: '2',
    title: 'Urban Studio Apartment',
    agent: 'Jane Doe',
    price: 180000,
    city: 'Chicago',
    submittedAt: '2024-01-17',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
  }
];

const MOCK_USERS = [
  { id: '1', name: 'Admin User', role: 'admin', email: 'admin@palaisrouge.ma', status: 'active' },
  { id: '2', name: 'Agent Smith', role: 'agent', email: 'agent@palaisrouge.ma', status: 'active' },
  { id: '3', name: 'John Doe', role: 'user', email: 'user@palaisrouge.ma', status: 'active' },
  { id: '4', name: 'Sarah Wilson', role: 'agent', email: 'sarah@palaisrouge.ma', status: 'active' },
  { id: '5', name: 'Mike Brown', role: 'user', email: 'mike@palaisrouge.ma', status: 'inactive' },
];

const MOCK_RECENT_ACTIVITY = [
  { id: '1', action: 'New listing submitted', user: 'Agent Smith', time: '5 min ago', type: 'listing' },
  { id: '2', action: 'User registration', user: 'New User', time: '15 min ago', type: 'user' },
  { id: '3', action: 'Listing approved', user: 'Admin', time: '1 hour ago', type: 'approval' },
  { id: '4', action: 'Property sold', user: 'Agent Smith', time: '2 hours ago', type: 'sale' },
  { id: '5', action: 'Inquiry received', user: 'John Doe', time: '3 hours ago', type: 'inquiry' },
];

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      const redirects: Record<string, string> = {
        agent: '/agent/dashboard',
        user: '/dashboard',
      };
      router.push(redirects[user?.role || 'user'] || '/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#EDE9E3] border-t-[#1A1A1A] rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%', color: 'text-[#7D8471]', bg: 'bg-[#7D8471]/10' },
    { icon: Building2, label: 'Active Listings', value: '567', change: '+8%', color: 'text-[#1A1A1A]', bg: 'bg-[#1A1A1A]/5' },
    { icon: DollarSign, label: 'Total Revenue', value: '$2.4M', change: '+23%', color: 'text-[#C9A962]', bg: 'bg-[#C9A962]/10' },
    { icon: TrendingUp, label: 'Monthly Views', value: '45.2K', change: '+18%', color: 'text-[#4A4A4A]', bg: 'bg-[#4A4A4A]/10' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase block">
                    Administrator
                  </span>
                  <h1 className="font-display text-2xl md:text-3xl text-[#1A1A1A]">
                    Admin Dashboard
                  </h1>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 md:mt-0 flex gap-3"
            >
              <button className="px-4 py-2 border border-[#EDE9E3] text-[#1A1A1A] text-sm hover:border-[#1A1A1A] transition-colors flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Reports
              </button>
              <Link href="/admin/settings">
                <button className="px-4 py-2 border border-[#EDE9E3] text-[#1A1A1A] text-sm hover:border-[#1A1A1A] transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-[#EDE9E3] p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs tracking-wide uppercase text-[#7D8471] mb-1">{stat.label}</p>
                    <p className="font-display text-2xl text-[#1A1A1A]">{stat.value}</p>
                    <p className="text-xs text-[#7D8471] mt-1">{stat.change} this month</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Alert Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-[#C9A962]/10 border border-[#C9A962]/20 p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#C9A962]/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#C9A962]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1A1A1A]">2 listings pending approval</p>
                <p className="text-sm text-[#4A4A4A]">Review and approve new property listings</p>
              </div>
              <button className="px-4 py-2 border border-[#C9A962] text-[#C9A962] text-sm hover:bg-[#C9A962] hover:text-white transition-colors">
                Review Now
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pending Approvals */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3] flex items-center justify-between">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Pending Approvals</h2>
                  <span className="px-3 py-1 bg-[#C9A962]/10 text-[#C9A962] text-xs font-medium uppercase tracking-wide">
                    {MOCK_PENDING_LISTINGS.length} pending
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  {MOCK_PENDING_LISTINGS.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 p-4 bg-[#F8F6F3]">
                      <div className="w-20 h-20 overflow-hidden bg-[#EDE9E3] flex-shrink-0">
                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1A1A1A]">{listing.title}</h3>
                        <p className="text-sm text-[#7D8471]">By {listing.agent} &bull; {listing.city}</p>
                        <p className="font-display text-[#1A1A1A] mt-1">
                          {formatPrice(listing.price)}
                        </p>
                        <p className="text-xs text-[#7D8471] mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Submitted {listing.submittedAt}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-4 py-2 bg-[#1A1A1A] text-white text-sm hover:bg-[#2D2D2D] transition-colors flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="px-4 py-2 border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Management */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3] flex items-center justify-between">
                  <h2 className="font-display text-lg text-[#1A1A1A]">User Management</h2>
                  <button className="text-sm text-[#7D8471] hover:text-[#1A1A1A] transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wide text-[#7D8471] border-b border-[#EDE9E3]">
                        <th className="px-6 py-4 font-medium">User</th>
                        <th className="px-6 py-4 font-medium">Role</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE9E3]">
                      {MOCK_USERS.map((u) => (
                        <tr key={u.id} className="text-sm">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#7D8471]/10 flex items-center justify-center">
                                <span className="text-[#7D8471] font-medium text-sm">
                                  {u.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-[#1A1A1A]">{u.name}</p>
                                <p className="text-[#7D8471] text-xs">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wide capitalize ${
                              u.role === 'admin' ? 'bg-[#1A1A1A]/5 text-[#1A1A1A]' :
                              u.role === 'agent' ? 'bg-[#C9A962]/10 text-[#C9A962]' :
                              'bg-[#7D8471]/10 text-[#7D8471]'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                              u.status === 'active' ? 'bg-[#7D8471]/10 text-[#7D8471]' : 'bg-red-50 text-red-600'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-sm text-[#7D8471] hover:text-[#1A1A1A] transition-colors">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Recent Activity</h2>
                </div>
                <div className="p-6 space-y-4">
                  {MOCK_RECENT_ACTIVITY.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center ${
                        activity.type === 'listing' ? 'bg-[#7D8471]/10' :
                        activity.type === 'user' ? 'bg-[#C9A962]/10' :
                        activity.type === 'approval' ? 'bg-[#1A1A1A]/5' :
                        activity.type === 'sale' ? 'bg-[#C9A962]/10' :
                        'bg-[#EDE9E3]'
                      }`}>
                        {activity.type === 'listing' && <Building2 className="w-4 h-4 text-[#7D8471]" />}
                        {activity.type === 'user' && <Users className="w-4 h-4 text-[#C9A962]" />}
                        {activity.type === 'approval' && <CheckCircle className="w-4 h-4 text-[#1A1A1A]" />}
                        {activity.type === 'sale' && <DollarSign className="w-4 h-4 text-[#C9A962]" />}
                        {activity.type === 'inquiry' && <Eye className="w-4 h-4 text-[#7D8471]" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1A1A1A]">{activity.action}</p>
                        <p className="text-xs text-[#7D8471]">{activity.user}</p>
                        <p className="text-xs text-[#9A9A9A] mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Stats */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Platform Stats</h2>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: 'Total Agents', value: '52' },
                    { label: 'Active Listings', value: '567' },
                    { label: 'Properties Sold (Month)', value: '34' },
                    { label: 'Total Inquiries', value: '892' },
                    { label: 'Avg. Time on Market', value: '28 days' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[#EDE9E3] last:border-0">
                      <span className="text-sm text-[#4A4A4A]">{stat.label}</span>
                      <span className="font-display text-[#1A1A1A]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-3">
                  <Link href="/properties/new">
                    <button className="w-full px-4 py-3 bg-[#C9A962] text-[#1A1A1A] text-sm flex items-center gap-2 hover:bg-[#B89A52] transition-colors font-medium">
                      <Plus className="w-4 h-4" />
                      Add New Property
                    </button>
                  </Link>
                  <button className="w-full px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm flex items-center gap-2 hover:border-[#1A1A1A] transition-colors">
                    <Users className="w-4 h-4 text-[#7D8471]" />
                    Manage Users
                  </button>
                  <Link href="/properties">
                    <button className="w-full px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm flex items-center gap-2 hover:border-[#1A1A1A] transition-colors">
                      <Building2 className="w-4 h-4 text-[#7D8471]" />
                      All Listings
                    </button>
                  </Link>
                  <button className="w-full px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm flex items-center gap-2 hover:border-[#1A1A1A] transition-colors">
                    <BarChart3 className="w-4 h-4 text-[#7D8471]" />
                    View Reports
                  </button>
                  <Link href="/admin/settings">
                    <button className="w-full px-4 py-3 bg-[#1A1A1A] text-white text-sm flex items-center gap-2 hover:bg-[#2D2D2D] transition-colors">
                      <Settings className="w-4 h-4" />
                      Site Settings
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
