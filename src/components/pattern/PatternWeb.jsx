import { Heart, Skull, TrendingUp } from 'lucide-react'

function PatternWeb({ patternWeb }) {
  if (!patternWeb) return null

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Pattern Relationships
      </h2>

      {/* Best Friends */}
      {patternWeb.bestFriends && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Best Friends (Often Used Together)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {patternWeb.bestFriends.map((friend) => (
              <div key={friend.pattern} className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-4">
                <div className="font-bold text-green-800 dark:text-green-300 mb-1">{friend.pattern}</div>
                <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">{friend.relationship}</p>
                <div className="mt-2 text-xs font-mono text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/40 rounded p-2">
                  {friend.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evil Twin */}
      {patternWeb.evilTwin && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
            <Skull className="w-4 h-4" />
            Evil Twin (Looks Same, Different Intent)
          </h3>
          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-4">
            <div className="font-bold text-red-800 dark:text-red-300 text-lg mb-2">{patternWeb.evilTwin.pattern}</div>
            <div className="space-y-2 text-sm">
              <p className="text-red-700 dark:text-red-400">
                <span className="font-semibold">Similarity:</span> {patternWeb.evilTwin.similarity}
              </p>
              <p className="text-red-700 dark:text-red-400">
                <span className="font-semibold">Key Difference:</span> {patternWeb.evilTwin.difference}
              </p>
              <div className="mt-3 p-3 rounded-lg bg-red-100 dark:bg-red-900/40 text-center">
                <span className="font-bold text-red-900 dark:text-red-200 text-base">
                  {patternWeb.evilTwin.mnemonic}
                </span>
              </div>
              {patternWeb.evilTwin.deferredComparison && (
                <p className="text-xs text-red-500 dark:text-red-500 italic mt-2">{patternWeb.evilTwin.note}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Evolution */}
      {patternWeb.evolution && patternWeb.evolution.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Pattern Evolution
          </h3>
          {patternWeb.evolution.map((evo) => (
            <div key={evo.pattern} className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-4">
              <div className="font-bold text-blue-800 dark:text-blue-300 mb-1">{evo.pattern}</div>
              <p className="text-sm text-blue-700 dark:text-blue-400">{evo.direction}</p>
              <p className="text-xs text-blue-600 dark:text-blue-500 mt-1 italic">{evo.when}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PatternWeb
