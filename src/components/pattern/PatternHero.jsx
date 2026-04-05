import { Lightbulb, Zap, Users } from 'lucide-react'

function PatternHero({ hook }) {
  if (!hook) return null

  return (
    <div className="space-y-6">
      {/* The Crux */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="relative">
          <span className="text-sm font-medium text-primary-200 uppercase tracking-wider">The Crux</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">{hook.crux}</h2>
          <p className="mt-3 text-primary-100 leading-relaxed">{hook.oneLiner}</p>
        </div>
      </div>

      {/* The Problem */}
      <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-5">
        <h3 className="font-semibold text-red-800 dark:text-red-400 flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5" />
          The Problem This Pattern Solves
        </h3>
        <p className="text-red-700 dark:text-red-300 leading-relaxed">{hook.problemStatement}</p>
      </div>

      {/* The Analogy */}
      {hook.analogy && (
        <div className="rounded-xl border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20 p-5">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5" />
            {hook.analogy.title} Analogy
          </h3>
          <p className="text-yellow-700 dark:text-yellow-400 leading-relaxed mb-4">{hook.analogy.description}</p>
          {hook.analogy.mapping && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(hook.analogy.mapping).map(([real, code]) => (
                <div key={real} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-yellow-900 dark:text-yellow-300">{real}</span>
                  <span className="text-yellow-600 dark:text-yellow-500">=</span>
                  <code className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 text-xs font-mono">
                    {code}
                  </code>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Participants */}
      {hook.participants && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary-500" />
            Key Participants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hook.participants.map((p) => (
              <div key={p.name} className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3 border border-gray-100 dark:border-gray-700">
                <div className="font-semibold text-primary-600 dark:text-primary-400 text-sm">{p.name}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{p.role}</p>
                <code className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-1 block">e.g. {p.example}</code>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatternHero
