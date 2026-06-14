import React, { useState, useEffect, useRef } from 'react';
import { MockTest, Question, QuizAttempt } from '../types';
import { 
  Clock, ArrowLeft, ArrowRight, HelpCircle, CheckCircle, AlertTriangle, 
  RotateCcw, BookOpen, AlertCircle, ChevronRight, Bookmark, X, Eye
} from 'lucide-react';

interface ExamEngineProps {
  test: MockTest;
  onClose: () => void;
  onSaveAttempt: (attempt: QuizAttempt) => void;
}

export default function ExamEngine({ test, onClose, onSaveAttempt }: ExamEngineProps) {
  // State variables for exam progression
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(test.durationMinutes * 60);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [showSubmitWarning, setShowSubmitWarning] = useState<boolean>(false);
  
  // Results summary
  const [attemptDetails, setAttemptDetails] = useState<QuizAttempt | null>(null);
  const [language, setLanguage] = useState<'EN' | 'GUJ'>('EN');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (!isPaused && !examSubmitted && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, examSubmitted, timeRemaining]);

  const handleAutoSubmit = () => {
    submitExam(true);
  };

  const handleSelectAnswer = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    if (examSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId] === option ? null : option
    }));
  };

  const toggleFlag = (questionId: string) => {
    if (examSubmitted) return;
    setFlaggedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  const clearAnswer = (questionId: string) => {
    if (examSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: null
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const submitExam = (forced = false) => {
    if (examSubmitted) return;
    
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    test.questions.forEach(q => {
      const answer = selectedAnswers[q.id];
      if (!answer) {
        unattemptedCount++;
      } else if (answer === q.correctOption) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    // Score calculation with -0.33 negative marking
    // Correct +1, Wrong -0.33
    const rawScore = (correctCount * 1) - (wrongCount * 0.33);
    const finalScore = parseFloat(Math.max(0, rawScore).toFixed(2));

    const timeTaken = (test.durationMinutes * 60) - timeRemaining;
    const percentage = Math.round((correctCount / test.questions.length) * 100);

    const attempt: QuizAttempt = {
      testId: test.id,
      answers: selectedAnswers,
      score: finalScore,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      unattempted: unattemptedCount,
      totalTimeTaken: timeTaken,
      percentage: percentage,
      timestamp: new Date().toLocaleDateString('gu-IN', { hour: 'numeric', minute: 'numeric' })
    };

    setAttemptDetails(attempt);
    setExamSubmitted(true);
    setShowSubmitWarning(false);
    onSaveAttempt(attempt);
  };

  const currentQuestion = test.questions[currentIdx];
  const isQuestionAnswered = (qId: string) => !!selectedAnswers[qId];
  const isQuestionFlagged = (qId: string) => flaggedQuestions.includes(qId);

  const totalAnsweredCount = Object.values(selectedAnswers).filter(val => val !== null).length;

  return (
    <div id="exam-mode-canvas" className="fixed inset-0 bg-neutral-50 z-50 overflow-y-auto flex flex-col font-sans">
      
      {/* Top Banner Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (examSubmitted || window.confirm("Are you sure you want to exit the test? Your current progress will be lost.")) {
                onClose();
              }
            }}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-brand-primary/10 text-brand-primary font-bold px-2 py-0.5 rounded-full">
                {test.category}
              </span>
              <span className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-medium">
                {test.questions.length} Items
              </span>
            </div>
            <h1 className="text-base md:text-lg font-bold text-neutral-800 line-clamp-1 mt-0.5">
              {language === 'EN' ? test.title : (test.titleGuj || test.title)}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Language Toggle toggler */}
          <div className="bg-neutral-100 p-0.5 rounded-lg flex border border-neutral-200">
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'EN' ? 'bg-white text-brand-primary shadow-sm' : 'text-neutral-500'}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('GUJ')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'GUJ' ? 'bg-white text-brand-primary shadow-sm' : 'text-neutral-500'}`}
            >
              ગુજરાતી
            </button>
          </div>

          {!examSubmitted && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-semibold text-sm ${
              timeRemaining < 120 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-brand-primary/5 text-brand-primary border-brand-primary/10'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}

          {examSubmitted && (
            <button 
              onClick={onClose}
              className="bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold px-4 py-2 rounded-[8px] transition-colors"
            >
              Back to Portal
            </button>
          )}
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT / CENTER STAGE: Active Question Paper */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {!examSubmitted ? (
            /* ACTIVE EXAM RUNNING */
            <div className="bg-white rounded-[12px] border border-neutral-200 p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
              
              {/* Question Header */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <span className="text-xs text-neutral-500 font-bold tracking-wider">
                    QUESTION {currentIdx + 1} OF {test.questions.length}
                  </span>
                  
                  <button
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors ${
                      isQuestionFlagged(currentQuestion.id)
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isQuestionFlagged(currentQuestion.id) ? 'fill-amber-600' : ''}`} />
                    <span>{isQuestionFlagged(currentQuestion.id) ? 'Flagged for Review' : 'Mark for Review'}</span>
                  </button>
                </div>

                {/* Question Text */}
                <div className="mb-6">
                  <span className="inline-block text-[11px] bg-brand-primary/5 text-brand-primary font-bold px-2 py-0.5 rounded mb-2">
                    {currentQuestion.subject}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-neutral-950 leading-relaxed">
                    {language === 'EN' ? currentQuestion.text : (currentQuestion.textGuj || currentQuestion.text)}
                  </h3>
                </div>

                {/* Option MCQs Grid */}
                <div className="space-y-3 mb-8">
                  {['A', 'B', 'C', 'D'].map((optKey) => {
                    const optionLabel = optKey as 'A' | 'B' | 'C' | 'D';
                    const isSelected = selectedAnswers[currentQuestion.id] === optionLabel;
                    const optionValue = language === 'EN' 
                      ? currentQuestion.options[optionLabel]
                      : (currentQuestion.optionsGuj?.[optionLabel] || currentQuestion.options[optionLabel]);

                    return (
                      <button
                        key={optKey}
                        onClick={() => handleSelectAnswer(currentQuestion.id, optionLabel)}
                        className={`w-full text-left p-4 rounded-[8px] border text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-brand-primary/5 border-brand-primary text-brand-primary shadow-sm'
                            : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border transition-colors ${
                            isSelected 
                              ? 'bg-brand-primary text-white border-brand-primary' 
                              : 'bg-neutral-100 border-neutral-300 text-neutral-600'
                          }`}>
                            {optKey}
                          </span>
                          <span>{optionValue}</span>
                        </div>
                        {isSelected && <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigator Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  onClick={() => clearAnswer(currentQuestion.id)}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className="px-4 py-2 text-xs font-bold text-neutral-500 rounded hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-40 transition-all"
                >
                  Clear Selection
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="flex items-center gap-1.5 px-4 py-2 border border-neutral-200 text-xs font-bold rounded-lg text-neutral-600 bg-white hover:bg-neutral-50 disabled:opacity-40 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentIdx < test.questions.length - 1) {
                        setCurrentIdx(prev => prev + 1);
                      } else {
                        setShowSubmitWarning(true);
                      }
                    }}
                    className="flex items-center gap-1.5 px-5 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold rounded-lg transition-all"
                  >
                    <span>{currentIdx === test.questions.length - 1 ? 'Finish & Submit' : 'Next'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* EXAM COMPLETED: SHOW SCORE & STATISTICS SCREEN */
            <div className="space-y-6">
              
              {/* Scorecard Widget Banner */}
              <div className="bg-white rounded-[12px] border border-neutral-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-6 flex items-center justify-between">
                  <span>Performance Report Card</span>
                  <span className="text-xs bg-brand-success/10 text-brand-success font-bold px-3 py-1 rounded-full">
                    Completed
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  
                  {/* Radial progress score */}
                  <div className="flex flex-col items-center justify-center p-4 bg-brand-primary/5 rounded-[12px] border border-brand-primary/10">
                    <div className="relative flex items-center justify-center w-28 h-28">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-neutral-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="transparent"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-brand-primary"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          strokeDasharray={`${attemptDetails?.percentage || 0}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-bold text-neutral-800">
                          {attemptDetails?.score}
                        </span>
                        <span className="block text-[10px] text-neutral-400 uppercase font-bold">
                          OUT OF {test.totalMarks}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-brand-primary mt-2">
                      Accuracy: {attemptDetails?.percentage}%
                    </div>
                  </div>

                  {/* Right side statistical breakdown */}
                  <div className="md:col-span-3 grid grid-cols-3 gap-4">
                    
                    <div className="bg-emerald-50 rounded-lg p-3.5 border border-emerald-100 text-center">
                      <span className="block text-xs font-semibold text-emerald-600">CORRECT</span>
                      <span className="text-2xl font-extrabold text-emerald-700">
                        {attemptDetails?.correctAnswers}
                      </span>
                      <span className="block text-[10px] text-emerald-500 font-bold mt-1">+1 Mark Each</span>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3.5 border border-red-100 text-center">
                      <span className="block text-xs font-semibold text-red-600">INCORRECT</span>
                      <span className="text-2xl font-extrabold text-red-700">
                        {attemptDetails?.wrongAnswers}
                      </span>
                      <span className="block text-[10px] text-red-500 font-bold mt-1">-0.33 Penalty</span>
                    </div>

                    <div className="bg-neutral-100 rounded-lg p-3.5 border border-neutral-200 text-center">
                      <span className="block text-xs font-semibold text-neutral-600">OMITTED</span>
                      <span className="text-2xl font-extrabold text-neutral-700">
                        {attemptDetails?.unattempted}
                      </span>
                      <span className="block text-[10px] text-neutral-500 font-bold mt-1">No Penalty</span>
                    </div>

                    <div className="col-span-3 bg-neutral-50 border border-neutral-200 rounded-[8px] p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-neutral-600 font-medium">
                        <Clock className="w-4 h-4 text-neutral-400" />
                        <span>Completion Time:</span>
                        <strong className="text-neutral-800">
                          {Math.floor((attemptDetails?.totalTimeTaken || 0) / 60)}m {(attemptDetails?.totalTimeTaken || 0) % 60}s
                        </strong>
                      </div>
                      <div className="text-neutral-500">
                        Attempt timestamp: <strong className="text-neutral-600">{attemptDetails?.timestamp}</strong>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* SECTION: Complete Detailed Review Solution Key */}
              <div className="bg-white rounded-[12px] border border-neutral-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-primary" />
                  <span>Interactive Answer Explanations Key</span>
                </h3>

                <div className="space-y-6 divide-y divide-neutral-100">
                  {test.questions.map((q, qIndex) => {
                    const chosen = selectedAnswers[q.id];
                    const isCorrect = chosen === q.correctOption;
                    const solvedState = !chosen ? 'skipped' : (isCorrect ? 'correct' : 'wrong');

                    return (
                      <div key={q.id} className={`pt-6 first:pt-0`}>
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                            solvedState === 'correct' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : solvedState === 'wrong' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {qIndex + 1}
                          </span>

                          <div className="flex-1">
                            {/* Question Title */}
                            <h4 className="text-sm font-semibold text-neutral-900 leading-normal">
                              {language === 'EN' ? q.text : (q.textGuj || q.text)}
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                              {['A', 'B', 'C', 'D'].map(key => {
                                const optKeyLabel = key as 'A' | 'B' | 'C' | 'D';
                                const oValue = language === 'EN'
                                  ? q.options[optKeyLabel]
                                  : (q.optionsGuj?.[optKeyLabel] || q.options[optKeyLabel]);
                                const isCorrectOpt = q.correctOption === optKeyLabel;
                                const isSelectedOpt = chosen === optKeyLabel;

                                return (
                                  <div 
                                    key={key}
                                    className={`p-3 rounded-lg text-xs font-medium border flex items-center gap-2 ${
                                      isCorrectOpt 
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                        : isSelectedOpt 
                                          ? 'bg-red-50 border-red-300 text-red-950'
                                          : 'bg-neutral-50 border-neutral-100 text-neutral-600'
                                    }`}
                                  >
                                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${
                                      isCorrectOpt 
                                        ? 'bg-emerald-600 text-white' 
                                        : isSelectedOpt 
                                          ? 'bg-red-600 text-white' 
                                          : 'bg-neutral-200 text-neutral-700'
                                    }`}>
                                      {key}
                                    </span>
                                    <span>{oValue}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* State Banner */}
                            <div className="mt-3 flex items-center gap-2">
                              {solvedState === 'correct' && (
                                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Answered Correctly (+1.00 Marks)</span>
                                </span>
                              )}
                              {solvedState === 'wrong' && (
                                <span className="inline-flex items-center gap-1 text-xs text-red-600 font-bold">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  <span>Answered Incorrectly (-0.33 Negative Marks / Correct is {q.correctOption})</span>
                                </span>
                              )}
                              {solvedState === 'skipped' && (
                                <span className="inline-flex items-center gap-1 text-xs text-neutral-500 font-bold">
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  <span>Skipped / Unattempted (0.00 Weight) / Correct is {q.correctOption}</span>
                                </span>
                              )}
                            </div>

                            {/* Detailed Explanation */}
                            <div className="mt-4 bg-yellow-50/50 border border-yellow-100 p-3.5 rounded-lg">
                              <span className="block text-[11px] text-amber-800 font-bold uppercase tracking-wider mb-1">
                                Explanation & Solution:
                              </span>
                              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                                {language === 'EN' ? q.explanation : (q.explanationGuj || q.explanation)}
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: Question Navigation Console */}
        <div className="flex flex-col gap-6">
          
          {/* Status Gauge Grid */}
          <div className="bg-white rounded-[12px] border border-neutral-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-2 mb-4">
              {examSubmitted ? 'Exam Analytics Summary' : 'Question Palette Console'}
            </h3>

            {!examSubmitted ? (
              <>
                {/* Visual grid numbers */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {test.questions.map((q, idx) => {
                    const isCurrent = currentIdx === idx;
                    const isAnswered = isQuestionAnswered(q.id);
                    const isFlagged = isQuestionFlagged(q.id);

                    let btnStyles = 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border-neutral-200';
                    if (isAnswered && !isFlagged) {
                      btnStyles = 'bg-emerald-500 border-emerald-500 text-white font-bold';
                    } else if (isFlagged) {
                      btnStyles = 'bg-amber-500 border-amber-500 text-white font-bold';
                    }

                    if (isCurrent) {
                      btnStyles += ' ring-2 ring-brand-primary ring-offset-2';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`w-10 h-10 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center ${btnStyles}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Color map legends */}
                <div className="space-y-2 text-xs font-medium text-neutral-600 border-t border-neutral-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-emerald-500 rounded-md inline-block" />
                    <span>Answered ({totalAnsweredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-amber-500 rounded-md inline-block" />
                    <span>Marked for Review ({flaggedQuestions.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-neutral-100 border border-neutral-300 rounded-md inline-block" />
                    <span>Omitted / Unvisited ({test.questions.length - totalAnsweredCount})</span>
                  </div>
                </div>

                {/* Final Submission Card */}
                <button
                  onClick={() => setShowSubmitWarning(true)}
                  className="w-full bg-[#1A73E8] hover:bg-brand-primary-dark text-white text-xs font-bold py-3 px-4 rounded-[8px] transition-colors mt-6 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Exam Paper</span>
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-3xl font-extrabold text-brand-primary">
                    {attemptDetails?.score} / {test.totalMarks}
                  </div>
                  <div className="text-xs text-neutral-400 font-bold uppercase mt-1">Total Marks Score</div>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                  <div className="flex justify-between">
                    <span>Final Marks Weight:</span>
                    <strong className="text-neutral-800">{attemptDetails?.score} pts</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Correct Ratio:</span>
                    <strong className="text-emerald-600">{attemptDetails?.correctAnswers} / {test.questions.length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Wrong Answers:</span>
                    <strong className="text-red-600">{attemptDetails?.wrongAnswers}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Skipped Unanswered:</span>
                    <strong className="text-neutral-700">{attemptDetails?.unattempted}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade Category:</span>
                    <strong className="text-brand-primary">
                      {((attemptDetails?.score || 0) / test.totalMarks) >= 0.7 ? 'Excellent pass' : 'Requires revision'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-2.5 px-4 rounded-[8px] transition-colors mt-4"
                >
                  Back to Hub
                </button>
              </div>
            )}
          </div>

          {/* Exam Regulations Advice Card */}
          <div className="bg-white rounded-[12px] border border-neutral-200 p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              GPSC / GSSSB Regulations
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-500 leading-relaxed font-medium">
              <p>
                • <strong>Negative Marks:</strong> Each incorrect multiple-choice answer incurs a penalty reduction of <strong>0.33 pts</strong>.
              </p>
              <p>
                • Leaving a question unselected/omitted earns zero marks and incurs no penalty reduction.
              </p>
              <p>
                • Be mindful of the countdown clock; exams auto-submit on completion.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: SUBMISSION CONFLICT ALERT & CONFIRMATION */}
      {showSubmitWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[12px] p-6 max-w-sm w-full shadow-xl border border-neutral-300">
            <div className="flex items-center gap-3 text-brand-warning mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <div>
                <h4 className="text-base font-bold text-neutral-900">Submit Exam Sheet?</h4>
                <p className="text-xs text-neutral-500">Please review your omissions status below</p>
              </div>
            </div>

            <div className="space-y-3.5 my-5 bg-neutral-50 p-4 rounded-lg border border-neutral-100 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Total Exam Questions:</span>
                <span className="font-bold text-neutral-800">{test.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Answers:</span>
                <span className="font-bold text-neutral-800">{totalAnsweredCount}</span>
              </div>
              <div className="flex justify-between text-amber-600">
                <span>Remaining/Unanswered:</span>
                <span className="font-bold">{test.questions.length - totalAnsweredCount}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 leading-normal mb-6">
              Submission is permanent. Once submitted, answers are sealed and graded with GPSC regulations rules.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitWarning(false)}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-2.5 px-4 rounded-[8px] transition-colors"
              >
                Go Back / Review
              </button>
              <button
                onClick={() => submitExam()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-[8px] transition-colors shadow-sm"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
