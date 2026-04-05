import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'
import clsx from 'clsx'

// Pattern sub-components
import PatternHero from '../components/pattern/PatternHero'
import BrainTriggers from '../components/pattern/BrainTriggers'
import CodeWalkthrough from '../components/pattern/CodeWalkthrough'
import SolidConnections from '../components/pattern/SolidConnections'
import LLDProblems from '../components/pattern/LLDProblems'
import PatternWeb from '../components/pattern/PatternWeb'
import AntiPatterns from '../components/pattern/AntiPatterns'
import PatternQuiz from '../components/pattern/PatternQuiz'
import CheatSheet from '../components/pattern/CheatSheet'
import QuestionCard from '../components/practice/QuestionCard'

// Import pattern data
import strategyData from '../data/topics/design-patterns/strategy.json'

// Pattern data registry
const patternDataMap = {
  'strategy': strategyData
}

// Section navigation config
const sections = [
  { id: 'intuition', label: 'Intuition', icon: '🎯' },
  { id: 'triggers', label: 'Brain Triggers', icon: '🧠' },
  { id: 'code', label: 'Code Build', icon: '💻' },
  { id: 'solid', label: 'SOLID', icon: '🔗' },
  { id: 'lld', label: 'LLD Problems', icon: '🎯' },
  { id: 'web', label: 'Pattern Web', icon: '🕸️' },
  { id: 'antipatterns', label: 'Anti-Patterns', icon: '⚠️' },
  { id: 'quiz', label: 'Quiz', icon: '📝' },
  { id: 'practice', label: 'Practice', icon: '🏋️' },
  { id: 'cheatsheet', label: 'Cheat Sheet', icon: '📋' }
]

function PatternPage() {
  const { phase, topicId } = useParams()
  const { progress, markTopicComplete, setLastVisited } = useProgress()
  const [activeSection, setActiveSection] = useState('intuition')
  const sectionRefs = useRef({})

  const patternData = patternDataMap[topicId]

  useEffect(() => {
    if (topicId) {
      setLastVisited(topicId)
    }
  }, [topicId, setLastVisited])

  // Scroll to section when nav clicked
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const el = sectionRefs.current[sectionId]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!patternData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Coming Soon!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This pattern is under construction. Check back soon!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
        >
          Go Home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const isCompleted = progress.completedTopics.includes(topicId)

  return (
    <div className="max-w-5xl mx-auto pt-4 pb-16">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="capitalize">{phase?.replace('-', ' ')}</span>
              <span>/</span>
              <span>{patternData.title}</span>
              {patternData.category && (
                <>
                  <span>/</span>
                  <span className="capitalize px-2 py-0.5 rounded-full text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                    {patternData.category}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-4xl">{patternData.icon}</span>
              {patternData.title}
            </h1>
          </div>
          <button
            onClick={() => markTopicComplete(topicId)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
              isCompleted
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <CheckCircle className={clsx('w-5 h-5', isCompleted && 'text-green-500')} />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{patternData.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {patternData.estimatedTime}
          </span>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 -mx-6 px-6 py-3 mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                activeSection === section.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <span className="text-base">{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-16">
        {/* 1. The Hook / Intuition */}
        <section ref={el => sectionRefs.current['intuition'] = el} className="scroll-mt-20">
          <PatternHero hook={patternData.hook} />
        </section>

        {/* 2. Brain Triggers */}
        <section ref={el => sectionRefs.current['triggers'] = el} className="scroll-mt-20">
          <BrainTriggers brainTriggers={patternData.brainTriggers} />
        </section>

        {/* 3. Code Build */}
        <section ref={el => sectionRefs.current['code'] = el} className="scroll-mt-20">
          <CodeWalkthrough codeImplementation={patternData.codeImplementation} />
        </section>

        {/* 4. SOLID Connections */}
        <section ref={el => sectionRefs.current['solid'] = el} className="scroll-mt-20">
          <SolidConnections solidConnections={patternData.solidConnections} />
        </section>

        {/* 5. LLD Interview Problems */}
        <section ref={el => sectionRefs.current['lld'] = el} className="scroll-mt-20">
          <LLDProblems lldProblems={patternData.lldProblems} />
        </section>

        {/* 6. Pattern Web */}
        <section ref={el => sectionRefs.current['web'] = el} className="scroll-mt-20">
          <PatternWeb patternWeb={patternData.patternWeb} />
        </section>

        {/* 7. Anti-Patterns */}
        <section ref={el => sectionRefs.current['antipatterns'] = el} className="scroll-mt-20">
          <AntiPatterns antiPatterns={patternData.antiPatterns} />
        </section>

        {/* 8. Quiz */}
        <section ref={el => sectionRefs.current['quiz'] = el} className="scroll-mt-20">
          <PatternQuiz quiz={patternData.quiz} />
        </section>

        {/* 9. Practice Questions */}
        <section ref={el => sectionRefs.current['practice'] = el} className="scroll-mt-20">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Practice Questions
            </h2>
            {patternData.practiceQuestions && patternData.practiceQuestions.length > 0 ? (
              <div className="space-y-6">
                {patternData.practiceQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No practice questions yet.
              </div>
            )}
          </div>
        </section>

        {/* 10. Cheat Sheet */}
        <section ref={el => sectionRefs.current['cheatsheet'] = el} className="scroll-mt-20">
          <CheatSheet
            cheatSheet={patternData.cheatSheet}
            bestPractices={patternData.bestPractices}
            commonMistakes={patternData.commonMistakes}
          />
        </section>
      </div>
    </div>
  )
}

export default PatternPage
