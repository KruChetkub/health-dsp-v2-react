import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SummaryCards from './components/SummaryCards';
import TrendChart from './components/TrendChart';
import StatusChart from './components/StatusChart';
import KPITable from './components/KPITable';
import KPIDetail from './components/KPIDetail';

// --- Mock Data (For Preview) ---
const MOCK_DATA = {
  summary: {
    totalScore: 88.5,
    kpiCount: 12,
    achieved: 8,
    needsImprovement: 4
  },
  monthlyTrend: {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    target: [80, 80, 85, 85, 90, 90],
    actual: [75, 82, 84, 88, 86, 92]
  },
  kpiList: [
    { 
      id: 1, name: 'ตัวชี้วัดที่ 006.1: ร้อยละการตรวจติดตามยืนยันวินิจฉัยกลุ่มสงสัยป่วยโรคเบาหวาน', 
      weight: '30%', target: '>= 50', actual: '45.98', percent: 46.0, status: 'สำเร็จ', statusColor: 'green',
      regionalData: [
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
      ]
    },
    { id: 2, name: 'ความพึงพอใจลูกค้า (CSAT)', weight: '20%', target: '90%', actual: '88%', percent: 97.7, status: 'เฝ้าระวัง', statusColor: 'yellow' },
    { id: 3, name: 'จำนวนข้อร้องเรียน (Complaints)', weight: '15%', target: '< 10', actual: '5', percent: 100, status: 'สำเร็จ', statusColor: 'green' },
    { id: 4, name: 'ระยะเวลาส่งมอบงาน (Lead Time)', weight: '20%', target: '3 วัน', actual: '4 วัน', percent: 75, status: 'ต้องปรับปรุง', statusColor: 'red' },
    { id: 5, name: 'อัตราการลาออกของพนักงาน (Turnover)', weight: '15%', target: '< 5%', actual: '2%', percent: 100, status: 'สำเร็จ', statusColor: 'green' }
  ]
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonthYear, setCurrentMonthYear] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null); // New state for drilldown

  // Replace this placeholder with your actual Google Apps Script Web App URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6I9Bov0eKFWhjQbxFc3brX65UwcNbXuwHnqhLI-GREHTxYm_NxxOKQ4SqPSp9GxUD6A/exec';

  useEffect(() => {
    // Set current date text
    const dateOptions = { year: 'numeric', month: 'long' };
    setCurrentMonthYear(`ภาพรวมผลการดำเนิน (${new Date().toLocaleDateString('th-TH', dateOptions)})`);

    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setSelectedKPI(null); // Reset selection on reload

    try {
      if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE') {
          console.log("Using mock data. Please set SCRIPT_URL to your Google Apps Script Web App URL");
          setData(MOCK_DATA);
      } else {
          // Fetch from Google Apps Script API
          const response = await fetch(SCRIPT_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData = await response.json();
          // Check if gs returns an error object
          if (jsonData.error) {
              throw new Error(jsonData.error);
          }

          // --- WORKAROUND: Inject Mock Regional Data for KPI 1 ---
          // Since the Google Sheet 'RegionalData' might not be fully populated yet,
          // we inject mock data for the first KPI so the user can test the drilldown feature.
          if (jsonData.kpiList && jsonData.kpiList.length > 0) {
              const kpi1 = jsonData.kpiList.find(k => k.id === '1' || k.id === 1);
              if (kpi1 && (!kpi1.regionalData || kpi1.regionalData.length === 0)) {
                  kpi1.regionalData = [
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
              }
          }
          // --------------------------------------------------------

          setData(jsonData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setData(MOCK_DATA); 
      setError(`ไม่สามารถดึงข้อมูลจาก Server ได้ (${err.message}). ดึงข้อมูลจำลองมาแสดงผลแทน`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRowClick = (kpi) => {
    setSelectedKPI(kpi);
  };

  const handleBackToDashboard = () => {
    setSelectedKPI(null);
  };

  return (
    <div className="text-gray-800 h-screen flex overflow-hidden bg-gray-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar 
            currentMonthYear={currentMonthYear} 
            onRefresh={handleRefresh} 
            onToggleSidebar={toggleSidebar}
        />

        <div className="flex-1 overflow-y-auto p-6 relative">
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
                <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center">
              <div className="loader mb-4"></div>
              <p className="text-gray-600 font-medium">กำลังโหลดข้อมูล...</p>
            </div>
          )}

          {data && !loading && (
            selectedKPI ? (
                // --- KPI Detail View ---
                <KPIDetail kpi={selectedKPI} onBack={handleBackToDashboard} />
            ) : (
                // --- Main Dashboard View ---
                <div className="animate-fade-in-up">
                  <SummaryCards summary={data.summary} />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <TrendChart trendData={data.monthlyTrend} />
                    <StatusChart kpiList={data.kpiList} />
                  </div>

                  <KPITable kpiList={data.kpiList} onRowClick={handleRowClick} />

                  <div className="mt-6 text-center text-sm text-gray-400 pb-4">
                    ระบบจัดการ KPI พัฒนาด้วย React & Tailwind
                  </div>
                </div>
            )
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
