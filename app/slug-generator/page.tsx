'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function SlugGeneratorPage() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');

  const handleGenerateSlug = () => {
    const generated = input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(generated);
  };

  return (
    <div className="space-y-4">
      <Head>
        <title>Slug Generator - Simple Text Tools</title>
        <meta
          name="description"
          content="Generate URL-friendly slugs from any string of text."
        />
      </Head>
      <h1 className="text-2xl font-bold">Slug Generator</h1>
      <textarea
        rows={4}
        className="w-full p-2 border rounded border-gray-300"
        placeholder="Enter text to convert into a slug..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleGenerateSlug}
      >
        Generate Slug
      </button>
      {slug && (
        <div>
          <h2 className="text-lg font-semibold">Result</h2>
          <input
            readOnly
            className="w-full p-2 border rounded border-gray-300 bg-gray-100"
            value={slug}
          />
        </div>
      )}
    </div>
  );
}