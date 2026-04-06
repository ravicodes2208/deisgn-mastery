import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-yaml'
import clsx from 'clsx'

const LANG_BADGES = {
  java: { label: 'Java', color: 'bg-orange-600' },
  cpp: { label: 'C++', color: 'bg-blue-600' },
  kotlin: { label: 'Kotlin', color: 'bg-purple-600' },
  yaml: { label: 'YAML', color: 'bg-green-600' },
  text: { label: 'Text', color: 'bg-gray-600' }
}

function CodeBlock({ code, language = 'java', title, compact = false }) {
  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  const badge = LANG_BADGES[language] || LANG_BADGES.java
  const lineCount = code.split('\n').length
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')

  // Map language to Prism grammar name
  const prismLang = language === 'cpp' ? 'cpp' : language

  return (
    <div className={clsx('rounded-xl overflow-hidden border border-gray-700/80 shadow-lg', !compact && 'my-4')}>
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-gray-700/60">
        <div className="flex items-center gap-3">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className={clsx('px-2 py-0.5 rounded text-xs font-bold text-white', badge.color)}>
            {badge.label}
          </span>
          {title && (
            <span className="text-xs text-gray-400 hidden sm:inline">{title}</span>
          )}
        </div>
        <span className="text-[11px] text-gray-500 font-mono">{lineCount} lines</span>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="flex overflow-x-auto" style={{ background: '#272822' }}>
        {/* Line Numbers Gutter */}
        <div
          className="select-none text-right py-3 px-3 font-mono text-[12px] leading-[1.6] border-r border-gray-700/40 flex-shrink-0"
          style={{ color: '#636d83', background: '#1e1e2e', minWidth: '3rem' }}
        >
          <pre style={{ margin: 0, background: 'none' }}>{lineNumbers}</pre>
        </div>

        {/* Highlighted Code */}
        <div className="flex-1 py-3 px-4 overflow-x-auto">
          <pre
            style={{
              margin: 0,
              padding: 0,
              background: 'none',
              fontSize: '12px',
              lineHeight: '1.6',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace"
            }}
          >
            <code
              ref={codeRef}
              className={`language-${prismLang}`}
              style={{ background: 'none', padding: 0, textShadow: 'none' }}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default CodeBlock
