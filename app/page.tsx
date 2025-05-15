import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Simple Text Tools</h1>
      <p className="text-gray-700">
        A collection of free, fast, and easy-to-use online tools for text editing and formatting.
      </p>

      <h2 className="text-xl font-semibold">Available Tools</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link href="/word-counter" className="text-blue-600 hover:underline">
            Word Counter
          </Link> - Count words and characters in your text.
        </li>
        <li>
          <Link href="/remove-line-breaks" className="text-blue-600 hover:underline">
            Remove Line Breaks
          </Link> - Eliminate line breaks from your text.
        </li>
        <li>
          <Link href="/slug-generator" className="text-blue-600 hover:underline">
            Slug Generator
          </Link> - Convert text to URL-friendly slugs.
        </li>
        <li>
          <Link href="/text-case-converter" className="text-blue-600 hover:underline">
            Text Case Converter
          </Link> - Convert text to uppercase, lowercase, and more.
        </li>
        <li>
          <Link href="/text-compare" className="text-blue-600 hover:underline">
            Text Compare Tool
          </Link> - Quickly spot differences between two texts.
        </li>
      </ul>
    </div>
  );
}