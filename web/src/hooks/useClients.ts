'use client';

import { useState, useCallback } from 'react';
import { backendApi, BackendClient, CreateClientRequest, UpdateClientRequest } from '@/lib/backend-api';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  parentEmail: string;
  thingsToLookOutFor: string;
  status: 'Current' | 'Waitlisted' | 'Archived';
  associatedStaff: string[];
  created_at: Date;
  updated_at: Date;
}

export interface ClientFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'Current' | 'Waitlisted' | 'Archived';
}

export interface ClientListResponse {
  clients: Client[];
  total: number;
  page: number;
  pageCount: number;
  limit: number;
}

/**
 * Transform backend client to frontend client format
 */
function transformBackendClient(backendClient: any): Client {
  return {
    id: backendClient.id,
    firstName: backendClient.firstName,
    lastName: backendClient.lastName,
    dateOfBirth: backendClient.dateOfBirth,
    parentEmail: backendClient.parentEmail,
    thingsToLookOutFor: backendClient.thingsToLookOutFor,
    status: backendClient.status,
    associatedStaff: backendClient.associatedStaffs ? 
      backendClient.associatedStaffs.map((staff: any) => `${staff.firstName} ${staff.lastName}`) : [],
    created_at: backendClient.created_at,
    updated_at: backendClient.updated_at,
  };
}

/**
 * Custom hook for client management
 */
export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);

  /**
   * Fetch clients with filters
   */
  const fetchClients = useCallback(async (filters: ClientFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await backendApi.getClients(
        filters.page || 1,
        filters.limit || 10,
        filters.status,
        filters.search
      );

      const transformedClients = response.data.map(transformBackendClient);

      setClients(transformedClients);
      setTotal(response.total);
      setPage(response.page);
      setPageCount(response.pageCount);
      setLimit(filters.limit || 10);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get a single client by ID
   */
  const getClient = useCallback(async (id: number): Promise<Client | null> => {
    try {
      const backendClient = await backendApi.getClient(id);
      return transformBackendClient(backendClient);
    } catch (err) {
      console.error('Error fetching client:', err);
      throw err;
    }
  }, []);

  /**
   * Create a new client
   */
  const createClient = useCallback(async (clientData: CreateClientRequest): Promise<Client> => {
    try {
      const backendClient = await backendApi.createClient(clientData);
      return transformBackendClient(backendClient);
    } catch (err) {
      console.error('Error creating client:', err);
      throw err;
    }
  }, []);

  /**
   * Update client information
   */
  const updateClient = useCallback(
    async (id: number, updates: UpdateClientRequest): Promise<Client> => {
      try {
        const backendClient = await backendApi.updateClient(id, updates);
        return transformBackendClient(backendClient);
      } catch (err) {
        console.error('Error updating client:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Update client status
   */
  const updateClientStatus = useCallback(
    async (
      id: number,
      status: 'Current' | 'Waitlisted' | 'Archived'
    ): Promise<Client> => {
      try {
        return await updateClient(id, { status });
      } catch (err) {
        console.error('Error updating client status:', err);
        throw err;
      }
    },
    [updateClient]
  );

  /**
   * Delete client
   */
  const deleteClient = useCallback(async (id: number): Promise<void> => {
    try {
      await backendApi.deleteClient(id);
    } catch (err) {
      console.error('Error deleting client:', err);
      throw err;
    }
  }, []);

  /**
   * Refresh clients list
   */
  const refreshClients = useCallback(() => {
    fetchClients({ page, limit });
  }, [fetchClients, page, limit]);

  return {
    clients,
    loading,
    error,
    total,
    page,
    pageCount,
    limit,
    fetchClients,
    getClient,
    createClient,
    updateClient,
    updateClientStatus,
    deleteClient,
    refreshClients,
  };
}