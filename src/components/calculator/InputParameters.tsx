'use client';

import React from 'react';
import type { BoxInputs } from '@/types/calculator';
import InputField from '@/components/ui/InputField';
import { BOARD_TYPES } from '@/hooks/useBoxCalculator';

interface Props {
  inputs: BoxInputs;
  selectedBoardId: string;
  selectedSheetKey: 'large' | 'small';
  onInputChange: <K extends keyof BoxInputs>(key: K, value: BoxInputs[K]) => void;
  onBoardChange: (id: string) => void;
  onSheetChange: (key: 'large' | 'small') => void;
}

export default function InputParameters({
  inputs,
  selectedBoardId,
  selectedSheetKey,
  onInputChange,
  onBoardChange,
  onSheetChange,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Box Dimensions */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Box Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <InputField id="boxLength" label="Length" value={inputs.boxLength} unit="in" onChange={(v) => onInputChange('boxLength', v)} />
          <InputField id="boxWidth" label="Width" value={inputs.boxWidth} unit="in" onChange={(v) => onInputChange('boxWidth', v)} />
          <InputField id="boxHeight" label="Box Height" value={inputs.boxHeight} unit="in" onChange={(v) => onInputChange('boxHeight', v)} />
          <InputField id="lidHeight" label="Lid Height" value={inputs.lidHeight} unit="in" onChange={(v) => onInputChange('lidHeight', v)} />
        </div>
      </div>

      {/* Board Settings */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Board Settings
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Board Type</label>
            <div className="grid grid-cols-3 gap-3">
              {BOARD_TYPES.map((bt) => (
                <button
                  key={bt.id}
                  onClick={() => onBoardChange(bt.id)}
                  className={`
                    py-2 px-3 rounded-md text-sm border transition-colors text-center
                    ${selectedBoardId === bt.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                      : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
                    }
                  `}
                >
                  <div>{bt.id}</div>
                  <div className={`text-xs mt-0.5 ${selectedBoardId === bt.id ? 'text-blue-600' : 'text-slate-500'}`}>₹{bt.ratePerKg}/kg</div>
                </button>
              ))}
            </div>
          </div>
          <InputField id="boardThickness" label="Board Thickness" value={inputs.boardThickness} unit="mm" step={0.1} onChange={(v) => onInputChange('boardThickness', v)} />
          
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-sm font-medium text-slate-700">Sheet Size</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'large' as const, name: 'Large', size: '31×41' },
                { id: 'small' as const, name: 'Small', size: '25×36' },
              ].map((sheet) => (
                <button
                  key={sheet.id}
                  onClick={() => onSheetChange(sheet.id)}
                  className={`
                    py-2 px-3 rounded-md text-sm border transition-colors text-center
                    ${selectedSheetKey === sheet.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                      : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
                    }
                  `}
                >
                  <div>{sheet.name}</div>
                  <div className={`text-xs mt-0.5 ${selectedSheetKey === sheet.id ? 'text-blue-600' : 'text-slate-500'}`}>{sheet.size}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Production
        </h3>
        <InputField id="quantity" label="Quantity" value={inputs.quantity} unit="boxes" step={100} min={1} onChange={(v) => onInputChange('quantity', v)} />
      </div>

      {/* Allowances */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Allowances
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <InputField id="lidThicknessAllowance" label="Lid Thickness" value={inputs.lidThicknessAllowance} step={0.1} onChange={(v) => onInputChange('lidThicknessAllowance', v)} />
          <InputField id="boardThicknessAllowance" label="Board Thickness" value={inputs.boardThicknessAllowance} step={0.1} onChange={(v) => onInputChange('boardThicknessAllowance', v)} />
          <InputField id="cuttingAllowance" label="Cutting" value={inputs.cuttingAllowance} step={0.05} onChange={(v) => onInputChange('cuttingAllowance', v)} />
          <InputField id="excessConsideration" label="Outer Paper Excess" value={inputs.excessConsideration} step={0.1} onChange={(v) => onInputChange('excessConsideration', v)} />
        </div>
      </div>

      {/* Cost Inputs */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Cost Inputs
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <InputField id="totalLabourCost" label="Total Labour" value={inputs.totalLabourCost} unit="₹" step={500} onChange={(v) => onInputChange('totalLabourCost', v)} />
          <InputField id="totalPrintingCost" label="Total Printing" value={inputs.totalPrintingCost} unit="₹" step={500} onChange={(v) => onInputChange('totalPrintingCost', v)} />
          <InputField id="coverPaperCostPerSheet" label="Cover Paper/Sheet" value={inputs.coverPaperCostPerSheet} unit="₹" step={0.5} onChange={(v) => onInputChange('coverPaperCostPerSheet', v)} />
          <InputField id="astarCostPerSheet" label="Astar/Sheet" value={inputs.astarCostPerSheet} unit="₹" step={0.5} onChange={(v) => onInputChange('astarCostPerSheet', v)} />
          <InputField id="marginOnCost" label="Margin on Cost" value={inputs.marginOnCost} unit="%" step={1} onChange={(v) => onInputChange('marginOnCost', v)} />
          <InputField id="marginOnSales" label="Margin on Sales" value={inputs.marginOnSales} unit="%" step={1} onChange={(v) => onInputChange('marginOnSales', v)} />
        </div>
      </div>
    </div>
  );
}
