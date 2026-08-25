import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const shapeDescriptors: Record<string, string> = {
  'Homokóra': 'balanced bust and hips with a defined waist',
  'Körte': 'narrower shoulders and bust, wider hips',
  'Alma': 'fuller midsection and slimmer legs',
  'Téglalap': 'similar bust, waist and hip measurements',
  'Fordított háromszög': 'broad shoulders and narrower hips'
};

export async function POST(request: Request) {
  try {
    const profile = await request.json();
    const description = shapeDescriptors[profile.bodyShape] || 'natural balanced proportions';
    const prompt = `Full-body studio photograph of a ${profile.gender}, approximately ${profile.heightCm} cm tall, ${description} body build (bust ${profile.chestCm || 'unknown'} cm, waist ${profile.waistCm || 'unknown'} cm, hips ${profile.hipCm || 'unknown'} cm, shoulders ${profile.shoulderCm || 'unknown'} cm). ${profile.ageRange || ''} age range. Skin tone: ${profile.skinTone || 'natural'}, hair: ${profile.hairColor || 'natural'}. Standing facing forward, arms relaxed at sides, neutral expression, wearing simple neutral underwear or leotard, plain light-gray seamless studio background, even soft lighting, photorealistic, sharp focus, no text, no logos. Fashion-fit model reference photo style.`;
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ fallback: true, prompt, message: 'GEMINI_API_KEY nincs beállítva.' });
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    const parts = result.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part) => part.inlineData?.data);
    return NextResponse.json({ imageData: imagePart?.inlineData?.data ? `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${imagePart.inlineData.data}` : null, prompt });
  } catch (error) {
    console.error('Avatar route error', error);
    return NextResponse.json({ error: 'Az avatar generálása sikertelen. Ellenőrizd a beállításokat és próbáld újra.' }, { status: 502 });
  }
}
