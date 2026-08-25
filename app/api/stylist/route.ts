import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const systemPrompt = `Te egy profi személyi sztylista és stylist AI vagy. Kizárólag a megadott virtuális szekrényből válogass. Egy szett legyen komplett: legalább felső + alsó (vagy ruha), opcionálisan kabát, cipő és kiegészítő. Tartsd be a színtant, az évszakot, az anyagok rétegezését, a dress code-ot és a jó arányokat. A kimenet kizárólag érvényes JSON legyen ebben a formában: {"outfits":[{"title":"...","itemIds":["..."],"reasoning":"1-2 mondat","visualDescription":"részletes vizuális leírás"}]}. Adj 1 fő szettet és 2 alternatívát. Ne találj ki új ruhadarabot.`;

export async function POST(request: Request) {
  try {
    const { wardrobe, request: userRequest, occasion, weather } = await request.json();
    if (!Array.isArray(wardrobe) || wardrobe.length === 0) return NextResponse.json({ error: 'A gardrób üres.' }, { status: 400 });
    if (!process.env.NEXOS_API_KEY) {
      return NextResponse.json({ fallback: true, message: 'NEXOS_API_KEY nincs beállítva. A kliens demó ajánlásokat használ.' });
    }
    const client = new OpenAI({ apiKey: process.env.NEXOS_API_KEY, baseURL: process.env.NEXOS_BASE_URL || 'https://api.nexos.ai/v1' });
    const completion = await client.chat.completions.create({
      model: process.env.NEXOS_MODEL || 'gpt-4o',
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify({ wardrobe, request: userRequest, occasion, weather }) }
      ]
    });
    const content = completion.choices[0]?.message?.content || '{"outfits":[]}';
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Stylist route error', error);
    return NextResponse.json({ error: 'A sztylist szolgáltatás most nem elérhető. Próbáld újra később.' }, { status: 502 });
  }
}
