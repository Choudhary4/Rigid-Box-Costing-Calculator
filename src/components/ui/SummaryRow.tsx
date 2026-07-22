'use client';

import React from 'react';

interface SummaryRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  indent?: boolean;
  separator?: boolean;
}

export default function SummaryRow({
  label,
  value,
  unit,
  highlight = false,
  indent = false,
  separator = false,
}: SummaryRowProps) {
  if (separator) {
    return <div className="my-2 border-t border-slate-700/50" />;
  }

  return (
    <div
      className={`
        flex justify-between items-center py-2 px-3 rounded-lg transition-colors duration-150
        ${indent ? 'ml-3' : ''}
        ${highlight
          ? 'bg-violet-500/15 border border-violet-500/30'
          : 'hover:bg-slate-800/40'
        }
      `}
    >
      <span
        className={`text-sm ${highlight ? 'text-violet-200 font-semibold' : 'text-slate-400'} ${indent ? 'text-xs' : ''}`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-sm font-semibold ${highlight ? 'text-violet-300' : 'text-white'} ${indent ? 'text-xs' : ''}`}
      >
        {value}
        {unit && <span className="ml-1 text-slate-500 font-normal text-xs">{unit}</span>}
      </span>
    </div>
  );
}
