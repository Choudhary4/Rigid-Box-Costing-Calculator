'use client';

import React from 'react';
import { BOARD_TYPES, SHEET_SIZES } from '@/hooks/useBoxCalculator';
import type { BoardCosts, BoardType, BoxInputs } from '@/types/calculator';

interface Props {
  boardCosts: BoardCosts;
  selectedBoard: BoardType;
  selectedSheetKey: 'large' | 'small' | 'custom';
  inputs: BoxInputs;
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-slate-50 rounded border border-slate-200 px-3 py-2">
      <span className="text-xs text-slate-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold text-slate-900 mt-1">{value}</span>
    </div>
  );
}

export default function MaterialMasters({ boardCosts, selectedBoard, selectedSheetKey, inputs }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Board Types */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Board Types Master
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <div className="grid grid-cols-3 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <div className="col-span-2">Type</div>
            <div className="text-right">GSM/mm</div>
          </div>
          <div className="divide-y divide-slate-200">
            {BOARD_TYPES.map((bt) => {
              const isActive = bt.id === selectedBoard.id;
              return (
                <div
                  key={bt.id}
                  className={`grid grid-cols-3 gap-4 px-4 py-3 text-sm transition-colors ${
                    isActive ? 'bg-blue-50/50' : 'bg-white'
                  }`}
                >
                  <div className="col-span-2 font-medium text-slate-900 flex items-center gap-2">
                    {bt.name}
                    {isActive && (
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded tracking-wide">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-right text-slate-600 font-mono">{bt.gsmPerMm}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sheet Sizes */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Standard Sheet Sizes
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {(['large', 'small', 'custom'] as const).map((key) => {
            const isActive = key === selectedSheetKey;
            let sheetName, sheetL, sheetW;
            if (key === 'custom') {
              sheetName = 'Custom';
              sheetL = inputs.customSheetLength;
              sheetW = inputs.customSheetWidth;
            } else {
              const s = SHEET_SIZES[key];
              sheetName = s.name;
              sheetL = s.length;
              sheetW = s.width;
            }

            return (
              <div
                key={key}
                className={`rounded-lg border p-4 text-center shadow-sm transition-colors ${
                  isActive ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isActive ? 'text-blue-700' : 'text-slate-500'
                }`}>
                  {sheetName} Sheet
                </div>
                <div className={`text-lg font-bold font-mono ${
                  isActive ? 'text-blue-900' : 'text-slate-900'
                }`}>
                  {sheetL} × {sheetW}
                </div>
                <div className={`text-sm mt-1 ${
                  isActive ? 'text-blue-600' : 'text-slate-500'
                }`}>inches</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Board Costs (calculated) */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Calculated Board Costs
          <span className="text-slate-500 normal-case tracking-normal font-normal ml-2 text-xs">— {selectedBoard.name}</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InfoChip label="Total GSM" value={`${boardCosts.totalGsm.toFixed(0)} GSM`} />
          <InfoChip label="Thickness" value={`${(boardCosts.totalGsm / selectedBoard.gsmPerMm).toFixed(2)} mm`} />
          <InfoChip label="Cost / Large Sheet" value={`₹${boardCosts.costPerLargeSheet.toFixed(2)}`} />
          <InfoChip label="Cost / Small Sheet" value={`₹${boardCosts.costPerSmallSheet.toFixed(2)}`} />
          {boardCosts.costPerCustomSheet !== undefined && (
            <InfoChip label="Cost / Custom Sheet" value={`₹${boardCosts.costPerCustomSheet.toFixed(2)}`} />
          )}
        </div>
      </div>
    </div>
  );
}
