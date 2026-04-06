import { useState } from 'react'
import { ChevronDown, Lightbulb, MessageCircle, GitBranch } from 'lucide-react'
import clsx from 'clsx'
import CodeBlock from '../common/CodeBlock'

// Interactive Q&A callout -- the "back and forth" discussion feel
function QACallout({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="my-5 rounded-xl border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-500 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors"
      >
        <MessageCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="flex-1 font-semibold text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
          {question}
        </p>
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-amber-500 transition-transform flex-shrink-0 mt-1',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pl-12 animate-fade-in">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

// Highlighted insight / key takeaway box
function InsightBox({ value }) {
  return (
    <div className="my-5 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
      <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 leading-relaxed">
        {value}
      </p>
    </div>
  )
}

// Renders a single content block
function ContentBlock({ block }) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.8]">
          {block.value}
        </p>
      )
    case 'code':
      return (
        <CodeBlock
          code={block.value}
          language={block.language || 'java'}
          title={block.title}
        />
      )
    case 'qa':
      return <QACallout question={block.question} answer={block.answer} />
    case 'insight':
      return <InsightBox value={block.value} />
    case 'diagram':
      return (
        <div className="my-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <GitBranch className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {block.title || 'Class Diagram'}
            </span>
          </div>
          <pre className="p-4 bg-gray-50 dark:bg-gray-900 text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
            {block.value}
          </pre>
        </div>
      )
    default:
      return null
  }
}

// Main article component
function PatternExplanation({ explanation }) {
  if (!explanation || !explanation.sections) return null

  return (
    <article className="space-y-14">
      {/* Article Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
          {explanation.title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-base leading-relaxed">
          {explanation.subtitle}
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-400 dark:text-gray-500">
          <span>{explanation.readTime}</span>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <span>{explanation.sections.length} sections</span>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <span>Interactive walkthrough</span>
        </div>
      </div>

      {/* Sections */}
      {explanation.sections.map((section, idx) => (
        <section key={section.id} className="space-y-5">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-bold flex-shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug pt-1">
              {section.title}
            </h3>
          </div>
          <div className="ml-[52px] space-y-4">
            {section.content.map((block, i) => (
              <ContentBlock key={`${section.id}-${i}`} block={block} />
            ))}
          </div>
        </section>
      ))}

      {/* Article Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Now head to the <strong>Code Build</strong> tab to see full runnable implementations of all three flavors.
        </p>
      </div>
    </article>
  )
}

export default PatternExplanation
