'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function RemoveLineBreaksPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleRemoveLineBreaks = () => {
    const cleaned = input.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    setOutput(cleaned);
  };

  return (
    <div className="space-y-4">
      <Head>
        <title>Remove Line Breaks - Simple Text Tools</title>
        <meta
          name="description"
          content="Easily remove all line breaks and extra spaces from your text."
        />
      </Head>
      <h1 className="text-2xl font-bold">Remove Line Breaks</h1>
      <textarea
        rows={8}
        className="w-full p-2 border rounded border-gray-300"
        placeholder="Paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleRemoveLineBreaks}
      >
        Remove Line Breaks
      </button>
      {output && (
        <div>
          <h2 className="text-lg font-semibold">Result</h2>
          <textarea
            rows={6}
            readOnly
            className="w-full p-2 border rounded border-gray-300 bg-gray-100"
            value={output}
          />
        </div>
      )}
    </div>
  );
}