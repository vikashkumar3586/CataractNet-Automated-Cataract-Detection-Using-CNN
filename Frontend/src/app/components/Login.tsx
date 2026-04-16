import { useState } from 'react';
import { LogIn, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../utils/auth';

interface LoginProps {
  onRegisterClick: () => void;
  onLoginSuccess: () => void;
}

export function Login({ onRegisterClick, onLoginSuccess }: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // ✅ Validate empty
    if (!mobile || !password) {
      setError('Please enter both mobile number and password');
      setLoading(false);
      return;
    }

    // ✅ Validate mobile format
    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      setError('Enter valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    // ✅ Trim inputs (important)
    const result = await loginUser(mobile.trim(), password.trim());

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.message || 'Invalid mobile number or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to CataractNet</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Mobile */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Mobile Number (Login ID)
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onRegisterClick}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
            </button>
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> Password format is First 4 characters of your name + Year of birth
            <br />
            (e.g., Vika2003)
          </p>
        </div>
      </div>
    </div>
  );
}