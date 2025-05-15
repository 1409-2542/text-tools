'use client';

import { useState } from 'react';
import Head from 'next/head';

function diffWords(oldText: string, newText: string) {
  const oldWords = oldText.split(/\s+/);
  const newWords = newText.split(/\s+/);
  const maxLength = Math.max(oldWords.length, newWords.length);

  const diffs = [];

  for (let i = 0; i < maxLength; i++) {
    const oldWord = oldWords[i] || '';
    const newWord = newWords[i] || '';

    if (oldWord === newWord) {
      diffs.push({ word: newWord, type: 'equal' });
    } else {
      if (oldWord) diffs.push({ word: oldWord, type: 'removed' });
      if (newWord) diffs.push({ word: newWord, type: 'added' });
    }
  }
  return diffs;
}

export default function TextComparePage() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diffs, setDiffs] = useState<{ word: string; type: string }[]>([]);

  const handleCompare = () => {
    setDiffs(diffWords(textA.trim(), textB.trim()));
  };

  return (
    <div className="space-y-4">
      <Head>
        <title>Text Compare Tool - Simple Text Tools</title>
        <meta
          name="description"
          content="Compare two pieces of text and see the differences highlighted."
        />
      </Head>
      <h1 className="text-2xl font-bold">Text Compare Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          rows={8}
          className="w-full p-2 border rounded border-gray-300"
          placeholder="Enter first text here..."
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
        />
        <textarea
          rows={8}
          className="w-full p-2 border rounded border-gray-300"
          placeholder="Enter second text here..."
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
        />
      </div>

      <button
        onClick={handleCompare}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Compare
      </button>

      {diffs.length > 0 && (
        <div className="mt-4 p-4 border rounded bg-white overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Differences</h2>
          <div className="flex flex-wrap gap-1">
            {diffs.map((diff, i) => {
              let style = '';
              if (diff.type === 'added') style = 'bg-green-200 text-green-800';
              else if (diff.type === 'removed') style = 'bg-red-200 text-red-800';
              else style = 'text-gray-800';

              return (
                <span key={i} className={`px-1 rounded ${style}`}>
                  {diff.word}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}