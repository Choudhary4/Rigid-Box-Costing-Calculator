'use client';

import React from 'react';
import type { BoxInputs } from '@/types/calculator';
import InputField from '@/components/ui/InputField';
import { BOARD_TYPES } from '@/hooks/useBoxCalculator';

interface Props {
  inputs: BoxInputs;
  selectedBoardId: string;
  onInputChange: <K extends keyof BoxInputs>(key: K, value: BoxInputs[K]) => void;
  onBoardChange: (id: string) => void;
}

export default function InputParameters({
  inputs,
  selectedBoardId,
  onInputChange,
  onBoardChange,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Box Dimensions */}
      <div>
        <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-violet-500/50" />
          Box Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InputField id="boxLength" label="Length" value={inputs.boxLength} unit="in" onChange={(v) => onInputChange('boxLength', v)} />
          <InputField id="boxWidth" label="Width" value={inputs.boxWidth} unit="in" onChange={(v) => onInputChange('boxWidth', v)} />
          <InputField id="boxHeight" label="Box Height" value={inputs.boxHeight} unit="in" onChange={(v) => onInputChange('boxHeight', v)} />
          <InputField id="lidHeight" label="Lid Height" value={inputs.lidHeight} unit="in" onChange={(v) => onInputChange('lidHeight', v)} />
        </div>
      </div>

      {/* Board Settings */}
      <div>
        <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-violet-500/50" />
          Board Settings
        </h3>
        <div className="flex flex-col gap-3">
          {/* Board Type Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 tracking-wide uppercase">
              Board Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BOARD_TYPES.map((bt) => (
                <button
                  key={bt.id}
                  onClick={() => onBoardChange(bt.id)}
                  className={`
                    py-2 px-2 rounded-lg text-xs font-semibold border transition-all duration-200
                    ${selectedBoardId === bt.id
                      ? 'bg-violet-500/20 border-violet-500/60 text-violet-300 shadow-lg shadow-violet-500/10'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }
                  `}
                >
                  {bt.id}
                  <div className="text-[10px] font-normal mt-0.5 opacity-70">₹{bt.ratePerKg}/kg</div>
                </button>
              ))}
            </div>
          </div>
          <InputField id="boardThickness" label="Board Thickness" value={inputs.boardThickness} unit="mm" step={0.1} onChange={(v) => onInputChange('boardThickness', v)} />
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-violet-500/50" />
          Production
        </h3>
        <InputField id="quantity" label="Quantity" value={inputs.quantity} unit="boxes" step={100} min={1} onChange={(v) => onInputChange('quantity', v)} />
      </div>

      {/* Allowances */}
      <div>
        <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-violet-500/50" />
          Allowances
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InputField id="lidThicknessAllowance" label="Lid Thickness" value={inputs.lidThicknessAllowance} step={0.1} onChange={(v) => onInputChange('lidThicknessAllowance', v)} />
          <InputField id="boardThicknessAllowance" label="Board Thickness" value={inputs.boardThicknessAllowance} step={0.1} onChange={(v) => onInputChange('boardThicknessAllowance', v)} />
          <InputField id="cuttingAllowance" label="Cutting" value={inputs.cuttingAllowance} step={0.05} onChange={(v) => onInputChange('cuttingAllowance', v)} />
          <InputField id="excessConsideration" label="Outer Paper Excess" value={inputs.excessConsideration} step={0.1} onChange={(v) => onInputChange('excessConsideration', v)} />
        </div>
      </div>

      {/* Cost Inputs */}
      <div>
        <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-violet-500/50" />
          Cost Inputs
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InputField id="totalLabourCost" label="Total Labour" value={inputs.totalLabourCost} unit="₹" step={500} onChange={(v) => onInputChange('totalLabourCost', v)} />
          <InputField id="totalPrintingCost" label="Total Printing" value={inputs.totalPrintingCost} unit="₹" step={500} onChange={(v) => onInputChange('totalPrintingCost', v)} />
          <InputField id="coverPaperCostPerSheet" label="Cover Paper/Sheet" value={inputs.coverPaperCostPerSheet} unit="₹" step={0.5} onChange={(v) => onInputChange('coverPaperCostPerSheet', v)} />
          <InputField id="astarCostPerSheet" label="Astar/Sheet" value={inputs.astarCostPerSheet} unit="₹" step={0.5} onChange={(v) => onInputChange('astarCostPerSheet', v)} />
          <div className="col-span-2">
            <InputField id="marginPercent" label="Margin on Cost" value={inputs.marginPercent} unit="%" step={1} onChange={(v) => onInputChange('marginPercent', v)} />
          </div>
        </div>
      </div>
    </div>
  );
}
