import React from 'react';
import { QuizAttempt, MockTest } from '../types';
import { 
  TrendingUp, Award, Calendar, CheckSquare, Clock, Trash2, 
  AlertCircle, BookOpen, ThumbsUp, ArrowRight, Lightbulb 
} from 'lucide-react';
import { SAMPLE_TESTS } from '../data';

interface AnalyticsChartsProps {
  attempts: QuizAttempt[];
  onClearHistory: () => void;
  onSelectTestById: (id: string) => void;
}

export default function AnalyticsCharts({ attempts, onClearHistory, onSelectTestById }: AnalyticsChartsProps) {
  
  if (attempts.length === 0) {
    return (
      <div className="bg-white rounded-[12px] p-8 text-center border border-neutral-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mb-4 border border-brand-primary/15 animate-bounce">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-neutral-800">No Mock Attempts Recorded Yet</h3>
        <p className="text-sm text-neutral-500 max-w-sm mt-2 leading-relaxed">
          Start your competitive test prep! Take any of our free practice exams, and we will analyze your speed and accuracy right here.
        </p>
      </div>
    );
  }

  // Calculate high-level metrics
  const totalTests = attempts.length;
  const averageAccuracy = Math.round(
    attempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalTests
  );
  const averageScore = parseFloat(
    (attempts.reduce((acc, curr) => acc + curr.score, 0) / totalTests).toFixed(2)
  );

  const bestAttempt = [...attempts].sort((a, b) => b.score - a.score)[0];
  const totalCorrectVal = attempts.reduce((acc, curr) => acc + curr.correctAnswers, 0);
  const totalWrongVal = attempts.reduce((acc, curr) => acc + curr.wrongAnswers, 0);

  // Subject performance analyzer
  // Let's trace back questions from tests to see which subject was checked
  const subjectPerformance: Record<string, { correct: number; total: number }> = {
    "Gujarat History & Culture": { correct: 0, total: 0 },
    "Gujarati Grammar & Lit": { correct: 0, total: 0 },
    "Indian Polity & Constitution": { correct: 0, total: 0 },
    "General Mental Ability": { correct: 0, total: 0 },
    "General Science & Tech": { correct: 0, total: 0 }
  };

  attempts.forEach(attempt => {
    const parentTest = SAMPLE_TESTS.find(t => t.id === attempt.testId);
    if (!parentTest) return;

    parentTest.questions.forEach(q => {
      const userAns = attempt.answers[q.id];
      const subj = q.subject || "Gujarat History & Culture";
      
      if (subjectPerformance[subj]) {
        subjectPerformance[subj].total += 1;
        if (userAns === q.correctOption) {
          subjectPerformance[subj].correct += 1;
        }
      }
    });
  });

  const subjectsAnalysisList = Object.entries(subjectPerformance).filter(([_, val]) => val.total > 0);

  // Determine strengths & absolute weaknesses
  let bestSubject = "General Knowledge";
  let bestRatio = -1;
  let workNeededSubject = "Indian Polity & Constitution";
  let worstRatio = 2;

  subjectsAnalysisList.forEach(([subj, data]) => {
    const ratio = data.correct / data.total;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestSubject = subj;
    }
    if (ratio < worstRatio) {
      worstRatio = ratio;
      workNeededSubject = subj;
    }
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* SECTION 1: Standard Metrics Ribbon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-[12px] border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-xl flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Attempted</span>
            <span className="text-xl font-black text-neutral-800">{totalTests} Mock Tests</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[12px] border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-brand-warning rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Average Score</span>
            <span className="text-xl font-black text-neutral-800">{averageScore} Marks</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[12px] border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-brand-success rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Accuracy Rate</span>
            <span className="text-xl font-black text-emerald-600">{averageAccuracy}%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[12px] border border-neutral-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Top Form Score</span>
            <span className="text-xl font-black text-purple-700">{bestAttempt.score} Marks</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: Dynamic Visual and Subject Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Dynamic Horizontal bar Charts for Subject-wise diagnostics */}
        <div className="lg:col-span-3 bg-white p-6 rounded-[12px] border border-neutral-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-primary" />
              <span>Diagnostic Performance by Subject Area</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Tracks actual correct response counts relative to attempted topics
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {subjectsAnalysisList.map(([subj, data]) => {
              const perc = Math.round((data.correct / data.total) * 100);
              return (
                <div key={subj} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-neutral-700">{subj}</span>
                    <span className="text-neutral-400 font-bold uppercase">
                      {data.correct}/{data.total} correct <span className="text-brand-primary ml-1">({perc}%)</span>
                    </span>
                  </div>
                  {/* Custom progress visual */}
                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        perc >= 75 ? 'bg-emerald-500' : perc >= 45 ? 'bg-brand-primary' : 'bg-rose-500'
                      }`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core AI strategic advice inside analytics */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mt-6 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-900 leading-relaxed font-semibold">
              <strong className="block text-brand-primary mb-1">🎯 Candidate Actionable Advice:</strong>
              • Your primary stronghold subject is <span className="text-emerald-700 font-bold">"{bestSubject}"</span>. Maintain this rhythm!<br />
              • Focus more efforts on <span className="text-rose-700 font-bold">"{workNeededSubject}"</span> where accuracy is currently lower. Attempt daily quiz revisions for this subject.
            </div>
          </div>
        </div>

        {/* Dynamic historic scores plots */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[12px] border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-neutral-900">Score Progress</h3>
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Last {attempts.length} Exams</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 mb-4">
              Visualizing final score points with negative penalties calculated
            </p>

            {/* Custom SVG Bar Graph */}
            <div className="h-44 w-full flex items-end justify-between border-b border-l border-neutral-200 pb-2 pt-4 px-2 bg-neutral-50/50 rounded-lg">
              {attempts.slice(-6).map((item, idx) => {
                const maxAttemptScore = 10;
                // Height ratio
                const heightPercent = Math.max(12, Math.min(100, (item.score / maxAttemptScore) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer mx-1.5 h-full justify-end">
                    
                    {/* Tooltip on hovering */}
                    <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-neutral-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md pointer-events-none transition-opacity whitespace-nowrap">
                      Score: {item.score} pts
                    </span>

                    {/* Cylinder bar representation */}
                    <div 
                      className="w-full bg-brand-primary hover:bg-brand-primary-dark rounded-t-md transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />

                    {/* X axis indicator */}
                    <span className="text-[9px] font-bold text-neutral-400 mt-1.5">
                      #0{idx+1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[10px] text-neutral-400 text-center mt-3 font-semibold">
            Interactive graph. Hover any bar indicator to view point scores.
          </p>
        </div>

      </div>

      {/* SECTION 3: Detailed Historics Listings */}
      <div className="bg-white rounded-[12px] p-6 border border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-primary" />
            <span>Attempt Archive History</span>
          </h3>

          <button 
            onClick={() => {
              if (window.confirm("Permanently wipe your practice exam history logs? This is non-reversible.")) {
                onClearHistory();
              }
            }}
            className="text-xs hover:bg-neutral-100 text-rose-600 font-bold px-2.5 py-1.5 rounded transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Wipe History</span>
          </button>
        </div>

        {/* List index */}
        <div className="space-y-3">
          {attempts.map((item, idx) => {
            const correspondingTest = SAMPLE_TESTS.find(t => t.id === item.testId);
            return (
              <div 
                key={idx} 
                className="bg-neutral-50/50 hover:bg-neutral-50 p-4 border border-neutral-200 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-neutral-200 font-semibold px-2 py-0.5 text-neutral-600 rounded">
                      Attempt #{attempts.length - idx}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {item.timestamp}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-800 mt-1.5">
                    {correspondingTest?.title || 'Practice Mock Exam'}
                  </h4>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 min-w-xs">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-neutral-800">
                      Score: {item.score} / {correspondingTest?.questions.length || 10}
                    </div>
                    <div className="text-[11px] text-green-600 font-bold uppercase tracking-wider">
                      {item.percentage}% Accuracy
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTestById(item.testId)}
                    className="bg-white hover:bg-brand-primary/5 text-brand-primary text-xs font-bold py-1.5 px-3 border border-neutral-200 hover:border-brand-primary rounded transition-all flex items-center gap-1"
                  >
                    <span>Re-Take</span>
                    <ArrowRight className="w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
