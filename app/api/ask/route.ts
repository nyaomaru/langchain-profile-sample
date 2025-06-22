import { NextResponse } from 'next/server';
import { makeProfileQAChain } from '@/lib/lang-chain';

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: 'No question provided' },
      { status: 400 }
    );
  }

  const result = await makeProfileQAChain(
    process.env.OPENAI_API_KEY!,
    question
  );

  return NextResponse.json({ result });
}
