// ─────────────────────────────────────────────────────────────────────────────
// Types for the Rigid Box Costing & Estimation Calculator
// ─────────────────────────────────────────────────────────────────────────────

export interface BoxInputs {
  boxLength: number;
  boxWidth: number;
  boxHeight: number;
  lidHeight: number;
  boardThickness: number;
  quantity: number;
  lidThicknessAllowance: number;
  boardThicknessAllowance: number;
  cuttingAllowance: number;
  excessConsideration: number;
  totalLabourCost: number;
  totalPrintingCost: number;
  coverPaperCostPerSheet: number;
  astarCostPerSheet: number;
  marginOnCost: number;
  marginOnSales: number;
}

export interface BoardType {
  id: string;
  name: string;
  gsmPerMm: number;
  ratePerKg: number;
}

export interface SheetSize {
  name: string;
  length: number;
  width: number;
}

export interface BoardCosts {
  totalGsm: number;
  costPerLargeSheet: number;
  costPerSmallSheet: number;
}

export interface GattaDimensions {
  baseLength: number;
  baseWidth: number;
  lidLength: number;
  lidWidth: number;
}

export interface CoverDimensions {
  coverLength: number;
  coverWidth: number;
  astarLength: number;
  astarWidth: number;
}

export interface SheetYield {
  basePiecesPerSheet: number;
  lidPiecesPerSheet: number;
  coverPiecesPerSheet: number;
  astarPiecesPerSheet: number;
  baseSheetsRequired: number;
  lidSheetsRequired: number;
  coverSheetsRequired: number;
  astarSheetsRequired: number;
}

export interface CostBreakdown {
  gattaBaseCost: number;
  gattaLidCost: number;
  coverPaperCost: number;
  astarCost: number;
  totalManufacturingCost: number;
  marginAmount: number;
  sellingPrice: number;
  costPerBox: number;
  sellingPricePerBox: number;
}

export interface CalculationResult {
  boardCosts: BoardCosts;
  gattaDimensions: GattaDimensions;
  coverDimensions: CoverDimensions;
  sheetYield: SheetYield;
  costBreakdown: CostBreakdown;
}
