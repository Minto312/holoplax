 "use client";

import { useState } from "react";
import { Sidebar } from "../components/sidebar";

export default function BacklogPage() {
  const [items, setItems] = useState([
    { title: "週次レビュー資料をまとめる", points: 3, urgency: "中", risk: "低", status: "backlog" },
    { title: "家計アプリの口座同期", points: 2, urgency: "低", risk: "低", status: "backlog" },
    { title: "英語学習プランの見直し", points: 5, urgency: "中", risk: "中", status: "backlog" },
  ]);

  const [form, setForm] = useState({
    title: "",
    points: 3,
    urgency: "中",
    risk: "中",
  });

  const addItem = () => {
    if (!form.title.trim()) return;
    setItems((prev) => [
      ...prev,
      { title: form.title.trim(), points: Number(form.points), urgency: form.urgency, risk: form.risk, status: "backlog" },
    ]);
    setForm({ title: "", points: 3, urgency: "中", risk: "中" });
  };

  const moveToSprint = (title: string) => {
    setItems((prev) =>
      prev.map((item) => (item.title === title ? { ...item, status: "sprint" } : item)),
    );
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-10 lg:px-6 lg:py-14">
      <Sidebar splitThreshold={8} />
      <main className="flex-1 space-y-6">
        <header className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Backlog
              </p>
              <h1 className="text-3xl font-semibold text-slate-900">バックログ</h1>
              <p className="text-sm text-slate-600">
                手入力＋後でインポートを追加。点数と緊急度/リスクをセットしてスプリントに送れるように。
              </p>
            </div>
            <button
              onClick={addItem}
              className="bg-[#2323eb] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2323eb]/30"
            >
              タスクを追加
            </button>
          </div>
        </header>

        <section className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="タイトル"
              className="w-full border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#2323eb]"
            />
            <input
              type="number"
              min={1}
              value={form.points}
              onChange={(e) => setForm((p) => ({ ...p, points: Number(e.target.value) || 0 }))}
              className="w-full border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#2323eb]"
            />
            <select
              value={form.urgency}
              onChange={(e) => setForm((p) => ({ ...p, urgency: e.target.value }))}
              className="w-full border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#2323eb]"
            >
              {["低", "中", "高"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <select
              value={form.risk}
              onChange={(e) => setForm((p) => ({ ...p, risk: e.target.value }))}
              className="w-full border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#2323eb]"
            >
              {["低", "中", "高"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-3">
            {items.map((item) => (
              <div
                key={item.title}
                className="border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                      {item.points} pt
                    </span>
                    <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                      緊急度: {item.urgency}
                    </span>
                    <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                      リスク: {item.risk}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <button
                    className="border border-slate-200 bg-white px-3 py-1 text-slate-700 transition hover:border-[#2323eb]/50 hover:text-[#2323eb]"
                    onClick={() => moveToSprint(item.title)}
                    disabled={item.status === "sprint"}
                  >
                    {item.status === "sprint" ? "送付済み" : "スプリントに送る"}
                  </button>
                  <button className="border border-slate-200 bg-white px-3 py-1 text-slate-700 transition hover:border-[#2323eb]/50 hover:text-[#2323eb]">
                    AI 提案を見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
