import React from 'react';

const Topbar = ({ currentMonthYear, onRefresh, onToggleSidebar }) => {
    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
            <div className="flex items-center">
                <button 
                    onClick={onToggleSidebar}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <h1 className="ml-4 text-xl font-bold text-gray-800">KPI SYSTEM</h1>
            </div>
            <div className="hidden md:block">
                <h2 className="text-xl font-semibold text-gray-800">{currentMonthYear}</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={onRefresh}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                    </svg>
                    อัปเดตข้อมูล
                </button>
            </div>
        </header>
    );
};

export default Topbar;
