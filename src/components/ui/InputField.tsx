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
  const [localValue, setLocalValue] = React.useState(value.toString());

  React.useEffect(() => {
    if (parseFloat(localValue) !== value && !(localValue === '' && value === 0)) {
      setLocalValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Remove leading zeros (e.g., "07" -> "7", "00.5" -> "0.5")
    val = val.replace(/^0+(?=\d)/, '');
    
    setLocalValue(val);

    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      onChange(parsed);
    } else if (val === '') {
      onChange(0);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          value={localValue}
          step={step}
          min={min}
          onChange={handleChange}
          className="
            w-full bg-white border border-slate-300 rounded-md
            px-3 py-2 text-sm text-slate-900 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            transition-colors
          "
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none bg-white pl-1">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
