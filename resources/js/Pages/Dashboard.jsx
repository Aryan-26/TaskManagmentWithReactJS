import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen"> {/* Ensures the entire page takes at least the full height */}
            <Navbar />

            <main className="flex-grow"> {/* Ensures that the content section grows to take available space */}
                {/* Your main content goes here */}
            </main>

            <Footer className="bg-gray-800 text-white py-4 mt-auto" /> {/* Sticks the footer to the bottom */}
        </div>
    );
}
