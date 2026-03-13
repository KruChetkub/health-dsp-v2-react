import React from 'react';

const KPITable = ({ kpiList, onRowClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800">รายละเอียดตัวชี้วัด (KPIs)</h3>
                <div className="relative">
                    <input type="text" placeholder="ค้นหา KPI..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                            <th className="p-4 font-semibold w-24 text-center">รหัส</th>
                            <th className="p-4 font-semibold text-left">ชื่อตัวชี้วัด (KPI)</th>
                            <th className="p-4 font-semibold w-16 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {kpiList.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-500">
                                    ไม่มีข้อมูลแสดงผล
                                </td>
                            </tr>
                        ) : (
                            kpiList.map((kpi, index) => (
                                <tr 
                                    key={kpi.id || index} 
                                    className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    onClick={() => onRowClick && onRowClick(kpi)}
                                >
                                    <td className="p-5 text-center text-gray-500 font-medium border-r border-gray-50">{kpi.id}</td>
                                    <td className="p-5 font-medium text-gray-800 border-r border-gray-50">{kpi.name}</td>
                                    <td className="p-5 text-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                        <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KPITable;
