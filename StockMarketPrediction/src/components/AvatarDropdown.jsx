import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AvatarDropdown = () => {
  const { isAuthenticated, logout } = useAuth();
  const userName = isAuthenticated ? 'User' : ''; // Replace 'User' with actual user name if available

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : 'U'; // Default to 'U' if no name

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full cursor-pointer">
          <span className="text-lg font-semibold text-gray-700">{firstLetter}</span>
          <ChevronDown className="ml-2 w-4 h-4 text-gray-700" />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
          <div className="px-4 py-2">
            <span className="block text-sm font-medium text-gray-900">
              {userName}
            </span>
            <span className="block text-xs text-gray-500">Account</span>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AvatarDropdown;

