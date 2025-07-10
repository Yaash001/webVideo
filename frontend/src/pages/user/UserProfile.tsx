import React, { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import { ChangePassword } from '../../components/ChangePassword'; 
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const UserProfile: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [changePass, setChangePass] = useState<boolean>(false);
  const navigate = useNavigate(); // ✅ moved here

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/user/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        const success = data.success ?? data.sucess;

        if (success) {
          setEmail(data.email || '');
        } else {
          toast.warning(data.message || 'Unable to load profile');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        toast.error('Failed to load user data');
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error('Invalid email format');
      return;
    }

    const payload: { email: string; password?: string } = { email };
    const isPasswordChanging = changePass && password.trim();

    if (isPasswordChanging) {
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      payload.password = password.trim();
    }

    try {
      const res = await fetch('http://localhost:8080/api/v1/user/updateprofile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const success = data.success ?? data.sucess;

      if (res.ok && success) {
        if (isPasswordChanging) {
          toast.success('Password changed. Please log in again.');
          localStorage.removeItem('token');
          setTimeout(() => {
            navigate('/sign-in');
          }, 500);
          return;
        }

        toast.success('Profile updated successfully');
        setEdit(false);
        setChangePass(false);
        setPassword('');
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="flex w-full pr-2 h-screen">
      <SideBar />
      <main className="flex-1 ml-5 lg:ml-7 pr-2 z-10">
        <section className="p-4 bg-white shadow-md rounded-lg w-full border border-black mt-7">
          <h1 className="text-center font-bold text-xl text-gray-800 mb-6">
            USER DETAILS
          </h1>
          <div className="flex flex-col gap-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                disabled={!edit}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border rounded-md transition-all 
                  ${edit ? 'border-green-500' : 'border-gray-400'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-100 
                  bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500`}
              />
            </div>

            {/* Password change */}
            {edit && changePass && (
              <ChangePassword password={password} setPassword={setPassword} />
            )}

            {/* Toggle Change Password Button */}
            {edit && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setChangePass((prev) => !prev)}
                  className={`py-3 px-4 rounded-xl text-white ml-2 transition-all
                    ${changePass ? 'bg-red-400 hover:bg-red-600' : 'bg-green-500 hover:bg-green-700'}`}
                >
                  {changePass ? 'Cancel Password Change' : 'Change Password'}
                </button>
              </div>
            )}

            {/* Edit / Save */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={edit ? handleSave : () => setEdit(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-all"
              >
                {edit ? 'Save' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
