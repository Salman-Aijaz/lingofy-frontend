interface WordInfo {
  meaning: string;
  synonyms: string[];
}

interface ProcessResponse {
  translation: string;
  difficult_words: string[];
  word_info: Record<string, WordInfo>;
}

export function ResultSection({ result }: { result: ProcessResponse }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-blue-400/20">
        <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
          <span className="text-4xl mr-3">🌍</span> Translation
        </h2>
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-blue-300/20">
          <p className="text-slate-100 text-lg leading-relaxed font-medium">
            {result.translation}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-blue-400/20">
        <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
          <span className="text-4xl mr-3">📚</span> Difficult Words & Meanings
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {result.difficult_words.map((word, index) => {
            const wordInfo = result.word_info[word];
            return (
              <div key={index} className="bg-slate-700/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-200">
                <h3 className="font-bold text-2xl mb-4 capitalize bg-gradient-to-r from-cyan-100 to-blue-800 text-transparent bg-clip-text">
                  {word}
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                      Meaning:
                    </span>
                    <p className="text-slate-200 mt-2 text-base leading-relaxed">
                      {wordInfo?.meaning || "No meaning available"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                      Synonyms:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {wordInfo?.synonyms?.length > 0 ? (
                        wordInfo.synonyms.map((synonym, synIndex) => (
                          <span
                            key={synIndex}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-full text-sm font-medium shadow-md border border-blue-400/30 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                          >
                            {synonym}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-sm italic">
                          No synonyms available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}