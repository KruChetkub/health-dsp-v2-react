import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ kpiList }) => {
    if (!kpiList || kpiList.length === 0) return null;

    let success = 0, warning = 0, danger = 0;
    kpiList.forEach(kpi => {
        if (kpi.statusColor === 'green') success++;
        else if (kpi.statusColor === 'yellow') warning++;
        else if (kpi.statusColor === 'red') danger++;
    });

    const data = {
        labels: ['สำเร็จ (On Track)', 'เฝ้าระวัง (Warning)', 'ต้องปรับปรุง (Danger)'],
        datasets: [{
            data: [success, warning, danger],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], // emerald, amber, red
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { display: false },
            tooltip: {
                titleFont: { family: 'Prompt' },
                bodyFont: { family: 'Prompt' }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">สถานะ KPI ทั้งหมด</h3>
            <div className="relative h-64 w-full flex justify-center">
                <Doughnut data={data} options={options} />
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-sm">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>สำเร็จ ({success})</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>เฝ้าระวัง ({warning})</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>ปรับปรุง ({danger})</div>
            </div>
        </div>
    );
};

export default StatusChart;
