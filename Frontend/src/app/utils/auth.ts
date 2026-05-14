const API_BASE = import.meta.env.VITE_API_URL || "";
const STORAGE_KEY = 'cataractnet_current_user';

export interface UserData {
  name: string;
  mobile: string;
  gender: string;
  dob: string;
  token?: string;
}

export const generatePassword = (name: string, dob: string): string => {
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  const prefix = cleanName.substring(0, 4).padEnd(4, 'x');
  const year = new Date(dob).getFullYear();

  return prefix.charAt(0).toUpperCase() + prefix.slice(1) + year;
};

export const validateMobileNumber = (mobile: string): boolean => {
  return /^[0-9]{10}$/.test(mobile);
};

export const buildApiUrl = (path: string): string => {
  return API_BASE ? `${API_BASE}${path}` : path;
};

const saveCurrentUser = (user: UserData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): UserData | null => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const getAuthToken = (): string => {
  const user = getCurrentUser();
  return user?.token ?? '';
};

export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const registerUser = async (
  userData: Omit<UserData, 'token'>,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(buildApiUrl('/auth/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, password }),
    });

    const data = await response.json();
    return {
      success: data.success === true,
      message: data.message || 'Registration failed',
    };
  } catch {
    return { success: false, message: 'Registration failed. Please try again.' };
  }
};

export const loginUser = async (
  mobile: string,
  password: string
): Promise<{ success: boolean; message: string; user?: UserData }> => {
  try {
    const response = await fetch(buildApiUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, password }),
    });

    const data = await response.json();

    if (data.success && data.user && data.token) {
      const user: UserData = { ...data.user, token: data.token };
      saveCurrentUser(user);
      return { success: true, message: data.message || 'Login successful', user };
    }

    return { success: false, message: data.message || 'Invalid mobile number or password' };
  } catch {
    return { success: false, message: 'Login failed. Please try again.' };
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
