import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        // Add logout logic if needed (e.g., clear tokens)
    };

    return (
        <>
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo Section */}
                        <div className="">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden sm:flex space-x-8">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                            {user.role === 'admin' && (
                                <>
                                    <NavLink href={route('users.index')} active={route().current('users.index')}>
                                        Users
                                    </NavLink>
                                    <NavLink href={route('tasks.index')} active={route().current('tasks.index')}>
                                        Tasks
                                    </NavLink>
                                    <NavLink href={route('projects.index')} active={route().current('projects.index')}>
                                        Projects
                                    </NavLink>
                                    <NavLink href={route('client.index')} active={route().current('client.index')}>
                                        Clients
                                    </NavLink>
                                </>
                            )}
                            {user.role === 'employee' && (
                                <>
                                    <NavLink href={route('tasks.index')} active={route().current('tasks.index')}>
                                        Tasks
                                    </NavLink>
                                    <NavLink href={route('projects.index')} active={route().current('projects.index')}>
                                        Projects
                                    </NavLink>
                                </>
                            )}
                            {user.role === 'client' && (
                                <NavLink href={route('projects.index')} active={route().current('projects.index')}>
                                    Projects
                                </NavLink>
                            )}
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:flex items-center relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}
                                        <svg
                                            className="ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.index')}>Profile</Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Hamburger Menu */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={menuOpen ? 'hidden' : 'inline-flex'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={menuOpen ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown */}
                    {menuOpen && (
                        <div className="sm:hidden">
                            <div className="space-y-1 pb-3 pt-2">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                                {user.role === 'admin' && (
                                    <>
                                        <ResponsiveNavLink href={route('users.index')}>
                                            Users
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('tasks.index')}>
                                            Tasks
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('projects.index')}>
                                            Projects
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('client.index')}>
                                            Clients
                                        </ResponsiveNavLink>
                                    </>
                                )}
                                {user.role === 'employee' && (
                                    <>
                                        <ResponsiveNavLink href={route('tasks.index')}>
                                            Tasks
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink href={route('projects.index')}>
                                            Projects
                                        </ResponsiveNavLink>
                                    </>
                                )}
                                {user.role === 'client' && (
                                    <ResponsiveNavLink href={route('projects.index')}>
                                        Projects
                                    </ResponsiveNavLink>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pb-1 pt-4">
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        <Footer />
        </div>

        </>
    );
}

