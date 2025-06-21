'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.result.text ?? String(data));
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50'>
      <Card className='w-full max-w-xl shadow-lg'>
        <CardHeader>
          <CardTitle>🔍 Nyaomaru Profile Q&A</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='Ask something about Nyaomaru'
          />
          <Button onClick={askQuestion}>Ask</Button>
          {answer && (
            <Textarea
              value={answer}
              readOnly
              className='resize-none min-h-[120px]'
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
