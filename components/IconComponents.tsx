
import React from 'react';

export const UploadIcon: React.FC = () => (
    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
    </svg>
);

export const RecycleIcon: React.FC = () => (
    <svg className="w-12 h-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.37 6.22c-1.3-1.8-3.24-2.92-5.37-3.14M5.63 17.78c1.3 1.8 3.24 2.92 5.37 3.14M21 12H8m1-7l-4 4-4-4" transform="rotate(120 12 12)"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h13m-1 7l4-4 4 4" transform="rotate(-120 12 12)"/>
    </svg>
);
