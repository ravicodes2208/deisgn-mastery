import { Brain, Check, X, AlertTriangle } from 'lucide-react'

function BrainTriggers({ brainTriggers }) {
  if (!brainTriggers) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Brain Triggers
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{brainTriggers.description}</p>
      </div>

      {/* YES triggers */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider flex items-center gap-2">
          <Check className="w-4 h-4" />
          Use this pattern when you hear...
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {brainTriggers.triggers.map((t, i) => (
            <div key={i} className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-3">
              <div className="font-semibold text-green-800 dark:text-green-300 text-sm">
                &ldquo;{t.keyword}&rdquo;
              </div>
              <p className="text-green-700 dark:text-green-400 text-xs mt-1">{t.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NOT triggers */}
      {brainTriggers.notStrategy && brainTriggers.notStrategy.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
            <X className="w-4 h-4" />
            NOT this pattern when you hear...
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {brainTriggers.notStrategy.map((t, i) => (
              <div key={i} className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-3 flex items-start gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-red-800 dark:text-red-300 text-sm">
                    &ldquo;{t.keyword}&rdquo;
                  </div>
                  <p className="text-red-700 dark:text-red-400 text-xs mt-1">{t.reason}</p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                  {t.pattern}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Litmus Test */}
      {brainTriggers.litmusTest && (
        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">Litmus Test:</span>
            <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">{brainTriggers.litmusTest}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrainTriggers
