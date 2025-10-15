"use client"
import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    showMessage(data.message || data.error, res.ok ? 'success' : 'error');
    if (res.ok) {
      setEmail('');
      setPassword('');
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      showMessage('Login successful', 'success');
    } else {
      showMessage(data.error, 'error');
    }
  };

  const getApiKey = async () => {
    setMessage('');
    const res = await fetch(`${API_BASE}/auth/apikey`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.apiKey) {
      setApiKey(data.apiKey);
      showMessage('API Key fetched successfully', 'success');
    } else {
      showMessage(data.error, 'error');
    }
  };

  const handleToggle = (signUp: boolean) => {
    setIsSignUp(signUp);
    setMessage('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
          {/* Toggle Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleToggle(false)}
              className={`flex-1 py-4 text-center font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                !isSignUp
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleToggle(true)}
              className={`flex-1 py-4 text-center font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                isSignUp
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSignUp
                ? 'Sign up to get started with your API key'
                : 'Sign in to access your account'}
            </p>

            <form onSubmit={isSignUp ? register : login} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-600">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-4 p-4 rounded-lg transition-all duration-300 ${
                  messageType === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>

        {/* API Key Section */}
        {token && (
          <div className="mt-6 bg-white rounded-2xl shadow-2xl p-8 opacity-0 animate-[slideUp_0.3s_ease-out_forwards]"
               style={{ 
                 animation: 'slideUp 0.3s ease-out forwards',
                 animationDelay: '0.1s'
               }}>
            <style jsx>{`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              API Key Management
            </h3>
            
            <button
              onClick={getApiKey}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Generate API Key
            </button>

            {apiKey && (
              <div className="mt-4 transition-all duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your API Key
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm break-all relative group">
                  {apiKey}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      showMessage('API Key copied to clipboard!', 'success');
                    }}
                    className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
