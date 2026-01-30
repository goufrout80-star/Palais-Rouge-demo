const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (credentials: { username: string; password: string }) =>
      apiRequest<{ success: boolean; user: any; redirect: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    validate: (data: { userId: string; role: string }) =>
      apiRequest<{ valid: boolean; user: any }>('/auth/validate', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    logout: () =>
      apiRequest<{ success: boolean }>('/auth/logout', { method: 'POST' }),
  },
  
  properties: {
    getAll: (filters?: Record<string, string>) => {
      const params = new URLSearchParams(filters).toString();
      return apiRequest<{ properties: any[]; total: number }>(
        `/properties${params ? `?${params}` : ''}`
      );
    },
    getFeatured: () =>
      apiRequest<{ properties: any[] }>('/properties/featured'),
    getById: (id: string) =>
      apiRequest<{ property: any; similar: any[] }>(`/properties/${id}`),
    create: (data: any) =>
      apiRequest<{ property: any }>('/properties', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      apiRequest<{ property: any }>(`/properties/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      apiRequest<{ success: boolean }>(`/properties/${id}`, {
        method: 'DELETE',
      }),
  },
  
  users: {
    getAll: () => apiRequest<{ users: any[] }>('/users'),
    getById: (id: string) => apiRequest<{ user: any }>(`/users/${id}`),
    getAgent: (id: string) => apiRequest<{ agent: any }>(`/users/agent/${id}`),
    update: (id: string, data: any) =>
      apiRequest<{ user: any }>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    getAnalytics: () => apiRequest<any>('/users/admin/analytics'),
  },
};
