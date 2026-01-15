import { NextResponse } from "next/server";

const canned = [
  "小さく分けて今日30分以内に終わる粒度にしてください。",
  "外部依存を先に洗い出し、リスクを下げるタスクを先頭に置きましょう。",
  "完了条件を1文で定義し、レビュー手順を添えましょう。",
];

export async function POST(request: Request) {
  const body = await request.json();
  const title: string = body.title ?? "タスク";
  const pick = canned[Math.floor(Math.random() * canned.length)];
  return NextResponse.json({
    suggestion: `${title} のAI提案: ${pick}`,
  });
}
