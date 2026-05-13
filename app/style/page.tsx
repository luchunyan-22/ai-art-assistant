"use client";

import Link from "next/link";

const STYLE_TEMPLATES = [
  {
    name: "古风",
    emoji: "🏯",
    desc: "传统中国风，古典美人，山水意境",
    color: "from-amber-100 to-orange-100",
    examples: [
      "古风少女，丝绸汉服，梅花背景",
      "水墨山水，隐居竹林，诗意画面",
    ],
  },
  {
    name: "二次元",
    emoji: "🌸",
    desc: "日漫画风，精致五官，梦幻场景",
    color: "from-pink-100 to-rose-100",
    examples: [
      "樱花树下，二次元少女，回眸微笑",
      "赛博朋克城市，霓虹灯光，科幻少女",
    ],
  },
  {
    name: "写实",
    emoji: "📷",
    desc: "真实质感，摄影级别，专业光影",
    color: "from-gray-100 to-slate-100",
    examples: [
      "街头摄影，暖色逆光，人文纪实",
      "杂志封面，明星肖像，专业打光",
    ],
  },
  {
    name: "水墨",
    emoji: "🖌️",
    desc: "东方美学，留白意境，简约古韵",
    color: "from-stone-100 to-neutral-100",
    examples: [
      "水墨山水，云雾缭绕，隐世仙境",
      "写意花鸟，禅意空间，茶道场景",
    ],
  },
  {
    name: "建筑",
    emoji: "🏛️",
    desc: "建筑美学，空间结构，设计感",
    color: "from-blue-100 to-indigo-100",
    examples: [
      "现代建筑，玻璃幕墙，天空倒影",
      "古建筑群，斗拱飞檐，夜景灯光",
    ],
  },
  {
    name: "治愈",
    emoji: "🍃",
    desc: "温柔色调，生活美学，温馨氛围",
    color: "from-green-100 to-emerald-100",
    examples: [
      "阳光房，植物角落，慵懒午后",
      "海边日落，沙滩小屋，旅行治愈",
    ],
  },
];

export default function StylePage() {
  return (
    <div className="space-y-4 pt-2">
      <div>
        <h1 className="text-xl font-bold text-gray-900">风格模板库</h1>
        <p className="text-xs text-gray-400 mt-0.5">选择风格，快速生成专属提示词</p>
      </div>

      <div className="space-y-3">
        {STYLE_TEMPLATES.map((style) => (
          <div
            key={style.name}
            className={`card p-4 bg-gradient-to-br ${style.color} border-0 shadow-sm`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{style.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900">{style.name}</h3>
                <p className="text-xs text-gray-500">{style.desc}</p>
              </div>
            </div>
            <div className="space-y-1">
              {style.examples.map((ex, i) => (
                <p key={i} className="text-xs text-gray-600 bg-white/60 rounded-lg px-3 py-1.5">
                  💡 {ex}
                </p>
              ))}
            </div>
            <Link
              href={`/?style=${encodeURIComponent(style.name)}`}
              className="mt-3 block w-full text-center py-2 bg-white/80 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition active:scale-95"
            >
              使用此风格 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
