import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'

function LLDProblemCard({ problem, isExpanded, onToggle }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-300">
            {problem.id}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">{problem.problem}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3 space-y-3 animate-fade-in">
          <p className="text-sm text-gray-700 dark:text-gray-300">{problem.where}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="rounded bg-blue-50 dark:bg-blue-900/20 p-2">
              <span className="font-semibold text-blue-800 dark:text-blue-300 block">Context</span>
              <code className="text-blue-600 dark:text-blue-400">{problem.context}</code>
            </div>
            <div className="rounded bg-purple-50 dark:bg-purple-900/20 p-2">
              <span className="font-semibold text-purple-800 dark:text-purple-300 block">Strategy Interface</span>
              <code className="text-purple-600 dark:text-purple-400">{problem.strategyInterface}</code>
            </div>
            <div className="rounded bg-green-50 dark:bg-green-900/20 p-2">
              <span className="font-semibold text-green-800 dark:text-green-300 block">Concrete Strategies</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {problem.concreteStrategies.map((s) => (
                  <code key={s} className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-1 rounded">
                    {s}
                  </code>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded bg-yellow-50 dark:bg-yellow-900/20 p-2 text-xs">
            <span className="font-semibold text-yellow-800 dark:text-yellow-300">Why this pattern here? </span>
            <span className="text-yellow-700 dark:text-yellow-400">{problem.why}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function LLDProblems({ lldProblems }) {
  const [expandedId, setExpandedId] = useState(null)

  if (!lldProblems || lldProblems.length === 0) return null

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          LLD Interview Problem Mappings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {lldProblems.length} real interview problems where this pattern appears. Click to expand.
        </p>
      </div>

      <div className="space-y-2">
        {lldProblems.map((problem) => (
          <LLDProblemCard
            key={problem.id}
            problem={problem}
            isExpanded={expandedId === problem.id}
            onToggle={() => setExpandedId(expandedId === problem.id ? null : problem.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default LLDProblems
