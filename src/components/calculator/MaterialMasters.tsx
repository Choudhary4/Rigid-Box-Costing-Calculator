'use client';

import React from 'react';
import { BOARD_TYPES, SHEET_SIZES } from '@/hooks/useBoxCalculator';
import type { BoardCosts, BoardType } from '@/types/calculator';

interface Props {
  boardCosts: BoardCosts;
  selectedBoard: BoardType;
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/40">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export default function MaterialMasters({ boardCosts, selectedBoard }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Board Types */}
      <div>
        <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-emerald-500/50" />
          Board Types Master
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-3 py-2.5 text-xs text-slate-400 font-medium">Type</th>
                <th className="text-right px-3 py-2.5 text-xs text-slate-400 font-medium">GSM/mm</th>
                <th className="text-right px-3 py-2.5 text-xs text-slate-400 font-medium">Rate/kg</th>
              </tr>
            </thead>
            <tbody>
              {BOARD_TYPES.map((bt, i) => (
                <tr
                  key={bt.id}
                  className={`
                    border-t border-slate-700/30
                    ${bt.id === selectedBoard.id ? 'bg-emerald-500/10' : i % 2 === 0 ? 'bg-slate-900/20' : ''}
                  `}
                >
                  <td className="px-3 py-2.5 text-white font-medium">
                    {bt.name}
                    {bt.id === selectedBoard.id && (
                      <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-slate-300">{bt.gsmPerMm}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-slate-300">₹{bt.ratePerKg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sheet Sizes */}
      <div>
        <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-emerald-500/50" />
          Standard Sheet Sizes
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(SHEET_SIZES).map(([key, sheet]) => (
            <div
              key={key}
              className={`
                rounded-xl border p-3 text-center
                ${key === 'large'
                  ? 'border-emerald-500/30 bg-emerald-500/10'
                  : 'border-slate-700/50 bg-slate-800/30'
                }
              `}
            >
              <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${key === 'large' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {sheet.name} Sheet
              </div>
              <div className="text-xl font-bold text-white font-mono">
                {sheet.length} × {sheet.width}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">inches</div>
            </div>
          ))}
        </div>
      </div>

      {/* Board Costs (calculated) */}
      <div>
        <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-5 h-px bg-emerald-500/50" />
          Calculated Board Costs
          <span className="text-slate-500 normal-case tracking-normal font-normal">— {selectedBoard.name}</span>
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
