import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Link, useNavigate } from 'react-router-dom'; 
import { signInUser } from '../../reducer/auth/authReducer';
import { useDispatch } from 'react-redux';
import type { Dispatch } from '../../reducer/store';
import type { AuthFormData } from '../../types';
import { toast } from 'sonner';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const SignIn: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }


    setIsSubmitting(true);

    const resultAction = await dispatch(signInUser({ email, password }));
    setIsSubmitting(false);

    if (signInUser.fulfilled.match(resultAction)) {
      navigate('/user-profile');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <h1 className="text-4xl font-bold text-center text-gray-700 mb-7">Login</h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md shadow-md focus:border-gray-800 sm:text-sm mb-5"
              />

              <label className="block text-sm font-medium text-gray-500" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  className="mt-1 block w-full px-4 py-3 pr-10 rounded-md shadow-md focus:border-gray-800 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mb-5 py-4 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md shadow-sm transition duration-100 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center capitalize"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            Don’t have an account?
            <br />
            <Link
              to="/sign-up"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300"
            >
              Sign up for Free
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
