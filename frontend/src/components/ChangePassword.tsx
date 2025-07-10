// components/ChangePassword.tsx
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface Props {
  password: string;
  setPassword: (val: string) => void;
}

export const ChangePassword: React.FC<Props> = ({ password, setPassword }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label htmlFor="password" className="font-medium text-gray-400 block mb-1">
        New Password
      </label>
      <input
        type={show ? 'text' : 'password'}
        name="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 pr-10 border border-green-500 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-100"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-800"
      >
        {show ? <IoEye  size={20}/>  : <IoEyeOff size={20} />}
      </button>
    </div>
  );
};
