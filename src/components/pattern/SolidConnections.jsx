import clsx from 'clsx'

function SolidConnections({ solidConnections }) {
  if (!solidConnections || solidConnections.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        SOLID Principle Connections
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solidConnections.map((s) => (
          <div
            key={s.principle}
            className={clsx(
              'rounded-xl border p-4 transition-shadow hover:shadow-md',
              s.isPrimary
                ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{s.principle}</span>
                {s.isPrimary && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
                    PRIMARY
                  </span>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.fullName}</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{s.connection}</p>
            {s.example && (
              <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900 text-xs font-mono text-gray-600 dark:text-gray-400">
                {s.example}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SolidConnections
