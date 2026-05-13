import { NextRequest, NextResponse } from "next/server";

const STYLE_ENHANCE: Record<string, string> = {
  古风: "Chinese ancient style, elegant hanfu, traditional Chinese painting, ink wash aesthetic, delicate silk fabric, palace architecture background",
  二次元: "anime style, highly detailed, Japanese manga, cel shading, bokeh background, vibrant colors",
  写实: "photorealistic, ultra detailed, professional photography, 8K resolution, natural lighting, studio quality",
  水墨: "ink wash painting, Chinese ink style, minimalist, traditional Chinese art, brush and ink, xuan paper texture",
  建筑: "architectural rendering, precise perspective, clean lines, detailed structure, blueprint style, golden hour lighting",
  治愈: "soft, warm tones, healing aesthetic, pastel colors, gentle natural light, cozy atmosphere, shallow depth of field",
};

export async function POST(req: NextRequest) {
  try {
    const { input, style, ratio, tags, basePrompt } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "缺少输入内容" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "未配置API Key", hint: "请在 Vercel 环境变量中设置 OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const enhanceStr = STYLE_ENHANCE[style] || STYLE_ENHANCE["古风"];
    const tagsStr = tags?.length ? `增强关键词：${tags.join("、")}，` : "";
    const ratioStr = ratio ? `画幅比例：${ratio}` : "";

    const systemPrompt = `你是专业AI绘画提示词优化大师。请将用户输入的绘画描述优化成专业级Midjourney/SD风格提示词。
    要求：
    1. 增加细节描述（服饰、表情、场景、道具）
    2. 提升画面美感（光影、色彩、构图）
    3. 保持简洁，不超过300字
    4. 直接输出提示词，不要解释
    5. 结尾加上画质参数：ultra detailed, 8k, cinematic lighting`;

    const userPrompt = `请优化以下绘画提示词：
    原始描述：${input}
    风格：${style} → ${enhanceStr}
    ${tagsStr}
    ${ratioStr}
    基础组合：${basePrompt}
    请输出一段专业AI绘画提示词（中文+英文混合最佳）：`;

    // ===== 已改为 DeepSeek =====
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data?.error?.message || "API调用失败";
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    const prompt = data.choices[0].message.content.trim();
    return NextResponse.json({ prompt });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}