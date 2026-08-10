// Single shared pipeline. A "lead" and a "consumer" are the same underlying
// record moving through the same stage list — there's no separate schema,
// just a current position in STAGES plus a logged history of how it got there.

export const STAGES = [
  "Inquiry",
  "Site Visit & Feasibility",
  "Loan & Subsidy Application",
  "Approved",
  "Installation Scheduled",
  "Installed",
  "Net Metering & TPSODL Name Change",
  "Subsidy Disbursed",
  "Completed",
] as const;

export type Stage = (typeof STAGES)[number];

// A record is still an active "lead" before installation is scheduled;
// once installation is scheduled it's treated as a "consumer" in views
// and copy, even though it's the same document.
export const CONSUMER_FROM_STAGE_INDEX = STAGES.indexOf("Installation Scheduled");

export function recordType(stage: Stage): "lead" | "consumer" {
  const idx = STAGES.indexOf(stage);
  return idx >= CONSUMER_FROM_STAGE_INDEX ? "consumer" : "lead";
}

export function stageIndex(stage: Stage): number {
  return STAGES.indexOf(stage);
}
