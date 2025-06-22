"use client";
import { useState } from "react";
import { Header } from "../components/Header";
import { TextInputForm } from "../components/TextInputForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { ResultSection } from "../components/ResultSection";

interface WordInfo {
  meaning: string;
  synonyms: string[];
}

interface ProcessResponse {
  translation: string;
  difficult_words: string[];
  word_info: Record<string, WordInfo>;
}

export default function TranslationApp() {
  const [paragraph, setParagraph] = useState("");
  const [language, setLanguage] = useState("roman_urdu");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = paragraph.trim().split(/\s+/).filter((word) => word.length > 0).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paragraph.trim()) return setError("Please enter a paragraph to translate.");
    if (wordCount > 200) return setError("Paragraph exceeds 200 word limit.");

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/process/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraph: paragraph.trim(), language }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process text");
      if ("error" in data) setError(data.error);
      else setResult(data as ProcessResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setParagraph("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Header />
          <TextInputForm
            paragraph={paragraph}
            setParagraph={setParagraph}
            language={language}
            setLanguage={setLanguage}
            wordCount={wordCount}
            loading={loading}
            onSubmit={handleSubmit}
            onClear={handleClear}
          />
          {error && <ErrorMessage message={error} />}
          {result && <ResultSection result={result} />}
        </div>
      </div>
    </div>
  );
}
