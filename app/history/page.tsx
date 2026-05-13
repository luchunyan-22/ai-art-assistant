"use client";

import { useState, useEffect } from "react";

interface HistoryItem {
  id: string;
  prompt: string;
  style: string;
  ratio: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(data);
  }, []);

  const copyItem = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      alert("复制失败");
    }
  };

  const deleteItem = (id: string) => {
    setDeleting(id);
    const newHistory = history.filter((h) => h.id !== id);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
    setTimeout(() => setDeleting(null), 300);
  };

  const clearAll = () => {
    if (!confirm("确定清空所有历史记录？")) return;
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">历史记录</h1>
          <p className="text-xs text-gray-400 mt-0.5">共 {history.length} 条</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500 transition">
            清空全部
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="card p-8 text-center space-y-3">
          <span className="text-4xl">📜</span>
          <p className="text-sm text-gray-500">还没有历史记录</p>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-900 transition">
            去生成第一个提示词 →
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className={`card p-4 space-y-2 transition-all duration-300 ${
                deleting === item.id ? "opacity-0 scale-95" : "opacity-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {item.style}
                  </span>
                  <span className="text-xs bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full">
                    {item.ratio}
                  </span>
                </div>
                <span className="text-xs text-gray-300">{item.createdAt}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {item.prompt}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => copyItem(item.prompt, item.id)}
                  className="btn-secondary flex-1 text-xs"
                >
                  {copied === item.id ? "✅ 已复制" : "📋 复制"}
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="btn-secondary flex-1 text-xs text-red-400 hover:text-red-600"
                >
                  🗑️ 删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
