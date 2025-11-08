
import React from 'react';
import { RecycleIcon } from './IconComponents';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex items-center justify-center gap-4">
                <RecycleIcon />
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Finnish Waste Sorter
                </h1>
            </div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Confused about recycling? Snap a photo of your waste, and our AI will tell you exactly which bin to use based on Finland's rules.
            </p>
        </header>
    );
}
