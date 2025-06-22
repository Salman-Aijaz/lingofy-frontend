export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 backdrop-blur-sm text-white rounded-2xl p-6 mb-8 shadow-lg border border-red-500/30">
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
          <p className="text-lg font-medium">⚠️ {message}</p>
        </div>
      </div>
    </div>
  );
}