'use client';

import React from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
  step?: number;
  min?: number;
  id: string;
}

export default function InputField({
  label,
  value,
  onChange,
  unit,
  step = 0.1,
  min = 0,
  id,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-slate-400 tracking-wide uppercase">
        {label}
        {unit && <span className="ml-1 text-slate-500 normal-case">({unit})</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          value={value}
          step={step}
          min={min}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="
            w-full bg-slate-800/60 border border-slate-700/60 rounded-lg
            px-3 py-2.5 text-sm text-white
            focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/50
            hover:border-slate-600 transition-all duration-200
            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
            placeholder:text-slate-600
          "
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
