import { STAGES, stageIndex, type Stage } from "@/lib/stages";

export default function ProgressTimeline({ stage }: { stage: Stage }) {
  const current = stageIndex(stage);
  const total = STAGES.length - 1;
  const pct = current / total;

  // Sun position along an arc from horizon (left) to zenith (right),
  // echoing the nav mark: progress reads as "how high the sun has risen."
  const arcX = 20 + pct * 260;
  const arcY = 90 - Math.sin(pct * Math.PI) * 70;

  return (
    <div>
      <svg viewBox="0 0 300 110" className="w-full max-w-md" aria-hidden="true">
        <path
          d="M10 90 A140 140 0 0 1 290 90"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="2"
        />
        <path
          d={`M10 90 A140 140 0 0 1 290 90`}
          fill="none"
          stroke="var(--color-solar)"
          strokeWidth="2"
          strokeDasharray={`${pct * 440} 440`}
        />
        <line x1="10" y1="90" x2="290" y2="90" stroke="var(--color-line)" strokeWidth="2" />
        <circle cx={arcX} cy={arcY} r="7" fill="var(--color-solar)" />
      </svg>

      <ol className="mt-4 space-y-3">
        {STAGES.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  done
                    ? "bg-good"
                    : active
                    ? "bg-solar"
                    : "bg-line"
                }`}
              />
              <span className={active ? "text-ink font-medium" : "text-ink/60"}>
                {s}
              </span>
              {active && (
                <span className="ml-auto font-mono text-xs text-solar-deep">
                  current
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
