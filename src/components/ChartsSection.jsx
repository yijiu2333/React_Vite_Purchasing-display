import React from 'react';
import CostReductionChart from './CompletionRateChart';
import MaterialCostPieChart from './MaterialCostPieChart';

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <CostReductionChart />
      <MaterialCostPieChart />
    </div>
  );
}