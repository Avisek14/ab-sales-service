"use client";

import { useEffect, useRef, useState } from "react";

type Stats = {
  totalLeads: number;
  totalCustomers: number;
  totalInstallations: number;
  totalCompleted: number;
};

export default function HeroStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!stats) return;
    let frameId: number;
    const speed = 0.6; // pixels per frame, roughly

    function tick() {
      const stripWidth = stripRef.current?.offsetWidth ?? 0;
      if (stripWidth > 0) {
        posRef.current -= speed;
        if (Math.abs(posRef.current) >= stripWidth) {
          posRef.current += stripWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
      }
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [stats]);

  if (!stats) return null;

  const items = [
    { label: "Total Leads", value: stats.totalLeads },
    { label: "Total Customers", value: stats.totalCustomers },
    { label: "Total Installations", value: stats.totalInstallations },
    { label: "Applications Completed", value: stats.totalCompleted },
  ];

  const Strip = ({ innerRef }: { innerRef?: React.Ref<HTMLDivElement> }) => (
    <div ref={innerRef} className="flex items-center shrink-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 font-mono text-xs px-6 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-solar animate-pulse shrink-0" />
          <span className="text-paper/50">{item.label}:</span>
          <span className="font-semibold text-solar">{item.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-ink border-b border-solar/20 overflow-hidden">
      <div ref={trackRef} className="h-9 flex items-center will-change-transform">
        <Strip innerRef={stripRef} />
        <Strip />
        <Strip />
      </div>
    </div>
  );
}