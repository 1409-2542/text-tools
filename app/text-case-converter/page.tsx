'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function TextCaseConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convertToUpper = () => setOutput(input.toUpperCase());
  const convertToLower = () => setOutput(input.toLowerCase());
  const convertToTitle = () => {
    const title = input
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setOutput(title);
  };
  const convertToSentence = () => {
    const sentence = input
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    setOutput(sentence);
  };

  return (
    <div className="space-y-4">
      <Head>
        <title>Text Case Converter - Simple Text Tools</title>
        <meta
          name="description"
          content="Convert text to uppercase, lowercase, title case, or sentence case online."
        />
      </Head>
      <h1 className="text-2xl font-bold">Text Case Converter</h1>
      <textarea
        rows={6}
        className="w-full p-2 border rounded border-gray-300"
        placeholder="Enter your text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={convertToUpper} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          UPPERCASE
        </button>
        <button onClick={convertToLower} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          lowercase
        </button>
        <button onClick={convertToTitle} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Title Case
        </button>
        <button onClick={convertToSentence} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sentence case
        </button>
      </div>
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