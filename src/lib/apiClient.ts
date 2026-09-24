import { ApiResponse } from '@/types/api';

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://layan-server.vercel.app/api';
const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

export class ApiClient {
  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('layan_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  }

  static async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  }

  static async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  }
}
