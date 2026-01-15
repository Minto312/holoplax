"use client";

import { useState } from "react";

type SplitNode = {
  id: string;
  title: string;
  points: number;
  urgency: string;
  risk: string;
  detail: string;
};

type Props = {
  nodes: SplitNode[];
  splitThreshold: number;
};

export function TaskSplitTree({ nodes, splitThreshold }: Props) {
  const [decisions, setDecisions] = useState<Record<string, "accept" | "reject" | undefined>>({});

  const setDecision = (id: string, value: "accept" | "reject") => {
    setDecisions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="relative mt-6 pl-8">
      <div className="absolute left-3 top-0 bottom-0 border-l border-slate-200" />
      <div className="space-y-4">
        {nodes.map((node, idx) => {
          const state = decisions[node.id];
          return (
            <div key={node.id} className="relative">
              <div className="absolute left-[9px] top-3 h-0.5 w-4 bg-slate-300" />
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center bg-[#2323eb]/10 text-xs font-semibold text-[#2323eb]">
                  {node.points}
                </div>
                <div className="flex-1 border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{node.title}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                        緊急度: {node.urgency}
                      </span>
                      <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                        リスク: {node.risk}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{node.detail}</p>
                  {idx === 0 ? (
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="border border-[#2323eb]/40 bg-[#2323eb]/10 px-2 py-1 text-[#2323eb]">
                        分解提案
                      </span>
                      <span className="text-slate-600">
                        上限 {splitThreshold}pt を超過したため分解候補を生成
                      </span>
                    </div>
                  ) : null}
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <button
                      className={`border px-3 py-1 transition ${
                        state === "accept"
                          ? "border-[#2323eb]/60 bg-[#2323eb]/10 text-[#2323eb]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-[#2323eb]/50 hover:text-[#2323eb]"
                      }`}
                      onClick={() => setDecision(node.id, "accept")}
                    >
                      〇 採用
                    </button>
                    <button
                      className={`border px-3 py-1 transition ${
                        state === "reject"
                          ? "border-slate-400 bg-slate-100 text-slate-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                      onClick={() => setDecision(node.id, "reject")}
                    >
                      × 却下
                    </button>
                    {state ? (
                      <span className="text-slate-600">
                        状態: {state === "accept" ? "採用" : "却下"}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
