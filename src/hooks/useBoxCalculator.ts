'use client';

import { useState, useMemo } from 'react';
import type {
  BoxInputs,
  BoardType,
  CalculationResult,
  GattaDimensions,
  CoverDimensions,
  SheetYield,
  CostBreakdown,
  BoardCosts,
} from '@/types/calculator';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const BOARD_TYPES: BoardType[] = [
  { id: 'GG', name: 'Gray/Gray (GG)', gsmPerMm: 660, ratePerKg: 48 },
  { id: 'GW', name: 'Gray/White (GW)', gsmPerMm: 680, ratePerKg: 55 },
  { id: 'GB', name: 'Gray/Black (GB)', gsmPerMm: 690, ratePerKg: 60 },
];

export const SHEET_SIZES = {
  large: { name: 'Large', length: 31, width: 41 },
  small: { name: 'Small', length: 25, width: 36 },
};

const DEFAULT_INPUTS: BoxInputs = {
  boxLength: 4,
  boxWidth: 3,
  boxHeight: 1.5,
  lidHeight: 1,
  boardThickness: 1.4,
  quantity: 1000,
  lidThicknessAllowance: 0.6,
  boardThicknessAllowance: 0.3,
  cuttingAllowance: 0.75,
  excessConsideration: 1.5,
  totalLabourCost: 10000,
  totalPrintingCost: 8000,
  coverPaperCostPerSheet: 18,
  astarCostPerSheet: 20,
  marginOnCost: 30,
  marginOnSales: 23.08,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Round up to 1 decimal, but only if value >= 5
// ─────────────────────────────────────────────────────────────────────────────
function roundGatta(value: number): number {
  if (value < 5) return parseFloat(value.toFixed(1));
  return Math.ceil(value * 10) / 10;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Pieces per sheet (31x41) for both orientations
// ─────────────────────────────────────────────────────────────────────────────
function piecesPerSheet(pieceL: number, pieceW: number, sheetKey: 'large' | 'small'): number {
  const { length: sheetL, width: sheetW } = SHEET_SIZES[sheetKey];
  const o1 = Math.floor(sheetL / pieceL) * Math.floor(sheetW / pieceW);
  const o2 = Math.floor(sheetL / pieceW) * Math.floor(sheetW / pieceL);
  return Math.max(o1, o2);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Calculation
// ─────────────────────────────────────────────────────────────────────────────
function calculate(inputs: BoxInputs, board: BoardType, sheetKey: 'large' | 'small'): CalculationResult {
  const {
    boxLength,
    boxWidth,
    boxHeight,
    lidHeight,
    boardThickness,
    quantity,
    lidThicknessAllowance,
    cuttingAllowance,
    excessConsideration,
    totalLabourCost,
    totalPrintingCost,
    coverPaperCostPerSheet,
    astarCostPerSheet,
    marginOnCost,
  } = inputs;

  // ── Step 1: Board Cost ───────────────────────────────────────────────────
  const totalGsm = board.gsmPerMm * boardThickness;
  const { length: lL, width: lW } = SHEET_SIZES.large;
  const { length: sL, width: sW } = SHEET_SIZES.small;

  const costPerLargeSheet =
    ((totalGsm * lL * lW) / 1550 / 1000) * board.ratePerKg;
  const costPerSmallSheet =
    ((totalGsm * sL * sW) / 1550 / 1000) * board.ratePerKg;

  const boardCosts: BoardCosts = { totalGsm, costPerLargeSheet, costPerSmallSheet };

  // ── Step 2: Gatta Dimensions ─────────────────────────────────────────────
  const rawBaseL = boxLength + boxHeight + boxHeight + cuttingAllowance;
  const rawBaseW = boxWidth + boxHeight + boxHeight + cuttingAllowance;
  const rawLidL =
    boxLength +
    lidThicknessAllowance +
    lidHeight +
    lidHeight +
    cuttingAllowance;
  const rawLidW =
    boxWidth +
    lidThicknessAllowance +
    lidHeight +
    lidHeight +
    cuttingAllowance;

  const gattaDimensions: GattaDimensions = {
    baseLength: roundGatta(rawBaseL),
    baseWidth: roundGatta(rawBaseW),
    lidLength: roundGatta(rawLidL),
    lidWidth: roundGatta(rawLidW),
  };

  // ── Step 3: Cover Paper & Astar Dimensions ───────────────────────────────
  const coverDimensions: CoverDimensions = {
    coverLength: gattaDimensions.baseLength + excessConsideration,
    coverWidth: gattaDimensions.baseWidth + excessConsideration,
    astarLength: gattaDimensions.baseLength,
    astarWidth: gattaDimensions.baseWidth,
  };

  // ── Step 4 & 5: Sheet Yield & Quantities ─────────────────────────────────
  const basePiecesPerSheet = piecesPerSheet(
    gattaDimensions.baseLength,
    gattaDimensions.baseWidth,
    sheetKey
  );
  const lidPiecesPerSheet = piecesPerSheet(
    gattaDimensions.lidLength,
    gattaDimensions.lidWidth,
    sheetKey
  );
  const coverPiecesPerSheet = piecesPerSheet(
    coverDimensions.coverLength,
    coverDimensions.coverWidth,
    sheetKey
  );
  const astarPiecesPerSheet = piecesPerSheet(
    coverDimensions.astarLength,
    coverDimensions.astarWidth,
    sheetKey
  );

  const baseSheetsRequired = Math.ceil(quantity / basePiecesPerSheet);
  const lidSheetsRequired = Math.ceil(quantity / lidPiecesPerSheet);
  const coverSheetsRequired = Math.ceil(quantity / coverPiecesPerSheet);
  const astarSheetsRequired = Math.ceil(quantity / astarPiecesPerSheet);

  const sheetYield: SheetYield = {
    basePiecesPerSheet,
    lidPiecesPerSheet,
    coverPiecesPerSheet,
    astarPiecesPerSheet,
    baseSheetsRequired,
    lidSheetsRequired,
    coverSheetsRequired,
    astarSheetsRequired,
  };

  // ── Step 6: Final Costing ────────────────────────────────────────────────
  const activeSheetCost = sheetKey === 'large' ? costPerLargeSheet : costPerSmallSheet;

  const gattaBaseCost = baseSheetsRequired * activeSheetCost;
  const gattaLidCost = lidSheetsRequired * activeSheetCost;
  const coverPaperCost = coverSheetsRequired * coverPaperCostPerSheet;
  const astarCost = astarSheetsRequired * astarCostPerSheet;

  const totalManufacturingCost =
    gattaBaseCost +
    gattaLidCost +
    coverPaperCost +
    astarCost +
    totalPrintingCost +
    totalLabourCost;

  const marginAmount = totalManufacturingCost * (marginOnCost / 100);
  const sellingPrice = totalManufacturingCost + marginAmount;

  const costBreakdown: CostBreakdown = {
    gattaBaseCost,
    gattaLidCost,
    coverPaperCost,
    astarCost,
    totalManufacturingCost,
    marginAmount,
    sellingPrice,
    costPerBox: totalManufacturingCost / quantity,
    sellingPricePerBox: sellingPrice / quantity,
  };

  return { boardCosts, gattaDimensions, coverDimensions, sheetYield, costBreakdown };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
export function useBoxCalculator() {
  const [inputs, setInputs] = useState<BoxInputs>(DEFAULT_INPUTS);
  const [selectedBoardId, setSelectedBoardId] = useState<string>('GG');
  const [selectedSheetKey, setSelectedSheetKey] = useState<'large' | 'small'>('large');

  const selectedBoard = useMemo(
    () => BOARD_TYPES.find((b) => b.id === selectedBoardId) ?? BOARD_TYPES[0],
    [selectedBoardId]
  );

  const result = useMemo(
    () => calculate(inputs, selectedBoard, selectedSheetKey),
    [inputs, selectedBoard, selectedSheetKey]
  );

  function updateInput<K extends keyof BoxInputs>(key: K, value: BoxInputs[K]) {
    setInputs((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'marginOnCost') {
        const moc = Number(value) || 0;
        next.marginOnSales = parseFloat(((moc / (100 + moc)) * 100).toFixed(2));
      } else if (key === 'marginOnSales') {
        const mos = Number(value) || 0;
        if (mos >= 100) {
          next.marginOnCost = 0; // prevent divide by zero
        } else {
          next.marginOnCost = parseFloat(((mos / (100 - mos)) * 100).toFixed(2));
        }
      }
      return next;
    });
  }

  return {
    inputs,
    updateInput,
    selectedBoardId,
    setSelectedBoardId,
    selectedSheetKey,
    setSelectedSheetKey,
    selectedBoard,
    result,
  };
}
