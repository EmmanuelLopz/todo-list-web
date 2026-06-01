import api from './api';

const ID_TOKEN_KEY = 'auth_id_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

export const saveTokens = (idToken: string, refreshToken: string) => {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getToken = (): string | null => {
  return localStorage.getItem(ID_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { idToken, refreshToken } = response.data;
    saveTokens(idToken, refreshToken);
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 401) throw new Error('Invalid email or password');
    if (status === 400) throw new Error('Please enter a valid email and password');
    if (status === 404) throw new Error('No account found with this email');
    if (!error.response) throw new Error('Cannot reach the server. Check your connection');
    throw new Error('Something went wrong. Please try again');
  }
};

export const logout = () => {
  removeToken();
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const payloadBase64 = token.split('.')[1];
    const decoded = JSON.parse(atob(payloadBase64));
    return (decoded.user_id as string) || (decoded.sub as string) || null;
  } catch {
    return null;
  }
};
