import { NextResponse } from 'next/server';
import { makeProfileChain } from '@/lib/lang-chain';
import profile from '@/data/profile.json';

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: 'No question provided' },
      { status: 400 }
    );
  }

  const chain = makeProfileChain(process.env.OPENAI_API_KEY!);

  const result = await chain.invoke({
    profile: JSON.stringify(profile),
    question,
  });

  return NextResponse.json({ result });
}
