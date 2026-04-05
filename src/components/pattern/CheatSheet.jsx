import { BookOpen, Check, X } from 'lucide-react'

function CheatSheet({ cheatSheet, bestPractices, commonMistakes }) {
  if (!cheatSheet) return null

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-indigo-500" />
        Quick Reference Cheat Sheet
      </h2>

      {/* Six Word Summary */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-5 text-center text-white">
        <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Remember This</span>
        <h3 className="text-2xl font-bold mt-1">{cheatSheet.sixWordSummary}</h3>
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          {cheatSheet.solidPrinciples.map((p) => (
            <span key={p} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20">{p}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* When to Use */}
        <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-4">
          <h3 className="font-semibold text-green-800 dark:text-green-400 flex items-center gap-2 mb-3">
            <Check className="w-4 h-4" />
            When to Use
          </h3>
          <ul className="space-y-2">
            {cheatSheet.whenToUse.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                <span className="text-green-500 mt-0.5">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When NOT to Use */}
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-4">
          <h3 className="font-semibold text-red-800 dark:text-red-400 flex items-center gap-2 mb-3">
            <X className="w-4 h-4" />
            When NOT to Use
          </h3>
          <ul className="space-y-2">
            {cheatSheet.whenNotToUse.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                <span className="text-red-500 mt-0.5">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Structure */}
      {cheatSheet.structure && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Pattern Structure</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(cheatSheet.structure).map(([role, desc]) => (
              <div key={role} className="flex items-start gap-2 rounded bg-gray-50 dark:bg-gray-900 p-2">
                <code className="text-xs font-mono font-bold text-primary-600 dark:text-primary-400 shrink-0">{role}</code>
                <span className="text-xs text-gray-600 dark:text-gray-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Smell Trigger */}
      {cheatSheet.codeSmellTrigger && (
        <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-3 text-sm">
          <span className="font-semibold text-orange-800 dark:text-orange-300">Code Smell: </span>
          <span className="text-orange-700 dark:text-orange-400">{cheatSheet.codeSmellTrigger}</span>
        </div>
      )}

      {/* Best Practices & Common Mistakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bestPractices && (
          <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-400 mb-3">Best Practices</h3>
            <ul className="space-y-2">
              {bestPractices.map((p, i) => (
                <li key={i} className="text-sm text-green-700 dark:text-green-300 flex gap-2">
                  <span>+</span><span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {commonMistakes && (
          <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-400 mb-3">Common Mistakes</h3>
            <ul className="space-y-3">
              {commonMistakes.map((m, i) => (
                <li key={i} className="text-sm">
                  <div className="text-red-700 dark:text-red-300">x {m.mistake}</div>
                  <div className="text-green-700 dark:text-green-300 mt-0.5">+ {m.correct}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheatSheet
