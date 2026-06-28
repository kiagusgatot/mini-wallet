import axios from 'axios';

const api = axios.create({
  // Gunakan env VITE_API_URL jika ada, kalau tidak fallback ke Railway
  baseURL: import.meta.env.VITE_API_URL || 'https://mini-wallet-production-b055.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Offline check
    if (!navigator.onLine || error.message === 'Network Error') {
      return Promise.reject(new Error('Tidak ada koneksi internet'));
    }

    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
        return Promise.reject(new Error('Email atau password salah'));
      }
      
      if (error.response.status === 422) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        return Promise.reject(new Error(firstError));
      }

      if (error.response.status === 500) {
        return Promise.reject(new Error('Server sedang bermasalah, coba lagi nanti'));
      }

      return Promise.reject(new Error(error.response.data.message || 'Terjadi kesalahan pada sistem'));
    }
    
    return Promise.reject(error);
  }
);

export const pinApi = {
  createPin: (pin) => api.post('/pin/create', { pin }),
  loginWithPin: (email, pin) => api.post('/pin/login', { email, pin }),
  getPinStatus: (email) => api.get(`/pin/status?email=${encodeURIComponent(email)}`),
};

export default api;
