/**
 * Backend API Client
 * Communicates with Apso-generated Users and Invitation controllers
 */

export interface BackendUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  clerkId: string;
  status: 'Active' | 'Inactive' | 'Delete';
  role: 'admin' | 'staff';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  clerkId: string;
  status?: 'Active' | 'Inactive' | 'Delete';
  role?: 'admin' | 'staff';
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  clerkId?: string;
  status?: 'Active' | 'Inactive' | 'Delete';
  role?: 'admin' | 'staff';
}

export interface BackendInvitation {
  id: number;
  email: string;
  token: string;
  status:
    | 'pending_approval'
    | 'approved'
    | 'rejected'
    | 'accepted'
    | 'expired'
    | 'cancelled';
  expires_at: Date;
  approved_at?: Date;
  rejected_at?: Date;
  accepted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateInvitationRequest {
  email: string;
  token: string;
  status?:
    | 'pending_approval'
    | 'approved'
    | 'rejected'
    | 'accepted'
    | 'expired'
    | 'cancelled';
  expires_at: Date;
}

export interface BackendClient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  parentEmail: string;
  thingsToLookOutFor: string;
  status: 'Current' | 'Waitlisted' | 'Archived';
  created_at: Date;
  updated_at: Date;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  parentEmail?: string;
  thingsToLookOutFor?: string;
  status?: 'Current' | 'Waitlisted' | 'Archived';
}

export interface UpdateClientRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  parentEmail?: string;
  thingsToLookOutFor?: string;
  status?: 'Current' | 'Waitlisted' | 'Archived';
}

/**
 * Backend API Client Class
 */
export class BackendApiClient {
  private baseUrl: string;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL ||
      'http://localhost:3001'
  ) {
    this.baseUrl = baseUrl;
  }

  /**
   * Create a new user in the backend database
   */
  async createUser(userData: CreateUserRequest): Promise<BackendUser> {
    const response = await fetch(`${this.baseUrl}/Users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to create user: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get user by Clerk ID
   */
  async getUserByClerkId(clerkId: string): Promise<BackendUser | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Users?filter=clerkId||eq||${clerkId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching user by Clerk ID:', error);
      return null;
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<BackendUser | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Users?filter=email||eq||${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  /**
   * Update user in the backend database
   */
  async updateUser(
    userId: number,
    userData: UpdateUserRequest
  ): Promise<BackendUser> {
    const response = await fetch(`${this.baseUrl}/Users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to update user: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Delete user from the backend database
   */
  async deleteUser(userId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to delete user: ${error.message || response.statusText}`
      );
    }
  }

  /**
   * Get all users
   */
  async getUsers(): Promise<BackendUser[]> {
    const response = await fetch(`${this.baseUrl}/Users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to fetch users: ${error.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.data || [];
  }

  /**
   * Create a new invitation in the backend database
   */
  async createInvitation(
    invitationData: CreateInvitationRequest
  ): Promise<BackendInvitation> {
    const response = await fetch(`${this.baseUrl}/Invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invitationData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to create invitation: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get invitation by token
   */
  async getInvitationByToken(token: string): Promise<BackendInvitation | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Invitations?filter=token||eq||${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching invitation by token:', error);
      return null;
    }
  }

  /**
   * Update invitation status
   */
  async updateInvitation(
    invitationId: number,
    updates: Partial<BackendInvitation>
  ): Promise<BackendInvitation> {
    const response = await fetch(
      `${this.baseUrl}/Invitations/${invitationId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to update invitation: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get all invitations
   */
  async getInvitations(): Promise<BackendInvitation[]> {
    const response = await fetch(`${this.baseUrl}/Invitations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to fetch invitations: ${error.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.data || [];
  }

  /**
   * Create a new client in the backend database
   */
  async createClient(clientData: CreateClientRequest): Promise<BackendClient> {
    const response = await fetch(`${this.baseUrl}/Clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to create client: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get all clients with optional filtering and pagination
   */
  async getClients(
    page: number = 1,
    limit: number = 10,
    status?: 'Current' | 'Waitlisted' | 'Archived',
    search?: string
  ): Promise<{ data: BackendClient[]; total: number; page: number; pageCount: number }> {
    let url = `${this.baseUrl}/Clients?page=${page}&limit=${limit}&join=associatedStaffs`;
    
    // Add status filter if specified
    if (status) {
      url += `&filter=status||eq||${status}`;
    }
    
    // Add search filter if specified
    if (search && search.trim()) {
      const searchTerm = encodeURIComponent(search.trim());
      // Use multiple OR conditions with array syntax and case-insensitive search
      url += `&or[]=firstName||$contL||${searchTerm}&or[]=lastName||$contL||${searchTerm}&or[]=parentEmail||$contL||${searchTerm}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to fetch clients: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get a single client by ID
   */
  async getClient(clientId: number): Promise<BackendClient> {
    const response = await fetch(`${this.baseUrl}/Clients/${clientId}?join=associatedStaffs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to fetch client: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Update client in the backend database
   */
  async updateClient(
    clientId: number,
    clientData: UpdateClientRequest
  ): Promise<BackendClient> {
    const response = await fetch(`${this.baseUrl}/Clients/${clientId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to update client: ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Delete client from the backend database
   */
  async deleteClient(clientId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Clients/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to delete client: ${error.message || response.statusText}`
      );
    }
  }
}

// Export a default instance
export const backendApi = new BackendApiClient();
