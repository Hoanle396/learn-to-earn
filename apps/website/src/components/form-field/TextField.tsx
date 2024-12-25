import { cn } from '@/libs/utils';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

const TextField = ({ label, type, className, placeholder, ...props }: Props) => {
  return (
    <div className='w-full'>
      {label && <label className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>}
      <input
        className={cn(
          'text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100 block p-3',
          className
        )}
        placeholder={placeholder}
        type={type}
        {...props}
        // id='unique-input'
      />
    </div>
  );
};

export default TextField;
