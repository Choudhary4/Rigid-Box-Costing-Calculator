'use client';

import React from 'react';
import { useBoxCalculator } from '@/hooks/useBoxCalculator';
import InputParameters from '@/components/calculator/InputParameters';
import MaterialMasters from '@/components/calculator/MaterialMasters';
import CostingSummary from '@/components/calculator/CostingSummary';

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex-1 p-5 overflow-y-auto">{children}</div>
    </div>
  );
}

export default function BoxCalculatorPage() {
  const { 
    inputs, 
    updateInput, 
    selectedBoardId, 
    setSelectedBoardId, 
    selectedSheetKey, 
    setSelectedSheetKey, 
    selectedBoard, 
    result 
  } = useBoxCalculator();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 py-8 flex flex-col gap-6">
        <header className="border-b border-slate-200 pb-6 mb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Rigid Box Costing Calculator
              </h1>
              <p className="mt-1 text-slate-600 text-sm">
                Material estimation & pricing for packaging manufacturing
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white border border-slate-200 rounded px-3 py-1.5 text-sm">
                <span className="text-slate-500 mr-1">Qty:</span>
                <span className="font-semibold text-slate-800">{inputs.quantity.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white border border-slate-200 rounded px-3 py-1.5 text-sm">
                <span className="text-slate-500 mr-1">Board:</span>
                <span className="font-semibold text-slate-800">{selectedBoard.name}</span>
              </div>
              <div className="bg-white border border-slate-200 rounded px-3 py-1.5 text-sm">
                <span className="text-slate-500 mr-1">Per Box:</span>
                <span className="font-semibold text-slate-800">₹{result.costBreakdown.sellingPricePerBox.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded px-3 py-1.5 text-sm text-blue-800">
                <span className="opacity-75 mr-1">Selling Price:</span>
                <span className="font-bold">₹{result.costBreakdown.sellingPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard
            title="Input Parameters"
            subtitle="Box dimensions, board type, quantities & costs"
          >
            <InputParameters
              inputs={inputs}
              selectedBoardId={selectedBoardId}
              selectedSheetKey={selectedSheetKey}
              onInputChange={updateInput}
              onBoardChange={setSelectedBoardId}
              onSheetChange={setSelectedSheetKey}
            />
          </SectionCard>

          <SectionCard
            title="Material Masters"
            subtitle="Standard board rates, GSM data & sheet sizes"
          >
            <MaterialMasters boardCosts={result.boardCosts} selectedBoard={selectedBoard} selectedSheetKey={selectedSheetKey} />
          </SectionCard>

          <SectionCard
            title="Costing Summary"
            subtitle="Calculated dimensions, sheet requirements & final pricing"
          >
            <CostingSummary
              result={result}
              quantity={inputs.quantity}
              totalPrintingCost={inputs.totalPrintingCost}
              totalLabourCost={inputs.totalLabourCost}
              marginOnCost={inputs.marginOnCost}
              marginOnSales={inputs.marginOnSales}
            />
          </SectionCard>
        </main>
      </div>
    </div>
  );
}
