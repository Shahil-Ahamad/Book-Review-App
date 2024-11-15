import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import { User } from "./auth/user";
import { Link } from "react-router-dom";
import { Logout } from "./auth/logout";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Dashboard", href: "/dashboard", current: false },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-amber-100 to-amber-200 min-h-screen flex flex-col">
      <Disclosure as="nav" className="bg-amber-800 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img
                  alt="Book Review App"
                  src="Logo.png"
                  className="rounded-full"
                />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={clsx(
                        item.current
                          ? "bg-amber-700 text-white"
                          : "text-white hover:bg-amber-500 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-amber-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600">
                      <User />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <MenuItem>
                      <Logout />
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-amber-600 p-2 text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600">
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <div>
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={clsx(
                    item.current
                      ? "bg-amber-700 text-white"
                      : "text-white hover:bg-amber-500",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              </div>
            ))}
            <div className="ml-4 flex items-center md:ml-6">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-amber-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600">
                    <User />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <MenuItem>
                    <Logout />
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            {/* Add User/Logout buttons for mobile */}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-7xl">{children}</div>
        <Toaster />
      </main>

      {/* Footer */}
      <footer className="bg-amber-800 text-white shadow-inner mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Book Review App</h2>
            <p className="text-sm">
              Discover, review, and share your favorite books with the world.
            </p>
          </div>
          <div>
            <p className="text-sm">
              © 2024 Shahil Ahamad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
