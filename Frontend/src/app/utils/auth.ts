// export interface UserData {
//   name: string;
//   mobile: string;
//   gender: string;
//   dob: string;
//   password: string;
// }

// // Simple hash function for demo purposes (client-side only)
// // In production, use proper server-side hashing like bcrypt
// export const hashPassword = async (password: string): Promise<string> => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(password);
//   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
// };

// // Generate password: First 4 chars of name + year of birth
// export const generatePassword = (name: string, dob: string): string => {
//   const namePrefix = name.slice(0, 4);
//   const year = new Date(dob).getFullYear();
//   return `${namePrefix}${year}`;
// };

// // Validate mobile number (10 digits)
// export const validateMobileNumber = (mobile: string): boolean => {
//   const mobileRegex = /^[0-9]{10}$/;
//   return mobileRegex.test(mobile);
// };

// // Register a new user
// export const registerUser = async (userData: Omit<UserData, 'password'>, password: string): Promise<{ success: boolean; message: string; generatedPassword?: string }> => {
//   try {
//     // Check if user already exists
//     const existingUsers = getUsersFromStorage();
//     const userExists = existingUsers.some(user => user.mobile === userData.mobile);

//     if (userExists) {
//       return { success: false, message: 'Mobile number already registered' };
//     }

//     // Validate mobile number
//     if (!validateMobileNumber(userData.mobile)) {
//       return { success: false, message: 'Invalid mobile number. Must be 10 digits.' };
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(password);

//     // Save user
//     const newUser: UserData = {
//       ...userData,
//       password: hashedPassword,
//     };

//     existingUsers.push(newUser);
//     localStorage.setItem('cataractnet_users', JSON.stringify(existingUsers));

//     return { success: true, message: 'Registration successful', generatedPassword: password };
//   } catch (error) {
//     return { success: false, message: 'Registration failed. Please try again.' };
//   }
// };

// // Login user
// export const loginUser = async (mobile: string, password: string): Promise<{ success: boolean; message: string; user?: UserData }> => {
//   try {
//     // Validate mobile number format
//     if (!validateMobileNumber(mobile)) {
//       return { success: false, message: 'Invalid mobile number format' };
//     }

//     const users = getUsersFromStorage();
//     const hashedPassword = await hashPassword(password);

//     const user = users.find(u => u.mobile === mobile && u.password === hashedPassword);

//     if (user) {
//       // Set current session
//       localStorage.setItem('cataractnet_current_user', JSON.stringify(user));
//       return { success: true, message: 'Login successful', user };
//     } else {
//       return { success: false, message: 'Invalid credentials' };
//     }
//   } catch (error) {
//     return { success: false, message: 'Login failed. Please try again.' };
//   }
// };

// // Logout user
// export const logoutUser = (): void => {
//   localStorage.removeItem('cataractnet_current_user');
// };

// // Get current logged-in user
// export const getCurrentUser = (): UserData | null => {
//   const userStr = localStorage.getItem('cataractnet_current_user');
//   return userStr ? JSON.parse(userStr) : null;
// };

// // Check if user is authenticated
// export const isAuthenticated = (): boolean => {
//   return getCurrentUser() !== null;
// };

// // Get all users from localStorage
// const getUsersFromStorage = (): UserData[] => {
//   const usersStr = localStorage.getItem('cataractnet_users');
//   return usersStr ? JSON.parse(usersStr) : [];
// };

export interface UserData {
  name: string;
  mobile: string;
  gender: string;
  dob: string;
  password: string;
}

// 🔐 Hash Password (SHA-256)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// 🔑 Generate Password
export const generatePassword = (name: string, dob: string): string => {
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  const prefix = cleanName.substring(0, 4).padEnd(4, 'x');
  const year = new Date(dob).getFullYear();

  return prefix.charAt(0).toUpperCase() + prefix.slice(1) + year;
};

// 📱 Validate Mobile
export const validateMobileNumber = (mobile: string): boolean => {
  return /^[0-9]{10}$/.test(mobile);
};

// 📦 Get Users
const getUsersFromStorage = (): UserData[] => {
  const usersStr = localStorage.getItem('cataractnet_users');
  return usersStr ? JSON.parse(usersStr) : [];
};

// 📝 Register
export const registerUser = async (
  userData: Omit<UserData, 'password'>,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const users = getUsersFromStorage();

    if (users.some(u => u.mobile === userData.mobile.trim())) {
      return { success: false, message: 'Mobile number already registered' };
    }

    if (!validateMobileNumber(userData.mobile)) {
      return { success: false, message: 'Invalid mobile number' };
    }

    const hashedPassword = await hashPassword(password);

    const newUser: UserData = {
      ...userData,
      mobile: userData.mobile.trim(),
      password: hashedPassword,
    };

    users.push(newUser);
    localStorage.setItem('cataractnet_users', JSON.stringify(users));

    return { success: true, message: 'Registration successful' };
  } catch {
    return { success: false, message: 'Registration failed' };
  }
};

// 🔐 Login
export const loginUser = async (
  mobile: string,
  password: string
): Promise<{ success: boolean; message: string; user?: UserData }> => {
  try {
    if (!validateMobileNumber(mobile)) {
      return { success: false, message: 'Invalid mobile number format' };
    }

    const users = getUsersFromStorage();
    const hashedPassword = await hashPassword(password);

    const user = users.find(
      u => u.mobile === mobile.trim() && u.password === hashedPassword
    );

    if (!user) {
      return { success: false, message: 'Invalid mobile number or password' };
    }

    // Store session (NO password)
    localStorage.setItem(
  'cataractnet_current_user',
  JSON.stringify(user) // ✅ store full user
);

    return { success: true, message: 'Login successful', user };
  } catch {
    return { success: false, message: 'Login failed' };
  }
};

// 🚪 Logout
export const logoutUser = (): void => {
  localStorage.removeItem('cataractnet_current_user');
};

// 👤 Get Current User
export const getCurrentUser = () => {
  const user = localStorage.getItem('cataractnet_current_user');
  return user ? JSON.parse(user) : null;
};

// ✅ Check Auth
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};