import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { toast } from 'sonner';
import type { AuthFormData } from '../../types';
import type { Dispatch } from '../../reducer/store';
import { signUpUser } from '../../reducer/auth/authReducer';

export const SignUp: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try{
        const res =  await dispatch(signUpUser(formData)).unwrap();

        if (res.success) {
          toast.success('Account created! Redirecting to login...');
    setTimeout(() => {
      window.location.href = '/sign-in';
      setIsSubmitting(false)
    }, 2000);

        } else {
          toast.error(res.message || 'Signup failed');
          setIsSubmitting(false)

        }
    }
    catch (err: any) {
  toast.error(err?.message ?? err ?? 'Something went wrong');
  setIsSubmitting(false)

}

   
    
  };

  return (
    <Layout>
      <div className="flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <h1 className="text-4xl font-bold text-center text-gray-700 mb-7 capitalize">
            Join Us Today
          </h1>

          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email"
                required
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md shadow-md focus:border-gray-800 sm:text-sm mb-5"
              />

              {/* Pass */}
              <label className="block text-sm font-medium text-gray-500" htmlFor="password">
                Password
              </label>
              <div className="relative mb-5">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  placeholder="Enter Password"
                  required
                  onChange={handleChange}
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

              {/* Confirm  */}
              <label className="block text-sm font-medium text-gray-500" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 pr-10 rounded-md shadow-md focus:border-gray-800 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit  */}
            <button
  type="submit"
  disabled={isSubmitting}
  className="w-full py-3 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md shadow-sm transition duration-100 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 capitalize"
>
  {isSubmitting ? (
    <>
      <FiLoader className="animate-spin" size={18} />
      Signing up...
    </>
  ) : (
    'Sign Up'
  )}
</button>

          </form>

          <div className="mt-4 text-center">
            Already have an account? <br />
            <Link
              to="/sign-in"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300"
            >
              Sign in here!
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
