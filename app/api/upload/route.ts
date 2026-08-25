import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File) || !allowed.has(file.type)) return NextResponse.json({ error: 'Csak JPG, PNG vagy WebP kép tölthető fel.' }, { status: 400 });
    if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'A kép mérete legfeljebb 8 MB lehet.' }, { status: 413 });
    const extension = file.type.split('/')[1].replace('jpeg', 'jpg');
    const directory = path.join(process.cwd(), 'public', 'uploads', 'items');
    await mkdir(directory, { recursive: true });
    const filename = `${randomUUID()}.${extension}`;
    await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ imageData: `/uploads/items/${filename}` });
  } catch (error) {
    console.error('Upload route error', error);
    return NextResponse.json({ error: 'A feltöltés nem sikerült.' }, { status: 500 });
  }
}
