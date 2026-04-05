import { useState } from 'react'
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import clsx from 'clsx'

function QuizQuestion({ question, questionNumber, onAnswer, userAnswer }) {
  const isAnswered = userAnswer !== undefined
  const isCorrect = userAnswer === question.correctAnswer

  return (
    <div className={clsx(
      'rounded-xl border p-5 transition-all',
      isAnswered
        ? isCorrect
          ? 'border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
          : 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
    )}>
      <div className="flex items-start gap-3 mb-4">
        <span className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-300 shrink-0">
          {questionNumber}
        </span>
        <div>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
            {question.type}
          </span>
          <p className="font-medium text-gray-900 dark:text-white mt-1">{question.question}</p>
        </div>
      </div>

      <div className="space-y-2 ml-10">
        {question.options.map((option, idx) => {
          const isSelected = userAnswer === idx
          const isCorrectOption = idx === question.correctAnswer
          const showAsCorrect = isAnswered && isCorrectOption
          const showAsWrong = isAnswered && isSelected && !isCorrect

          return (
            <button
              key={idx}
              onClick={() => !isAnswered && onAnswer(idx)}
              disabled={isAnswered}
              className={clsx(
                'w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2',
                !isAnswered && 'hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-pointer',
                isAnswered && !showAsCorrect && !showAsWrong && 'border border-gray-100 dark:border-gray-700 opacity-50',
                showAsCorrect && 'border-2 border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium',
                showAsWrong && 'border-2 border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through'
              )}
            >
              {showAsCorrect && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
              {showAsWrong && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
              {!showAsCorrect && !showAsWrong && (
                <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shrink-0" />
              )}
              {option}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className={clsx(
          'mt-4 ml-10 p-3 rounded-lg text-sm',
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        )}>
          <span className="font-semibold">{isCorrect ? 'Correct!' : 'Not quite.'}</span>{' '}
          {question.explanation}
        </div>
      )}
    </div>
  )
}

function PatternQuiz({ quiz }) {
  const [answers, setAnswers] = useState({})

  if (!quiz || quiz.length === 0) return null

  const totalAnswered = Object.keys(answers).length
  const totalCorrect = Object.entries(answers).filter(
    ([qId, ans]) => quiz.find(q => q.id === qId)?.correctAnswer === ans
  ).length

  const handleAnswer = (questionId, answerIdx) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIdx }))
  }

  const handleReset = () => setAnswers({})

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            Knowledge Quiz
          </h2>
          {totalAnswered > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Score: {totalCorrect}/{totalAnswered} correct
              {totalAnswered === quiz.length && (
                <span className={clsx(
                  'ml-2 font-semibold',
                  totalCorrect === quiz.length ? 'text-green-500' : totalCorrect >= quiz.length * 0.7 ? 'text-yellow-500' : 'text-red-500'
                )}>
                  {totalCorrect === quiz.length ? '-- Perfect!' : totalCorrect >= quiz.length * 0.7 ? '-- Good!' : '-- Review needed'}
                </span>
              )}
            </p>
          )}
        </div>
        {totalAnswered > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {quiz.map((q, idx) => (
          <QuizQuestion
            key={q.id}
            question={q}
            questionNumber={idx + 1}
            userAnswer={answers[q.id]}
            onAnswer={(ansIdx) => handleAnswer(q.id, ansIdx)}
          />
        ))}
      </div>
    </div>
  )
}

export default PatternQuiz
