"use client";
import { useState } from "react";

const categories = [
  "E-commerce (Amazon, Flipkart, Meesho)",
  "Banking & Finance",
  "Insurance",
  "Real Estate / Builder",
  "Healthcare / Hospital",
  "Telecom (Jio, Airtel, BSNL)",
  "Food & Restaurant",
  "Education / Coaching",
  "Employment / Salary",
  "Government Service",
  "Other",
];

export default function Home() {
  const [problem, setProblem] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!problem || !category) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, category }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Did I Get Cheated?
          </h1>
          <p className="text-gray-500 text-sm">
            Describe your situation. We will tell you your rights and exactly what to do.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What category is your problem?
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe what happened
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={5}
              placeholder="e.g. I ordered a phone on Flipkart 3 weeks ago. It arrived damaged. I raised a return request but they rejected it saying the damage is not covered. I paid 18,000 rupees."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50"
          >
            {loading ? "Analyzing your situation..." : "Analyze My Case"}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Your Case Analysis</h2>
              <span
                className={
                  "text-xs font-medium px-3 py-1 rounded-full " +
                  (result.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : result.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700")
                }
              >
                {result.severity} Severity
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Violation</p>
              <p className="text-sm font-medium text-gray-800">{result.violation}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Law That Protects You</p>
              <p className="text-sm text-gray-800">{result.law}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Immediate Steps</p>
              <ol className="space-y-1">
                {result.immediate_steps.map((step, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-blue-600 font-medium">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Where to Complain</p>
              <p className="text-sm font-medium text-gray-800">{result.portal.name}</p>
              <p className="text-blue-600 text-sm underline">{result.portal.url}</p>
              <p className="text-xs text-gray-500 mt-1">{result.portal.timeline}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Ready-to-Send Complaint Letter</p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                {result.complaint_letter}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(result.complaint_letter)}
                className="mt-2 text-xs text-blue-600 underline"
              >
                Copy letter to clipboard
              </button>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}