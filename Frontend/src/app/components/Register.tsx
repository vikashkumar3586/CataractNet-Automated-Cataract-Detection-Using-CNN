import { useState } from 'react';
import { UserPlus, Calendar, User, Phone, Users } from 'lucide-react';
import { registerUser, generatePassword } from '../utils/auth';

interface RegisterProps {
  onLoginClick: () => void;
  onRegisterSuccess: () => void;
}

export function Register({ onLoginClick, onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    dob: '',
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate fields
    if (!formData.name || !formData.mobile || !formData.gender || !formData.dob) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Mobile validation
    if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      setError('Enter valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    // Generate password
    const password = generatePassword(formData.name, formData.dob);

    const result = await registerUser(formData, password);

    if (result.success) {
      setGeneratedPassword(password);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  // ✅ Success Screen
  if (generatedPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">

          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl text-green-600 mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Your account has been created</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Login Credentials:</p>

            <p className="text-xs text-gray-500">Mobile Number</p>
            <p className="text-lg font-mono mb-2">{formData.mobile}</p>

            <p className="text-xs text-gray-500">Generated Password</p>
            <p className="text-2xl font-mono text-blue-600">{generatedPassword}</p>

            <p className="text-xs text-red-600 mt-3">
              ⚠️ Please note this password. It will not be shown again.
            </p>
          </div>

          <button
            onClick={onRegisterSuccess}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ Register Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Register to use CataractNet</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm mb-2 block">
              <User className="inline w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm mb-2 block">
              <Phone className="inline w-4 h-4 mr-2" />
              Mobile Number
            </label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Enter 10-digit number"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm mb-2 block">
              <Users className="inline w-4 h-4 mr-2" />
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm mb-2 block">
              <Calendar className="inline w-4 h-4 mr-2" />
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 p-4 rounded-xl text-sm">
            Password = First 4 letters of name + birth year  
            (e.g., Vikash + 2003 → Vika2003)
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have account?{' '}
          <button onClick={onLoginClick} className="text-blue-600">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}