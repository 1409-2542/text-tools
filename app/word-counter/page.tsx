'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <div className="space-y-4">
      <Head>
        <title>Word Counter - Text Tools</title>
        <meta
          name="description"
          content="Free online word counter to count words and characters in your text."
        />
      </Head>
      <h1 className="text-2xl font-bold">Word Counter</h1>
      <textarea
        rows={8}
        className="w-full p-2 border rounded border-gray-300"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="bg-white p-4 rounded shadow text-lg">
        <p><strong>Words:</strong> {wordCount}</p>
        <p><strong>Characters:</strong> {charCount}</p>
      </div>
    </div>
  );
}