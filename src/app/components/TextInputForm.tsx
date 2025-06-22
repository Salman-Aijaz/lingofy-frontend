"use client"

interface TextInputFormProps {
  paragraph: string;
  setParagraph: (text: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  wordCount: number;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

export function TextInputForm({
  paragraph,
  setParagraph,
  language,
  setLanguage,
  wordCount,
  loading,
  onSubmit,
  onClear,
}: TextInputFormProps) {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-blue-500/20">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="paragraph" className="block text-lg font-semibold text-white mb-3">
            Enter your paragraph (max 200 words)
          </label>
          <textarea
            id="paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="Type or paste your English paragraph here..."
            className="w-full h-32 px-4 py-3 bg-slate-700/80 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 resize-none text-white placeholder-slate-400 transition-all duration-200"
            disabled={loading}
          />
          <div className="flex justify-between items-center mt-3">
            <span className={`text-sm font-medium ${wordCount > 200 ? "text-red-400" : "text-blue-400"}`}>
              Word count: {wordCount}/200
            </span>
            {wordCount > 200 && (
              <span className="text-red-400 text-sm font-bold bg-red-900/30 px-3 py-1 rounded-full border border-red-500/50">
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
            className="w-full px-4 py-3 bg-slate-700/80 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 text-white transition-all duration-200"
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
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-blue-500/25"
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
            onClick={onClear}
            disabled={loading}
            className="px-8 py-3 border-2 border-slate-500 text-slate-300 rounded-xl hover:bg-slate-500/10 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            🗑️ Clear
          </button>
        </div>
      </form>
    </div>
  );
}