import { useState, useCallback, lazy, Suspense } from 'react'
import { Play, RotateCcw, Loader2, AlertCircle, Terminal } from 'lucide-react'
import clsx from 'clsx'

// Lazy-load Monaco to avoid bloating initial bundle (~2MB)
const MonacoEditor = lazy(() => import('@monaco-editor/react'))

// Judge0 CE API — free, no auth needed for public instance
const JUDGE0_API = 'https://ce.judge0.com'

// Judge0 language IDs
const LANG_CONFIG = {
  java: { langId: 91, monacoLang: 'java', label: 'Java', color: 'bg-java' },
  cpp: { langId: 105, monacoLang: 'cpp', label: 'C++', color: 'bg-cpp' },
  kotlin: { langId: 111, monacoLang: 'kotlin', label: 'Kotlin', color: 'bg-purple-600' }
}

function InteractiveEditor({ code, language, title, explanation }) {
  const [editedCode, setEditedCode] = useState(code)
  const [output, setOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState(null)
  const [showOutput, setShowOutput] = useState(false)

  const config = LANG_CONFIG[language] || LANG_CONFIG.java
  const isModified = editedCode !== code

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    setError(null)
    setShowOutput(true)
    setOutput(null)

    try {
      // Submit code to Judge0 with wait=true (synchronous, simpler)
      const response = await fetch(
        `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language_id: config.langId,
            source_code: editedCode
          })
        }
      )

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }

      const data = await response.json()

      // Judge0 status IDs: 3 = Accepted, 6 = Compilation Error, 5 = TLE, 11 = Runtime Error
      const status = data.status?.id

      if (status === 3) {
        // Accepted — successful execution
        setOutput({
          type: 'success',
          text: data.stdout || '(No output)',
          time: data.time,
          memory: data.memory
        })
      } else if (status === 6) {
        // Compilation error
        setOutput({
          type: 'error',
          text: data.compile_output || 'Compilation failed'
        })
      } else if (status === 5) {
        // Time Limit Exceeded
        setOutput({
          type: 'error',
          text: 'Time Limit Exceeded (max 10s). Check for infinite loops.'
        })
      } else {
        // Runtime error or other
        const errorText = data.stderr || data.compile_output || data.message || `Execution failed (status: ${data.status?.description})`
        const stdout = data.stdout ? data.stdout + '\n' : ''
        setOutput({
          type: 'error',
          text: stdout + errorText
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to execute code')
      setOutput({
        type: 'error',
        text: 'Could not reach the execution server. Check your internet connection and try again.'
      })
    } finally {
      setIsRunning(false)
    }
  }, [editedCode, config])

  const handleReset = useCallback(() => {
    setEditedCode(code)
    setOutput(null)
    setError(null)
    setShowOutput(false)
  }, [code])

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className={clsx('px-2 py-0.5 rounded text-xs font-medium text-white', config.color)}>
            {config.label}
          </span>
          {title && (
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">{title}</span>
          )}
          {isModified && (
            <span className="px-1.5 py-0.5 rounded text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
              modified
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isModified && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Reset to original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
              isRunning
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-wait'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow'
            )}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Suspense
        fallback={
          <div className="h-[400px] flex items-center justify-center bg-gray-900 text-gray-400 text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading editor...
          </div>
        }
      >
        <MonacoEditor
          height="400px"
          language={config.monacoLang}
          value={editedCode}
          onChange={(value) => setEditedCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            padding: { top: 12, bottom: 12 },
            wordWrap: 'on',
            tabSize: 4,
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true
          }}
        />
      </Suspense>

      {/* Explanation */}
      {explanation && !showOutput && (
        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-blue-800 dark:text-blue-200">{explanation}</p>
        </div>
      )}

      {/* Output Panel */}
      {showOutput && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Output
              </span>
              {output?.type === 'success' && <span className="w-2 h-2 rounded-full bg-green-500" />}
              {output?.type === 'error' && <span className="w-2 h-2 rounded-full bg-red-500" />}
            </div>
            {output?.time && (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {output.time}s | {Math.round(output.memory / 1024)}MB
              </span>
            )}
          </div>
          <div className={clsx(
            'px-4 py-3 font-mono text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto',
            output?.type === 'error'
              ? 'bg-red-950 text-red-300'
              : output?.type === 'success'
              ? 'bg-gray-900 text-green-300'
              : 'bg-gray-900 text-gray-400'
          )}>
            {isRunning ? (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling and executing...
              </div>
            ) : output ? (
              output.text
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveEditor
