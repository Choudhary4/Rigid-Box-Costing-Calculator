'use client';

import React from 'react';
import type { CalculationResult } from '@/types/calculator';
import SummaryRow from '@/components/ui/SummaryRow';

interface Props {
  result: CalculationResult;
  quantity: number;
  totalPrintingCost: number;
  totalLabourCost: number;
  marginOnCost: number;
  marginOnSales: number;
}

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtINR(n: number) {
  return '₹' + fmt(n);
}

export default function CostingSummary({ result, quantity, totalPrintingCost, totalLabourCost, marginOnCost, marginOnSales }: Props) {
  const { gattaDimensions, coverDimensions, sheetYield, costBreakdown } = result;

  return (
    <div className="flex flex-col gap-8">
      {/* Gatta Dimensions */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Gatta (Board) Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Base Length', value: gattaDimensions.baseLength },
            { label: 'Base Width', value: gattaDimensions.baseWidth },
            { label: 'Lid Length', value: gattaDimensions.lidLength },
            { label: 'Lid Width', value: gattaDimensions.lidWidth },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded border border-slate-200 px-3 py-2">
              <div className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</div>
              <div className="text-sm font-bold font-mono text-slate-900 mt-1">{item.value}<span className="text-slate-500 font-normal ml-1 text-xs">in</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cover Paper Dimensions */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Cover Paper & Astar Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Cover Length', value: coverDimensions.coverLength },
            { label: 'Cover Width', value: coverDimensions.coverWidth },
            { label: 'Astar Length', value: coverDimensions.astarLength },
            { label: 'Astar Width', value: coverDimensions.astarWidth },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded border border-slate-200 px-3 py-2">
              <div className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</div>
              <div className="text-sm font-bold font-mono text-slate-900 mt-1">{fmt(item.value)}<span className="text-slate-500 font-normal ml-1 text-xs">in</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sheet Yield */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Sheet Yield & Requirements
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left px-4 py-2.5 text-slate-700 font-medium">Material</th>
                <th className="text-right px-4 py-2.5 text-slate-700 font-medium">Pcs/Sheet</th>
                <th className="text-right px-4 py-2.5 text-slate-700 font-medium">Sheets Req.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { label: 'Gatta Base', pcs: sheetYield.basePiecesPerSheet, sheets: sheetYield.baseSheetsRequired },
                { label: 'Gatta Lid', pcs: sheetYield.lidPiecesPerSheet, sheets: sheetYield.lidSheetsRequired },
                { label: 'Cover Paper', pcs: sheetYield.coverPiecesPerSheet, sheets: sheetYield.coverSheetsRequired },
                { label: 'Astar (Inner)', pcs: sheetYield.astarPiecesPerSheet, sheets: sheetYield.astarSheetsRequired },
              ].map((row) => (
                <tr key={row.label} className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-slate-900 font-medium">{row.label}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-slate-700">{row.pcs}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-slate-900 font-bold">{row.sheets.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
          Cost Breakdown
        </h3>
        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <SummaryRow label="Gatta Base Cost" value={fmtINR(costBreakdown.gattaBaseCost)} indent />
          <SummaryRow label="Gatta Lid Cost" value={fmtINR(costBreakdown.gattaLidCost)} indent />
          <SummaryRow label="Cover Paper Cost" value={fmtINR(costBreakdown.coverPaperCost)} indent />
          <SummaryRow label="Astar (Inner) Cost" value={fmtINR(costBreakdown.astarCost)} indent />
          <SummaryRow label="Printing Cost" value={fmtINR(totalPrintingCost)} indent />
          <SummaryRow label="Labour Cost" value={fmtINR(totalLabourCost)} indent />
          <SummaryRow separator />
          <SummaryRow label="Total Manufacturing Cost" value={fmtINR(costBreakdown.totalManufacturingCost)} highlight />
          <SummaryRow separator />
          <SummaryRow label={`Margin (on Cost: ${marginOnCost}% / on Sales: ${marginOnSales}%)`} value={fmtINR(costBreakdown.marginAmount)} indent />
        </div>
      </div>

      {/* Final Pricing — Hero Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
          <div className="text-xs text-blue-700 font-semibold uppercase tracking-wider mb-1">Selling Price</div>
          <div className="text-xl font-bold font-mono text-blue-900">
            {fmtINR(costBreakdown.sellingPrice)}
          </div>
          <div className="text-xs text-blue-600/70 mt-1">for {quantity.toLocaleString('en-IN')} boxes</div>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
          <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-1">Per Box Price</div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {fmtINR(costBreakdown.sellingPricePerBox)}
          </div>
          <div className="text-xs text-slate-500 mt-1">selling price / unit</div>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
          <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-1">Mfg Cost / Box</div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {fmtINR(costBreakdown.costPerBox)}
          </div>
          <div className="text-xs text-slate-500 mt-1">before margin</div>
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-center">
          <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-1">Margin Earned</div>
          <div className="text-xl font-bold font-mono text-emerald-900">
            {fmtINR(costBreakdown.marginAmount)}
          </div>
          <div className="text-xs text-emerald-600/70 mt-1">gross profit</div>
        </div>
      </div>
    </div>
  );
}
