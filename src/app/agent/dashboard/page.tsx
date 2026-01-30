'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Eye, MessageSquare, DollarSign, Plus, Edit, Trash2,
  TrendingUp, Users, Calendar, MapPin, CheckCircle, Clock, X, AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProperties } from '@/context/PropertiesContext';
import { Navbar } from '@/components/layout/Navbar';
import { formatPrice, getStatusColor } from '@/lib/utils';

const MOCK_INQUIRIES = [
  { id: '1', name: 'John Smith', property: 'Modern Downtown Apartment', message: 'Interested in scheduling a visit', date: '2024-01-18', status: 'new' },
  { id: '2', name: 'Sarah Johnson', property: 'Luxury Beach Villa', message: 'Is the price negotiable?', date: '2024-01-17', status: 'read' },
  { id: '3', name: 'Mike Wilson', property: 'Modern Loft for Rent', message: 'Available for move-in Feb 1st?', date: '2024-01-16', status: 'replied' },
];

export default function AgentDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { properties, deleteProperty, isLoading: propertiesLoading } = useProperties();
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    if (!isLoading && isAuthenticated && user?.role !== 'agent') {
      const redirects: Record<string, string> = {
        admin: '/admin/dashboard',
        user: '/dashboard',
      };
      router.push(redirects[user?.role || 'user'] || '/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'agent') {
    return (
      <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#EDE9E3] border-t-[#1A1A1A] rounded-full animate-spin" />
      </div>
    );
  }

  // Get agent's properties (for now, show all properties - in real app, filter by agentId)
  const agentProperties = properties.slice(0, 6);

  const handleDeleteClick = (id: string, title: string) => {
    setPropertyToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    setDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    deleteProperty(propertyToDelete.id);
    setDeleting(false);
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  // Calculate stats from real data
  const totalViews = agentProperties.reduce((sum, p) => sum + (p.viewCount || 0), 0);
  const totalValue = agentProperties.reduce((sum, p) => sum + p.price, 0);

  const stats = [
    { icon: Building2, label: 'Active Listings', value: agentProperties.length.toString(), change: '+2', color: 'text-[#1A1A1A]', bg: 'bg-[#1A1A1A]/5' },
    { icon: Eye, label: 'Total Views', value: totalViews.toLocaleString(), change: '+12%', color: 'text-[#7D8471]', bg: 'bg-[#7D8471]/10' },
    { icon: MessageSquare, label: 'New Inquiries', value: '23', change: '+5', color: 'text-[#C9A962]', bg: 'bg-[#C9A962]/10' },
    { icon: DollarSign, label: 'Total Value', value: `$${(totalValue / 1000000).toFixed(1)}M`, change: '+$500K', color: 'text-[#4A4A4A]', bg: 'bg-[#4A4A4A]/10' },
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
              <span className="text-[#7D8471] text-xs tracking-[0.3em] uppercase mb-2 block">
                Agent Portal
              </span>
              <h1 className="font-display text-3xl text-[#1A1A1A]">
                Welcome back, <span className="italic text-[#7D8471]">{user.name}</span>
              </h1>
              <p className="text-[#4A4A4A] mt-1">
                Manage your listings and inquiries
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 md:mt-0"
            >
              <Link href="/properties/new">
                <button className="px-6 py-3 bg-[#1A1A1A] text-white text-sm flex items-center gap-2 hover:bg-[#2D2D2D] transition-colors">
                  <Plus className="w-4 h-4" />
                  Add New Property
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Listings */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3] flex items-center justify-between">
                  <h2 className="font-display text-lg text-[#1A1A1A]">My Listings</h2>
                  <Link href="/agent/properties" className="text-sm text-[#7D8471] hover:text-[#1A1A1A] transition-colors">
                    View All
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wide text-[#7D8471] border-b border-[#EDE9E3]">
                        <th className="px-6 py-4 font-medium">Property</th>
                        <th className="px-6 py-4 font-medium">Price</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Views</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE9E3]">
                      {agentProperties.map((listing) => (
                        <tr key={listing.id} className="text-sm">
                          <td className="px-6 py-4">
                            <Link href={`/properties/${listing.id}`} className="flex items-center gap-3 hover:opacity-80">
                              <div className="w-12 h-12 overflow-hidden bg-[#EDE9E3] flex-shrink-0">
                                <img src={listing.images?.[0] || 'https://via.placeholder.com/100'} alt={listing.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-[#1A1A1A]">{listing.title}</p>
                                <p className="text-[#7D8471] text-xs flex items-center mt-0.5">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {listing.city}
                                </p>
                              </div>
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-display text-[#1A1A1A]">
                              {formatPrice(listing.price, listing.listingType)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                                listing.status === 'AVAILABLE' ? 'bg-[#7D8471]/10 text-[#7D8471]' :
                                listing.status === 'PENDING' ? 'bg-[#C9A962]/10 text-[#C9A962]' :
                                'bg-[#EDE9E3] text-[#4A4A4A]'
                              }`}>
                                {listing.status}
                              </span>
                              {!listing.approved && (
                                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wide bg-orange-50 text-orange-600">
                                  Pending Approval
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-[#7D8471]">
                              <Eye className="w-4 h-4 mr-1" />
                              {listing.viewCount || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/properties/${listing.id}/edit`}>
                                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#F8F6F3] text-[#7D8471] hover:text-[#1A1A1A] transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </Link>
                              <button 
                                onClick={() => handleDeleteClick(listing.id, listing.title)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-red-50 text-[#7D8471] hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Performance Overview</h2>
                </div>
                <div className="p-6">
                  <div className="h-64 flex items-center justify-center bg-[#F8F6F3]">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-[#EDE9E3] mx-auto mb-4" />
                      <p className="text-[#4A4A4A]">Views & Inquiries Chart</p>
                      <p className="text-xs text-[#7D8471] mt-1">Analytics visualization coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Inquiries */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">Recent Inquiries</h2>
                </div>
                <div className="p-6 space-y-4">
                  {MOCK_INQUIRIES.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 bg-[#F8F6F3]">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#7D8471]/10 flex items-center justify-center">
                            <span className="text-[#7D8471] font-medium">
                              {inquiry.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1A1A1A]">{inquiry.name}</p>
                            <p className="text-xs text-[#7D8471]">{inquiry.date}</p>
                          </div>
                        </div>
                        <span className={`w-2 h-2 ${
                          inquiry.status === 'new' ? 'bg-[#C9A962]' : 
                          inquiry.status === 'read' ? 'bg-[#7D8471]' : 'bg-[#EDE9E3]'
                        }`} />
                      </div>
                      <p className="text-sm text-[#4A4A4A] mt-3">{inquiry.message}</p>
                      <p className="text-xs text-[#7D8471] mt-2">
                        Re: {inquiry.property}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-4 py-2 border border-[#EDE9E3] text-[#1A1A1A] text-sm hover:border-[#1A1A1A] transition-colors">
                          Reply
                        </button>
                        <button className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white text-sm hover:bg-[#2D2D2D] transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white border border-[#EDE9E3]">
                <div className="px-6 py-5 border-b border-[#EDE9E3]">
                  <h2 className="font-display text-lg text-[#1A1A1A]">This Month</h2>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#F8F6F3]">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#7D8471]" />
                      <span className="text-sm text-[#4A4A4A]">Properties Sold</span>
                    </div>
                    <span className="font-display text-[#1A1A1A]">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F8F6F3]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#C9A962]" />
                      <span className="text-sm text-[#4A4A4A]">Visits Scheduled</span>
                    </div>
                    <span className="font-display text-[#1A1A1A]">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F8F6F3]">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#1A1A1A]" />
                      <span className="text-sm text-[#4A4A4A]">New Leads</span>
                    </div>
                    <span className="font-display text-[#1A1A1A]">28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[600] flex items-center justify-center p-4"
            onClick={() => !deleting && setDeleteModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#EDE9E3] w-full max-w-md"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-display text-xl text-[#1A1A1A] text-center mb-2">
                  Delete Property
                </h3>
                <p className="text-[#7D8471] text-center mb-6">
                  Are you sure you want to delete &quot;{propertyToDelete?.title}&quot;? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    disabled={deleting}
                    className="flex-1 px-4 py-3 border border-[#EDE9E3] text-[#1A1A1A] text-sm font-medium hover:border-[#1A1A1A] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="flex-1 px-4 py-3 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {deleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Property'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
