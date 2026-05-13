import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI绘画提示词助手",
  description: "输入一句话，生成专业级AI绘画提示词",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="antialiased bg-gray-50 min-h-screen">
        {/* 底部导航 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
          <div className="max-w-md mx-auto flex justify-around py-2">
            {[
              { href: "/", label: "生成", icon: "✨" },
              { href: "/style", label: "风格", icon: "🎨" },
              { href: "/history", label: "历史", icon: "📜" },
              { href: "/favorite", label: "收藏", icon: "❤️" },
              { href: "/practice", label: "练习", icon: "✏️" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* 页面内容 */}
        <main className="max-w-md mx-auto px-4 pt-4 pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
