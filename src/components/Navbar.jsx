/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/userSlice";
import { logo } from "../assets";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Ayarlar", href: "/settings" },
  { name: "Oyun", href: "/game" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const { photoURL } = auth.currentUser;
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center hover:scale-110">
                  <NavLink to="/">
                    <img src={logo} alt="logo" className="h-9 w-auto" />
                  </NavLink>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink key={item.name} to={item.href}>
                        <Disclosure.Button
                          className={classNames(
                            pathname === item.href
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block px-3 py-2 rounded-md text-base font-medium"
                          )}
                        >
                          {item.name}
                        </Disclosure.Button>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={photoURL}
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              `block px-4 py-2 text-sm text-gray-700 ${
                                pathname === "/profile" ? "font-semibold" : ""
                              }`
                            )}
                          >
                            Profil
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              `block px-4 py-2 text-sm text-gray-700 ${
                                pathname === "/settings" ? "font-semibold" : ""
                              }`
                            )}
                          >
                            Ayarlar
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Çıkış Yap
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink key={item.name} to={item.href}>
                  <Disclosure.Button
                    className={classNames(
                      pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
