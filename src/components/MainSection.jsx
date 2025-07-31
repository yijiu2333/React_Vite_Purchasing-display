import React from 'react';
import ProjectTable from './ProjectTable'
import MonthlyTable from './MonthlyTable'
import MaterialCostPieChart from './MaterialCostPieChart';
import CompletionRateChart from './CompletionRateChart';

// import { Card } from 'antd';

export default function MainSection() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProjectTable />
        </div>
        <div className="col-span-1">
          <CompletionRateChart />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <MonthlyTable />
        </div>
        <div className="col-span-1">
          <MaterialCostPieChart />
        </div>
      </div>
    </div>
  );
}
