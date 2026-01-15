import crypto from "crypto";

export type TaskStatus = "backlog" | "sprint" | "done";
export type Task = {
  id: string;
  title: string;
  points: number;
  urgency: string;
  risk: string;
  status: TaskStatus;
};

export type VelocityEntry = { name: string; points: number; range: string };

let tasks: Task[] = [
  { id: "t1", title: "週次レビュー資料をまとめる", points: 3, urgency: "中", risk: "低", status: "backlog" },
  { id: "t2", title: "家計アプリの口座同期", points: 2, urgency: "低", risk: "低", status: "backlog" },
  { id: "t3", title: "英語学習プランの見直し", points: 5, urgency: "中", risk: "中", status: "backlog" },
  { id: "t4", title: "自動化ルールの整理", points: 5, urgency: "中", risk: "中", status: "sprint" },
  { id: "t5", title: "分解UIの調整", points: 3, urgency: "中", risk: "低", status: "sprint" },
  { id: "t6", title: "ベロシティカードの実データ接続", points: 2, urgency: "低", risk: "低", status: "sprint" },
];

let velocityHistory: VelocityEntry[] = [
  { name: "Sprint-10", points: 22, range: "20-26" },
  { name: "Sprint-11", points: 24, range: "21-27" },
  { name: "Sprint-12", points: 23, range: "21-25" },
];

let thresholds = { low: 35, high: 70 };

export function getTasks() {
  return tasks;
}

export function addTask(input: Omit<Task, "id" | "status"> & { status?: TaskStatus }) {
  const task: Task = {
    id: crypto.randomUUID(),
    status: input.status ?? "backlog",
    title: input.title,
    points: input.points,
    urgency: input.urgency,
    risk: input.risk,
  };
  tasks = [...tasks, task];
  return task;
}

export function updateTask(id: string, patch: Partial<Task>) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
  return tasks.find((t) => t.id === id);
}

export function getVelocity() {
  return velocityHistory;
}

export function addVelocity(entry: VelocityEntry) {
  velocityHistory = [...velocityHistory, entry];
  return entry;
}

export function getThresholds() {
  return thresholds;
}

export function setThresholds(low: number, high: number) {
  thresholds = { low, high };
  return thresholds;
}
