import React from 'react';

export default function ReportTable() {
  // 模拟数据
  const projects = [
    {
      name: '魔法甜面包',
      monthlyData: [8.56, 6.11, 2.67, 2.42, "", "", "", "", "", "", "", ""],
    },
    {
      name: '传送门符文',
      monthlyData: [94.40, 8.02, 22.83, 14.60, "", "", "", "", "", "", "", ""],
    },
    {
      name: '传送符文',
      monthlyData: [25.94, 16.28, 3.70, 4.59, "", "", "", "", "", "", "", ""],
    },
    {
      name: '水晶瓶',
      monthlyData: [24.65, 18.96, 11.48, 1.58, "", "", "", "", "", "", "", ""],
    },
    {
      name: '橡树子',
      monthlyData: [2.39, 0.00, 0.00, 1.65, "", "", "", "", "", "", "", ""],
    },
    {
      name: '魔粉',
      monthlyData: [29.93, 11.04, 19.00, 26.96, "", "", "", "", "", "", "", ""],
    },
    {
      name: '合计',
      monthlyData: [185.87, 60.41, 59.68, 51.80, "", "", "", "", "", "", "", ""],
    }
  ];

  const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-6">
    {/* <div className="p-4 bg-white rounded-lg shadow"> */}
      
      <h2 className="text-xl font-bold mb-4">
        <i className="fa fa-chart-bar text-warning mr-2"></i>
        采购部KPI完成情况
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/60">
            <tr>
              <th className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">项目</th>
              {labels.map((label, index) => (
                <th key={index} className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/30 divide-y divide-gray-200">
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900">{project.name}</td>
                {project.monthlyData.map((value, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-500">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
