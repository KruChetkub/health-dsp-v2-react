import React from 'react';

const SummaryCards = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover flex items-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">KPI</p>
                    <h3 className="text-2xl font-bold text-gray-800">{summary.totalScore}%</h3>
                </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover flex items-center">
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">ตัวชี้วัดทั้งหมด</p>
                    <h3 className="text-2xl font-bold text-gray-800">{summary.kpiCount} <span className="text-sm font-normal text-gray-500">รายการ</span></h3>
                </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover flex items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">บรรลุเป้าหมาย</p>
                    <h3 className="text-2xl font-bold text-gray-800">{summary.achieved} <span className="text-sm font-normal text-gray-500">รายการ</span></h3>
                </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover flex items-center">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">ต้องปรับปรุง</p>
                    <h3 className="text-2xl font-bold text-gray-800">{summary.needsImprovement} <span className="text-sm font-normal text-gray-500">รายการ</span></h3>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
