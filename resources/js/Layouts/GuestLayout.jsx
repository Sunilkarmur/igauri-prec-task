import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import NavLink from "@/Components/NavLink.jsx";

export default function Guest({ header, cartCount = 0, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('products.index')} active={route().current('products.index')}>
                                    Products
                                </NavLink>
                                <NavLink href={route('cart.index')} active={route().current('products.index')}>
                                    Cart {cartCount>0?'('+cartCount+')':''}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
