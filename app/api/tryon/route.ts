import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

async function imagePart(source: string) {
  try {
    if (source.startsWith('data:')) {
      const [header, base64] = source.split(',');
      return { inlineData: { mimeType: header?.match(/data:(.*);base64/)?.[1] || 'image/jpeg', data: base64 || source } };
    }
    const response = await fetch(source);
    if (!response.ok) return null;
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(await response.arrayBuffer()).toString('base64');
    return { inlineData: { mimeType: contentType, data: base64 } };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { avatarImage, clothingImages = [], visualDescription } = await request.json();
    if (!avatarImage || !visualDescription) return NextResponse.json({ error: 'Avatar és vizuális leírás szükséges.' }, { status: 400 });
    const prompt = `This is my body template. Keep the SAME body proportions, pose, face, skin tone, and background UNCHANGED. Dress this person in the following outfit, rendering only the clothing realistically on the existing body: ${visualDescription}. Keep lighting consistent. Photorealistic result, full body visible. Do not alter the person's identity or background. Only change the clothing.`;
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ fallback: true, prompt, message: 'GEMINI_API_KEY nincs beállítva.' });
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents: any[] = [{ text: prompt }];
    const avatarPart = await imagePart(avatarImage);
    if (avatarPart) contents.push(avatarPart);
    for (const image of clothingImages) {
      if (typeof image !== 'string') continue;
      const part = await imagePart(image);
      if (part) contents.push(part);
    }
    const result = await ai.models.generateContent({ model: process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image-preview', contents: [{ role: 'user', parts: contents }] });
    const parts = result.candidates?.[0]?.content?.parts || [];
    const generated = parts.find((part) => part.inlineData?.data);
    return NextResponse.json({ imageData: generated?.inlineData?.data ? `data:${generated.inlineData.mimeType || 'image/png'};base64,${generated.inlineData.data}` : null });
  } catch (error) {
    console.error('Try-on route error', error);
    return NextResponse.json({ error: 'A virtuális felpróbálás most nem sikerült.' }, { status: 502 });
  }
}
