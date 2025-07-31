import React from 'react';

export default function ReportTable() {
  // 模拟数据
  const projects = [
    {
      name: '年度降本',
      target: "完成采购额2.5%",
      weight: "30%",
      monthlyData: [185.87, 60.41, 59.68, 51.80, "", "", "", "", "", "", "", ""],
      sum: 357.76
    },
    {
      name: '目标1',
      target: "<=600",
      weight: "15%",
      monthlyData: [266, 396, 381, 345, "", "", "", "", "", "", "", ""],
      sum: 347
    },
    {
      name: '目标2',
      target: "<=45",
      weight: "10%",
      monthlyData: [41, 45, 39, 42, "", "", "", "", "", "", "", ""],
      sum: 42
    },
    {
      name: '目标3',
      target: "100%",
      weight: "10%",
      monthlyData: ["100%", "100%", "100%", "100%", "", "", "", "", "", "", "", ""],
      sum: "100%"
    },
    {
      name: '目标4',
      target: "100%",
      weight: "15%",
      monthlyData: ["99.9%", "100%", "99.8%", "99.9%", "", "", "", "", "", "", "", ""],
      sum: "99.9%"
    },
    {
      name: '重点工作',
      target: "100%",
      weight: "10%",
      monthlyData: ["100%", "100%", "100%", "100%", "", "", "", "", "", "", "", ""],
      sum: "100%"
    },
    {
      name: '综合目标',
      target: ">=6",
      weight: "10%",
      monthlyData: ["/", "/", "1", "/", "", "", "", "", "", "", "", ""],
      sum: 1
    }
  ];

  const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    // <div className="p-4 bg-white rounded-lg shadow">
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        <i className="fa fa-chart-bar text-warning mr-2"></i>
        采购部KPI完成情况汇总
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/60">
            <tr>
              <th className="px-2 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider max-w-[120px] truncate">项目</th>
              <th className="px-2 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider max-w-[100px] truncate">目标值</th>
              <th className="px-2 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider max-w-[50px] truncate">权重</th>
              {labels.map((label, index) => (
                <th key={index} className="px-2 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider max-w-[50px] truncate">{label}</th>
              ))}
              <th className="px-2 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider max-w-[50px] truncate">合计</th>
            </tr>
          </thead>
          {/* <tbody className="bg-white divide-y divide-gray-200"> */}
          <tbody className="bg-white/30 divide-y divide-gray-200">
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="px-2 py-4 whitespace-nowrap text-base font-bold text-gray-900 tracking-wider max-w-[120px] truncate">{project.name}</td>
                <td className="px-2 py-4 whitespace-nowrap text-base font-bold text-gray-500 tracking-wider max-w-[100px] truncate">{project.target}</td>
                <td className="px-2 py-4 whitespace-nowrap text-base font-bold text-gray-500 tracking-wider max-w-[50px] truncate">{project.weight}</td>
                {project.monthlyData.map((value, idx) => (
                  <td key={idx} className="px-2 py-4 whitespace-nowrap text-base font-bold text-gray-500 max-w-[50px] truncate">{value}</td>
                ))}
                <td className="px-2 py-4 whitespace-nowrap text-base font-bold text-gray-500 max-w-[50px] truncate">{project.sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
