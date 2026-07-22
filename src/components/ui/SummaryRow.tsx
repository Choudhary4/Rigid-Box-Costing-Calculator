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
    return <div className="my-2 border-t border-slate-200" />;
  }

  return (
    <div
      className={`
        flex justify-between items-center py-2 px-2 rounded transition-colors
        ${indent ? 'ml-4' : ''}
        ${highlight
          ? 'bg-blue-50 border border-blue-100 font-medium'
          : 'hover:bg-slate-50'
        }
      `}
    >
      <span className={`text-sm ${highlight ? 'text-blue-900' : 'text-slate-600'} ${indent ? 'text-slate-500' : ''}`}>
        {label}
      </span>
      <span className={`text-sm font-mono ${highlight ? 'text-blue-900 font-bold' : 'text-slate-900 font-medium'}`}>
        {value}
        {unit && <span className="ml-1 text-slate-500 font-normal">{unit}</span>}
      </span>
    </div>
  );
}
