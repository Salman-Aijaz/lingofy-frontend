"use client"

import type React from "react"

import { useState } from "react"

interface WordInfo {
  meaning: string
  synonyms: string[]
}

interface ProcessResponse {
  translation: string
  difficult_words: string[]
  word_info: Record<string, WordInfo>
}

interface ErrorResponse {
  error: string
}

export default function TranslationApp() {
  const [paragraph, setParagraph] = useState("")
  const [language, setLanguage] = useState("roman_urdu")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ProcessResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const wordCount = paragraph
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paragraph.trim()) {
      setError("Please enter a paragraph to translate.")
      return
    }

    if (wordCount > 200) {
      setError("Paragraph exceeds 200 word limit.")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("http://localhost:8000/process/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paragraph: paragraph.trim(),
          language: language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process text")
      }

      if ("error" in data) {
        setError(data.error)
      } else {
        setResult(data as ProcessResponse)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while processing your request.")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setParagraph("")
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Text Translation & Analysis</h1>
            <p className="text-gray-300 text-lg">
              Translate your text and discover difficult words with meanings and synonyms
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 border border-purple-500/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="paragraph" className="block text-lg font-semibold text-white mb-3">
                  Enter your paragraph (max 200 words)
                </label>
                <textarea
                  id="paragraph"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                  placeholder="Type or paste your English paragraph here..."
                  className="w-full h-32 px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 resize-none text-white placeholder-gray-400"
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-sm font-medium ${wordCount > 200 ? "text-red-400" : "text-emerald-400"}`}>
                    Word count: {wordCount}/200
                  </span>
                  {wordCount > 200 && (
                    <span className="text-red-400 text-sm font-bold bg-red-900/30 px-2 py-1 rounded-full border border-red-500/50">
                      Exceeds limit!
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="language" className="block text-lg font-semibold text-white mb-3">
                  Select target language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 text-white"
                  disabled={loading}
                >
                  <option value="roman_urdu">Roman Urdu</option>
                  <option value="croatian">Croatian</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !paragraph.trim() || wordCount > 200}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing...
                    </div>
                  ) : (
                    "🚀 Translate & Analyze"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading}
                  className="px-8 py-3 border-2 border-orange-500 text-orange-400 rounded-lg hover:bg-orange-500/10 focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                >
                  🗑️ Clear
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl p-6 mb-8 shadow-lg border border-red-500/30">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium">⚠️ {error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-8">
              {/* Translation */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 border border-cyan-500/30">
                <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
                  <span className="text-4xl mr-3">🌍</span>
                  Translation
                </h2>
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/20">
                  <p className="text-gray-100 text-lg leading-relaxed font-medium">{result.translation}</p>
                </div>
              </div>

              {/* Difficult Words */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 border border-emerald-500/30">
                <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
                  <span className="text-4xl mr-3">📚</span>
                  Difficult Words & Meanings
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {result.difficult_words.map((word, index) => {
                    const wordInfo = result.word_info[word]
                    return (
                      <div key={index} className="bg-gray-700 rounded-lg p-6 shadow-lg border-l-4 border-yellow-400">
                        <h3 className="font-bold text-2xl text-yellow-300 mb-4 capitalize">{word}</h3>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm font-bold text-orange-400 uppercase tracking-wide">Meaning:</span>
                            <p className="text-gray-200 mt-2 text-base leading-relaxed">
                              {wordInfo?.meaning || "No meaning available"}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-orange-400 uppercase tracking-wide">Synonyms:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {wordInfo?.synonyms?.length > 0 ? (
                                wordInfo.synonyms.map((synonym, synIndex) => (
                                  <span
                                    key={synIndex}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-2 rounded-full text-sm font-medium shadow-md border border-purple-400/30"
                                  >
                                    {synonym}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-400 text-sm italic">No synonyms available</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
