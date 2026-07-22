'use client';

import React from 'react';
import { BOARD_TYPES, SHEET_SIZES } from '@/hooks/useBoxCalculator';
import type { BoardCosts, BoardType } from '@/types/calculator';

interface Props {
  boardCosts: BoardCosts;
  selectedBoard: BoardType;
  selectedSheetKey: 'large' | 'small';
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-slate-50 rounded border border-slate-200 px-3 py-2">
      <span className="text-xs text-slate-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold text-slate-900 mt-1">{value}</span>
    </div>
  );
}

export default function MaterialMasters({ boardCosts, selectedBoard, selectedSheetKey }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Board Types */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Board Types Master
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-slate-700 font-medium">Type</th>
                <th className="text-right px-4 py-3 text-slate-700 font-medium">GSM/mm</th>
                <th className="text-right px-4 py-3 text-slate-700 font-medium">Rate/kg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {BOARD_TYPES.map((bt) => (
                <tr
                  key={bt.id}
                  className={bt.id === selectedBoard.id ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}
                >
                  <td className="px-4 py-3 text-slate-900 font-medium flex items-center gap-2">
                    {bt.name}
                    {bt.id === selectedBoard.id && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-700">{bt.gsmPerMm}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-700">₹{bt.ratePerKg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sheet Sizes */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Standard Sheet Sizes
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(SHEET_SIZES).map(([key, sheet]) => {
            const isActive = key === selectedSheetKey;
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
                  {sheet.name} Sheet
                </div>
                <div className={`text-lg font-bold font-mono ${
                  isActive ? 'text-blue-900' : 'text-slate-900'
                }`}>
                  {sheet.length} × {sheet.width}
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
        </div>
      </div>
    </div>
  );
}
