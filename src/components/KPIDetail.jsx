import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const KPIDetail = ({ kpi, onBack }) => {
    if (!kpi) return null;

    // Default mock data if no regional data is provided yet
    const regionalData = kpi.regionalData && kpi.regionalData.length > 0
        ? kpi.regionalData
        : [
            { region: 'เขตฯ 01', score: 45.98 },
            { region: 'เขตฯ 02', score: 66.97 },
            { region: 'เขตฯ 03', score: 62.01 },
            { region: 'เขตฯ 04', score: 64.69 },
            { region: 'เขตฯ 05', score: 61.10 },
            { region: 'เขตฯ 06', score: 60.21 },
            { region: 'เขตฯ 07', score: 52.36 },
            { region: 'เขตฯ 08', score: 64.90 },
            { region: 'เขตฯ 09', score: 55.79 },
            { region: 'เขตฯ 10', score: 55.64 },
            { region: 'เขตฯ 11', score: 57.09 },
            { region: 'เขตฯ 12', score: 66.56 },
            { region: 'เขตฯ 13', score: 0.00 }
        ];

    // Helper to evaluate if a score meets the target string
    const evaluateTarget = (score, targetStr) => {
        const numScore = parseFloat(score);
        if (isNaN(numScore)) return null;

        if (!targetStr) return true; // Default pass

        // Clean target string (remove common text, commas, percents)
        const cleanTarget = targetStr.toString().replace(/,/g, '').replace(/%/g, '').replace(/วัน/g, '').trim();
        
        const gteMatch = cleanTarget.match(/^>=\s*([\d.]+)/);
        const lteMatch = cleanTarget.match(/^<=\s*([\d.]+)/);
        const gtMatch = cleanTarget.match(/^>\s*([\d.]+)/);
        const ltMatch = cleanTarget.match(/^<\s*([\d.]+)/);
        
        let isPass = true;

        if (gteMatch) {
            isPass = numScore >= parseFloat(gteMatch[1]);
        } else if (lteMatch) {
             isPass = numScore <= parseFloat(lteMatch[1]);
        } else if (gtMatch) {
             isPass = numScore > parseFloat(gtMatch[1]);
        } else if (ltMatch) {
             isPass = numScore < parseFloat(ltMatch[1]);
        } else {
             // If just a number, assume >= is required
             const numTarget = parseFloat(cleanTarget);
             if (!isNaN(numTarget)) {
                 isPass = numScore >= numTarget;
             }
        }
        return isPass;
    };

    // Chart Configuration
    const chartLabels = regionalData.map(d => d.region.replace('เขตฯ ', 'เขต '));
    const chartDataValues = regionalData.map(d => parseFloat(d.score) || 0);
    
    // Dynamic Colors based on Target
    const backgroundColors = chartDataValues.map(score => {
        const pass = evaluateTarget(score, kpi.target);
        if (pass === null) return 'rgba(59, 130, 246, 0.8)'; // default blue
        return pass ? 'rgba(16, 185, 129, 0.8)' : 'rgba(250, 204, 21, 0.8)'; // Emerald (Green) or Yellow
    });

    const borderColors = chartDataValues.map(score => {
        const pass = evaluateTarget(score, kpi.target);
        if (pass === null) return '#2563eb'; // default blue
        return pass ? '#059669' : '#eab308'; // Emerald boundary or Yellow boundary
    });

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'ผลงานรายเขต',
                data: chartDataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                titleFont: { family: 'Prompt' },
                bodyFont: { family: 'Prompt' },
                callbacks: {
                    label: function(context) {
                        return `ผลการดำเนินงาน: ${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: { font: { family: 'Prompt' } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { family: 'Prompt' }, maxRotation: 45, minRotation: 45 }
            }
        }
    };

    return (
        <div className="animate-fade-in-up">
            {/* Header & Back Button */}
            <div className="flex items-center mb-6">
                <button 
                    onClick={onBack}
                    className="flex items-center text-sm font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors mr-4"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    กลับสู่ภาพรวม
                </button>
                <h2 className="text-xl font-bold text-gray-800">รายละเอียด: {kpi.name}</h2>
            </div>

            {/* KPI Summary Banner */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">เป้าหมาย (Target)</p>
                    <p className="text-xl font-bold text-gray-800">{kpi.target}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-500 mb-1">ผลรวมภาพรวม (Actual)</p>
                    <p className="text-xl font-bold text-blue-600">{kpi.actual}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-500 mb-1">ความสำเร็จ</p>
                    <p className="text-xl font-bold text-emerald-600">{kpi.percent}%</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                        kpi.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                        kpi.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                        สถานะ: {kpi.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">กราฟเปรียบเทียบผลงานรายเขต</h3>
                    <div className="relative h-80 w-full">
                        <Bar options={chartOptions} data={chartData} />
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-sm font-bold text-gray-800">ข้อมูลรายเขต</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-white shadow-sm">
                                <tr className="text-xs text-gray-500 border-b border-gray-100">
                                    <th className="p-3 font-semibold">เขต</th>
                                    <th className="p-3 font-semibold text-right">ผลการดำเนินงาน</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {regionalData.map((row, i) => {
                                    const pass = evaluateTarget(row.score, kpi.target);
                                    let textColorClass = 'text-blue-600'; // Default
                                    if (pass === true) textColorClass = 'text-emerald-600';
                                    else if (pass === false) textColorClass = 'text-yellow-600';

                                    return (
                                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="p-3 font-medium text-gray-700">{row.region}</td>
                                            <td className={`p-3 text-right font-medium ${textColorClass}`}>{row.score}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default KPIDetail;
