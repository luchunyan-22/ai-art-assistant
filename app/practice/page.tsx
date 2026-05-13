"use client";

import { useState } from "react";

const PRACTICE_MODES = [
  {
    id: "sketch",
    emoji: "✏️",
    name: "线稿临摹",
    desc: "生成线稿风格提示词，适合练习线条",
    examples: ["clean line art, human anatomy sketch", "pencil sketch, pose reference"],
  },
  {
    id: "color",
    emoji: "🎨",
    name: "色彩练习",
    desc: "色块与光影练习提示词",
    examples: ["flat color, illustration style", "color study, light and shadow practice"],
  },
  {
    id: "anatomy",
    emoji: "🧍",
    name: "人体速写",
    desc: "人体结构与动态练习",
    examples: ["human anatomy study, muscle reference", "dynamic pose, gesture drawing"],
  },
  {
    id: "scene",
    emoji: "🏞️",
    name: "场景构成",
    desc: "构图与空间布局练习",
    examples: ["architectural perspective, depth study", "landscape composition, vanishing point"],
  },
];

const PRACTICE_PROMPTS: Record<string, string[]> = {
  sketch: [
    "手部结构线稿，干净线条，无阴影，纯白背景",
    "人物站姿线稿，正面+侧面，纯线条，无填充",
    "头像五官线稿，精确比例，细致刻画",
    "全身动态线稿，奔跑姿势，简洁有力",
  ],
  color: [
    "色彩渐变练习，暖色系，柔和过渡",
    "莫兰迪色调，静物色彩研究",
    "赛博朋克色彩，霓虹撞色，强烈对比",
    "水彩质感，透明叠色，湿画法效果",
  ],
  anatomy: [
    "女性人体结构，肌肉与骨骼标注参考",
    "男性上半身解剖结构，关节运动示意",
    "人物面部表情图谱，不同情绪变化",
    "手部动作参考图，各种握持姿势",
  ],
  scene: [
    "室内空间一点透视，消失点居中",
    "户外风景构图，三分法，天空占三分之一",
    "建筑剖面图，内部结构展示",
    "人物与场景比例参考，前中后景层次",
  ],
};

export default function PracticePage() {
  const [activeMode, setActiveMode] = useState("sketch");
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const mode = PRACTICE_MODES.find((m) => m.id === activeMode)!;
  const prompts = PRACTICE_PROMPTS[activeMode] || [];

  const getNewPrompt = () => {
    const available = prompts.filter((p) => p !== currentPrompt);
    if (available.length === 0) {
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
      return;
    }
    const pick = available[Math.floor(Math.random() * available.length)];
    setCurrentPrompt(pick);
  };

  const copyPrompt = async () => {
    if (!currentPrompt) return;
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("复制失败");
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h1 className="text-xl font-bold text-gray-900">绘画练习模式</h1>
        <p className="text-xs text-gray-400 mt-0.5">线稿·色彩·人体·场景 四大练习模块</p>
      </div>

      {/* 模式切换 */}
      <div className="grid grid-cols-2 gap-2">
        {PRACTICE_MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => { setActiveMode(m.id); setCurrentPrompt(null); }}
            className={`card p-3 text-left transition active:scale-95 ${
              activeMode === m.id ? "ring-2 ring-gray-900" : ""
            }`}
          >
            <span className="text-xl">{m.emoji}</span>
            <h3 className="font-bold text-sm mt-1">{m.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* 练习内容 */}
      <div className="card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">{mode.emoji} {mode.name}</h3>
        </div>

        {currentPrompt ? (
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">{currentPrompt}</p>
            <div className="flex gap-2">
              <button onClick={copyPrompt} className="btn-secondary flex-1 text-xs">
                {copied ? "✅ 已复制" : "📋 复制提示词"}
              </button>
              <button onClick={getNewPrompt} className="btn-secondary flex-1 text-xs">
                🔄 换一个
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-2">
            <p className="text-sm text-gray-400">点击下方按钮获取练习提示词</p>
          </div>
        )}

        <button
          onClick={getNewPrompt}
          className="btn-primary"
        >
          {currentPrompt ? "🔄 再来一个" : "🎯 开始练习"}
        </button>
      </div>

      {/* 示例参考 */}
      <div className="card p-4 space-y-2">
        <h3 className="label mb-2">本模式示例关键词</h3>
        {mode.examples.map((ex, i) => (
          <p key={i} className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
            {ex}
          </p>
        ))}
      </div>
    </div>
  );
}
