"use client";

import { useState, useEffect } from "react";

interface FavoriteItem {
  id: string;
  prompt: string;
  style: string;
  ratio: string;
  createdAt: string;
}

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(data);
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

  const removeFavorite = (id: string) => {
    const newFavs = favorites.filter((f) => f.id !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h1 className="text-xl font-bold text-gray-900">我的收藏</h1>
        <p className="text-xs text-gray-400 mt-0.5">共 {favorites.length} 条收藏</p>
      </div>

      {favorites.length === 0 ? (
        <div className="card p-8 text-center space-y-3">
          <span className="text-4xl">❤️</span>
          <p className="text-sm text-gray-500">还没有收藏内容</p>
          <p className="text-xs text-gray-400">
            在首页生成提示词后，点击「收藏」按钮即可保存
          </p>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-900 transition block">
            去生成 →
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((item) => (
            <div key={item.id} className="card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-rose-50 text-rose-400 px-2 py-0.5 rounded-full">
                    ❤️ {item.style}
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
                  onClick={() => removeFavorite(item.id)}
                  className="btn-secondary flex-1 text-xs text-red-400 hover:text-red-600"
                >
                  取消收藏
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
