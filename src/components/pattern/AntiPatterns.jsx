import { useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'

const severityConfig = {
  critical: {
    border: 'border-red-300 dark:border-red-800',
    bg: 'bg-red-50 dark:bg-red-900/20',
    badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    text: 'text-red-700 dark:text-red-300'
  },
  warning: {
    border: 'border-yellow-300 dark:border-yellow-800',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
    text: 'text-yellow-700 dark:text-yellow-300'
  }
}

function AntiPatternCard({ antiPattern }) {
  const [expanded, setExpanded] = useState(false)
  const config = severityConfig[antiPattern.severity] || severityConfig.warning

  return (
    <div className={clsx('rounded-lg border overflow-hidden', config.border, config.bg)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className={clsx('w-5 h-5 shrink-0', config.text)} />
          <div>
            <span className={clsx('font-semibold text-sm', config.text)}>{antiPattern.trap}</span>
            <span className={clsx('ml-2 px-2 py-0.5 rounded-full text-xs font-medium', config.badge)}>
              {antiPattern.severity}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          <p className="text-sm text-gray-700 dark:text-gray-300">{antiPattern.description}</p>

          {/* Bad Code */}
          {antiPattern.badCode && (
            <div className="rounded-lg overflow-hidden border border-red-200 dark:border-red-800">
              <div className="px-3 py-1.5 bg-red-100 dark:bg-red-900/40 text-xs font-semibold text-red-700 dark:text-red-300">
                BAD
              </div>
              <pre className="p-3 bg-gray-900 text-sm text-red-300 font-mono overflow-x-auto whitespace-pre-wrap">
                <code>{antiPattern.badCode}</code>
              </pre>
            </div>
          )}

          {/* Good Code */}
          {antiPattern.goodCode && (
            <div className="rounded-lg overflow-hidden border border-green-200 dark:border-green-800">
              <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-xs font-semibold text-green-700 dark:text-green-300">
                GOOD
              </div>
              <pre className="p-3 bg-gray-900 text-sm text-green-300 font-mono overflow-x-auto whitespace-pre-wrap">
                <code>{antiPattern.goodCode}</code>
              </pre>
            </div>
          )}

          {/* Fix */}
          {antiPattern.fix && (
            <div className="p-3 rounded bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-700 dark:text-blue-300">
              <span className="font-semibold">Fix: </span>{antiPattern.fix}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AntiPatterns({ antiPatterns }) {
  if (!antiPatterns || antiPatterns.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        Anti-Patterns (The Traps)
      </h2>
      <div className="space-y-3">
        {antiPatterns.map((ap) => (
          <AntiPatternCard key={ap.id} antiPattern={ap} />
        ))}
      </div>
    </div>
  )
}

export default AntiPatterns
