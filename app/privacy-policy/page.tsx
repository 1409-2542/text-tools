import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - TextToolsPro',
  description: 'Learn how we handle your data at TextToolsPro',
}

export default function PrivacyPolicy() {
  return (
    <main className="py-12">
      <div className="container">
        <div className="section-title">
          <h2>Privacy Policy</h2>
          <p>We respect your privacy and are committed to protecting your personal data.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Data Collection</h3>
              <p className="text-gray-700">
                We collect minimal data to improve your experience:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li>Anonymous usage stats (via Google Analytics) like pages visited, device type, and country.</li>
                <li>Search performance data (via Google Search Console & Bing Webmaster Tools) to monitor site visibility.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Third-Party Services</h3>
              <p className="text-gray-700 mb-2">
                These services have their own privacy policies:
              </p>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google's Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.microsoft.com/en-us/privacy/privacystatement" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Microsoft (Bing) Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">What We Don't Do</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Sell your data.</li>
                <li>Collect names/emails unless you contact us.</li>
                <li>Your text inputs are processed in your browser only (we don't store or analyze them).</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Policy Updates</h3>
              <p className="text-gray-700">
                We may update this policy occasionally. The latest version will always be posted here with the updated date.
              </p>
              <p className="mt-4 text-gray-600 font-medium">
                Last Updated: June 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}