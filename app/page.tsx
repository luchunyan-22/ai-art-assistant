"use client";

import { useState } from "react";

// 风格映射
const STYLE_MAP: Record<string, string> = {
  "古风": "Chinese ancient style, elegant hanfu, ink wash aesthetic, traditional Chinese painting",
  "二次元": "anime style, highly detailed, Japanese manga aesthetic, cel shading",
  "写实": "photorealistic, ultra realistic, 8K detail, professional photography",
  "水墨": "ink wash painting, Chinese ink style, minimalist brushwork, traditional Chinese art",
  "建筑": "architectural rendering, precise perspective, clean lines, detailed structure",
  "治愈": "soft, warm, healing aesthetic, pastel colors, gentle lighting, cozy atmosphere",
};

// 关键词标签
const KEYWORD_CATEGORIES = {
  "氛围": ["唯美", "孤独", "治愈", "神秘", "梦幻", "浪漫"],
  "色调": ["暖色", "冷灰", "莫兰迪", "复古", "清新", "电影感"],
  "构图": ["对称", "三分法", "纵深", "留白", "特写", "全景"],
  "光影": ["逆光", "柔光", "电影光", "侧光", "顶光", "戏剧光"],
  "材质": ["玻璃", "金属", "丝绸", "皮革", "木头", "丝绸质感"],
};

const RATIOS = ["1:1", "9:16", "3:2", "4:3"];
const STYLES = Object.keys(STYLE_MAP);

// 随机灵感
const RANDOM_IDEAS = [
  "治愈小猫躲在暖阳里",
  "星空下的赛博少女",
  "森林深处的精灵少女",
  "雨后咖啡馆的窗边",
  "古风公子策马远行",
  "二次元校园告白场景",
  "极简主义建筑空间",
  "水墨山水隐居小屋",
];

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("古风");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"manual" | "random">("manual");

  // 选中/取消标签
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // 构建基础Prompt
  const buildBasePrompt = () => {
    const styleStr = STYLE_MAP[selectedStyle] || "";
    const tagsStr = selectedTags.join(", ");
    const ratioStr = `--ar ${selectedRatio}`;

    return `${inputText}, ${styleStr}${tagsStr ? ", " + tagsStr : ""}, ultra detailed, cinematic lighting, ${ratioStr}`;
  };

  // 调用AI优化
  const generatePrompt = async () => {
    if (!inputText.trim()) {
      alert("请先输入你想画的内容！");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const basePrompt = buildBasePrompt();

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: inputText,
          style: selectedStyle,
          ratio: selectedRatio,
          tags: selectedTags,
          basePrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(`⚠️ 生成失败：${data.error || "请检查API配置"}`);
        return;
      }

      setResult(data.prompt);

      // 保存历史
      saveToHistory(data.prompt, selectedStyle, selectedRatio);
    } catch (err) {
      setResult("⚠️ 网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  // 随机灵感
  const randomIdea = () => {
    const idea = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    setInputText(idea);
  };

  // 复制结果
  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("复制失败，请手动复制");
    }
  };

  // 收藏
  const saveToFavorite = () => {
    if (!result) return;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.unshift({
      id: Date.now().toString(),
      prompt: result,
      style: selectedStyle,
      ratio: selectedRatio,
      createdAt: new Date().toLocaleString("zh-CN"),
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("已收藏 ✨");
  };

  // 保存历史
  const saveToHistory = (prompt: string, style: string, ratio: string) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.unshift({
      id: Date.now().toString(),
      prompt,
      style,
      ratio,
      createdAt: new Date().toLocaleString("zh-CN"),
    });
    // 只保留50条
    if (history.length > 50) history.pop();
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <div className="space-y-5">
      {/* 标题 */}
      <div className="pt-2">
        <h1 className="text-xl font-bold text-gray-900">AI绘画提示词</h1>
        <p className="text-xs text-gray-400 mt-0.5">输入描述 → 自动生成专业提示词</p>
      </div>

      {/* 模式切换 */}
      <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
        {[
          { key: "manual", label: "手动输入" },
          { key: "random", label: "随机灵感" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "manual" | "random")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-white shadow text-gray-900"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 随机灵感区 */}
      {activeTab === "random" && (
        <div className="card p-4 space-y-3">
          <p className="text-xs text-gray-400">点击获取随机灵感</p>
          <button onClick={randomIdea} className="btn-secondary w-full">
            🎲 给我一个灵感
          </button>
          {inputText && activeTab === "random" && (
            <p className="text-sm text-center text-gray-600 bg-gray-50 rounded-xl p-3">
              💡 {inputText}
            </p>
          )}
        </div>
      )}

      {/* 手动输入区 */}
      {activeTab === "manual" && (
        <>
          {/* 文字输入 */}
          <div className="card p-4 space-y-2">
            <label className="label">你想画什么？</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="比如：古风少女站在樱花树下"
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {/* 风格选择 */}
          <div className="card p-4 space-y-2">
            <label className="label">选择风格</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStyle(s)}
                  className={`px-4 py-2 rounded-full text-sm transition active:scale-95 ${
                    selectedStyle === s
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 画幅比例 */}
          <div className="card p-4 space-y-2">
            <label className="label">画幅比例</label>
            <div className="flex gap-2">
              {RATIOS.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRatio(r)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition active:scale-95 ${
                    selectedRatio === r
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 关键词标签 */}
          <div className="card p-4 space-y-3">
            <label className="label">关键词增强</label>
            {Object.entries(KEYWORD_CATEGORIES).map(([category, tags]) => (
              <div key={category}>
                <span className="text-xs text-gray-500 mb-1 block">{category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs transition active:scale-95 ${
                        selectedTags.includes(tag)
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 生成按钮 */}
      <button
        onClick={generatePrompt}
        disabled={loading}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "生成中..." : "✨ 一键生成提示词"}
      </button>

      {/* 生成结果 */}
      {result && (
        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="label mb-0">生成结果</label>
            <span className="text-xs text-gray-400">{result.length} 字</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
          <div className="flex gap-2">
            <button onClick={copyResult} className="btn-secondary flex-1">
              {copied ? "✅ 已复制" : "📋 复制"}
            </button>
            <button onClick={saveToFavorite} className="btn-secondary flex-1">
              ❤️ 收藏
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
