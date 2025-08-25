'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ClientsHeader,
  ClientsTable,
  AddClientModal,
} from '@/components/clients';
import { useAuth } from '@/hooks/useAuth';
import { useClients } from '@/hooks/useClients';

export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  associatedStaff: string[];
  thingsToLookOutFor: string;
  status: 'Current' | 'Waitlisted' | 'Archived';
  parentEmail: string;
};

export type ClientStatus =
  | 'Current'
  | 'Waitlisted'
  | 'Archived'
  | 'All clients';

export default function ClientsPage() {
  const { user } = useAuth();
  const {
    clients,
    loading,
    error,
    total,
    page,
    pageCount,
    fetchClients,
    createClient,
  } = useClients();

  const [activeTab, setActiveTab] = useState<ClientStatus>('Current');
  const [showOnlyMyClients, setShowOnlyMyClients] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load clients on mount and when filters change
  useEffect(() => {
    const status = activeTab === 'All clients' ? undefined : activeTab;
    fetchClients({
      page: currentPage,
      limit: itemsPerPage,
      status,
      search: searchQuery.trim() || undefined,
    });
  }, [fetchClients, currentPage, activeTab, searchQuery]);

  // Filter clients for "my clients" toggle (client-side filtering)
  const filteredClients = useMemo(() => {
    let filtered = clients;

    // Filter by "my clients" toggle
    if (showOnlyMyClients) {
      if (user && user.firstName && user.lastName) {
        // Match against the user's full name or parts of it
        const userFullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const userFirstName = user.firstName.toLowerCase();
        const userLastName = user.lastName.toLowerCase();

        filtered = filtered.filter((client) => {
          const isMatch = client.associatedStaff.some((staff) => {
            const staffName = staff.toLowerCase();
            return (
              staffName.includes(userFirstName) ||
              staffName.includes(userLastName) ||
              staffName.includes(userFullName)
            );
          });
          return isMatch;
        });
      } else {
        // If no user or incomplete user data, show no clients when toggle is on
        filtered = [];
      }
    }

    return filtered;
  }, [clients, showOnlyMyClients, user]);

  // For pagination, we'll use the filtered results
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  const handleAddClient = async (newClient: Omit<Client, 'id'>) => {
    try {
      await createClient({
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        dateOfBirth:
          newClient.dateOfBirth === 'Not specified'
            ? undefined
            : newClient.dateOfBirth,
        parentEmail: newClient.parentEmail || undefined,
        thingsToLookOutFor: newClient.thingsToLookOutFor || undefined,
        status: newClient.status,
      });

      // Close modal
      setIsAddModalOpen(false);

      // Reset to first page and refresh
      setCurrentPage(1);

      // Refresh the current view
      const status = activeTab === 'All clients' ? undefined : activeTab;
      fetchClients({
        page: 1,
        limit: itemsPerPage,
        status,
        search: searchQuery.trim() || undefined,
      });
    } catch (error) {
      console.error('Failed to add client:', error);
      // Handle error (you could add a toast notification here)
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: ClientStatus) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (error) {
    return (
      <div className='p-4 md:p-8 space-y-6 md:space-y-8 bg-white min-h-screen'>
        <div className='text-center text-red-600'>
          <h2 className='text-xl font-semibold mb-2'>Error Loading Clients</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8 space-y-6 md:space-y-8 bg-white min-h-screen'>
      <ClientsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showOnlyMyClients={showOnlyMyClients}
        onShowOnlyMyClientsChange={setShowOnlyMyClients}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddClient={() => setIsAddModalOpen(true)}
      />

      {loading ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Loading clients...</p>
        </div>
      ) : (
        <ClientsTable
          clients={paginatedClients}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddClient}
      />
    </div>
  );
}
