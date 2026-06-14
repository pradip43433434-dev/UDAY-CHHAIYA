import React, { useState, useEffect } from 'react';
import { 
  SAMPLE_TESTS, SAMPLE_COURSES, MOCK_JOB_ALERTS, MOCK_LEADERBOARD, 
  EXAM_CATEGORIES, SUBJECTS_LIST 
} from './data';
import { MockTest, Course, QuizAttempt, JobAlert, LeaderboardUser } from './types';
import ExamEngine from './components/ExamEngine';
import SyllabusManager from './components/SyllabusManager';
import AnalyticsCharts from './components/AnalyticsCharts';
import VideoPlayer from './components/VideoPlayer';
import AISmartTutor from './components/AISmartTutor';
import { 
  Award, BookOpen, Clock, Calendar, CheckCircle2, ChevronRight, Search, 
  Sparkles, Filter, Lock, Play, TrendingUp, HelpCircle, AlertCircle, 
  Crown, Flame, User, Users, ChevronLeft, Volume2, BellDot, Heart, LayoutDashboard, Database,
  BookCheck, X
} from 'lucide-react';

export default function App() {
  // Tab Navigation state
  const [activeTab, setActiveTab] = useState<'tests' | 'courses' | 'syllabus' | 'ai-tutor' | 'analytics' | 'rankings'>('tests');
  
  // Category & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All Exams');
  const [searchText, setSearchText] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('All Subjects');

  // Exam overlay active state
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  
  // Video course player overlay active state
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Completed Test results history state (offline local-storage persistency)
  const [completeAttempts, setCompleteAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('ojas_completed_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  // Premium simulation unlock states
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    const p = localStorage.getItem('ojas_is_premium');
    return p === 'true';
  });
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
  const [simulatedCardNumber, setSimulatedCardNumber] = useState<string>('');
  const [simulatedCardHolder, setSimulatedCardHolder] = useState<string>('');
  const [premiumSuccess, setPremiumSuccess] = useState<boolean>(false);

  // Active Job notification modal details state
  const [selectedJob, setSelectedJob] = useState<JobAlert | null>(null);

  // Ticker bulletin rotation
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('ojas_completed_attempts', JSON.stringify(completeAttempts));
  }, [completeAttempts]);

  useEffect(() => {
    localStorage.setItem('ojas_is_premium', isPremium ? 'true' : 'false');
  }, [isPremium]);

  // Rotates jobs tickers continuously
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % MOCK_JOB_ALERTS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const handleSaveAttempt = (attempt: QuizAttempt) => {
    setCompleteAttempts(prev => [attempt, ...prev]);
  };

  const handleClearHistory = () => {
    setCompleteAttempts([]);
    localStorage.removeItem('ojas_completed_attempts');
  };

  // Simulate premium payment
  const handleUpgradePremium = (e: React.FormEvent) => {
    e.preventDefault();
    setPremiumSuccess(true);
    setTimeout(() => {
      setIsPremium(true);
      setShowPremiumModal(false);
      setPremiumSuccess(false);
      setSimulatedCardNumber('');
      setSimulatedCardHolder('');
    }, 1800);
  };

  // Score stats inside calculations
  const totalUserXP = completeAttempts.reduce((acc, c) => acc + (c.correctAnswers * 10), 0) + (isPremium ? 500 : 0);

  // Filter mock exam list
  const filteredTests = SAMPLE_TESTS.filter(test => {
    const matchesCategory = selectedCategory === 'All Exams' || test.category === selectedCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          (test.titleGuj && test.titleGuj.toLowerCase().includes(searchText.toLowerCase()));
    
    // Subject filter by looking if any question of typical subject matches
    const matchesSubject = subjectFilter === 'All Subjects' || 
                           test.questions.some(q => q.subject === subjectFilter);
    
    return matchesCategory && matchesSearch && matchesSubject;
  });

  // Filter video courses list
  const filteredCourses = SAMPLE_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          course.subject.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const activeTickerJob = MOCK_JOB_ALERTS[tickerIndex];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans select-none antialiased">
      
      {/* 🚀 BANNER TICKER REPORT: OJAS GOVERNMENT JOB RECRUITMENTS STATUS */}
      <div className="bg-[#1A73E8] text-white py-2 px-4 shadow-sm relative overflow-hidden text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 animate-pulse">
            <BellDot className="w-4 h-4 text-brand-warning fill-amber-300 flex-shrink-0" />
            <span className="bg-brand-success text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
              NEW NOTIFICATION
            </span>
          </div>

          <div className="flex-1 md:text-center text-[11px] truncate">
            <span>Advt No: <strong>{activeTickerJob.advertisementNo}</strong> - {activeTickerJob.title}</span>
            <span className="hidden md:inline text-blue-200 ml-2">| Ends: <strong>{activeTickerJob.endDate}</strong></span>
          </div>

          <button 
            onClick={() => setSelectedJob(activeTickerJob)}
            className="text-[10px] bg-white text-brand-primary border border-white hover:bg-neutral-100 font-bold px-3 py-1 rounded transition-colors uppercase whitespace-nowrap cursor-pointer"
          >
            Check Details
          </button>
        </div>
      </div>

      {/* 🏛️ PRIMARY BRAND HEADER & CONFIG BAR */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Name */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A73E8] rounded-[10px] flex items-center justify-center text-white shadow-md shadow-brand-primary/20">
                <LayoutDashboard className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-neutral-900 tracking-tight">OJAS</span>
                  <span className="text-xl font-medium text-brand-primary">TEST</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-bold tracking-wider uppercase">
                  GUJARAT COMPETITIVE TRAINING HUB
                </div>
              </div>
            </div>

            {/* Quick Status Pill for mobile */}
            <div className="md:hidden flex items-center gap-2">
              {isPremium ? (
                <span className="bg-amber-100 border border-amber-200 rounded-full px-2.5 py-1 text-[10px] text-amber-700 font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-500" />
                  <span>PREMIUM</span>
                </span>
              ) : (
                <button 
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-brand-warning hover:bg-amber-500 text-neutral-950 font-bold px-3 py-1 rounded-full text-[10px] flex items-center gap-1 shadow-xs"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>UPGRADE</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop Search + Action Center */}
          <div className="flex items-center justify-end flex-wrap md:flex-nowrap gap-4 w-full md:w-auto">
            
            {/* Search Frame */}
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search mock drills, course topics..."
                className="w-full bg-neutral-100 border border-neutral-200 rounded-[8px] pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-brand-primary focus:border-brand-primary focus:outline-hidden"
              />
            </div>

            {/* Simulated Student Points Card */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
              <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500 animate-pulse" />
              <div className="text-left leading-none">
                <span className="block text-[8px] text-neutral-400 font-bold uppercase">Candidate Score</span>
                <span className="text-xs font-black text-neutral-800">{totalUserXP} XP</span>
              </div>
            </div>

            {/* Premium Upgrade Actions */}
            <div className="hidden md:block">
              {isPremium ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-1.5 text-xs text-amber-700 font-bold flex items-center gap-1.5 shadow-xs">
                  <Crown className="w-4 h-4 fill-amber-500 text-amber-600" />
                  <span>Premium Access</span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-brand-warning hover:bg-amber-500 text-neutral-950 font-bold px-4 py-1.5 rounded-[8px] text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Upgrade to Premium</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* 🧭 TABS NAVIGATION MENU */}
      <nav className="bg-white border-b border-neutral-200/80 sticky top-[69px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1.5 overflow-x-auto py-2.5 scrollbar-thin">
            
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'tests' 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <BookCheck className="w-4 h-4" />
              <span>📝 Practice Exams</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'courses' 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>📚 Video Lectures</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'syllabus' 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>🎯 Syllabus Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-tutor')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'ai-tutor' 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>🧠 Gemini AI Strategic Tutor</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'analytics' 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>📊 Performance Analysis ({completeAttempts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'rankings' 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>🏆 State Leaderboards</span>
            </button>

          </div>
        </div>
      </nav>

      {/* 🛡️ CENTRAL CANVAS BODY */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: PRACTICE EXAMS DIRECTORY */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            
            {/* Filter controls row */}
            <div className="bg-white p-4 rounded-[12px] border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Left filter presets */}
              <div className="flex flex-wrap gap-2">
                {EXAM_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat 
                        ? 'bg-brand-primary text-white shadow-xs' 
                        : 'bg-neutral-100 hover:bg-neutral-250 text-neutral-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Right subject dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                  <Filter className="w-3 h-3 text-neutral-400" />
                  <span>Subject:</span>
                </span>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="bg-neutral-150 border border-neutral-250 rounded-lg text-xs font-bold px-3 py-1.5 focus:outline-hidden"
                >
                  {SUBJECTS_LIST.map(sj => (
                    <option key={sj} value={sj}>{sj}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Mock Test listing visual grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => {
                const alreadyTried = completeAttempts.find(att => att.testId === test.id);
                // Locked if not free and user hasn't unlocked premium
                const isLocked = !test.isFree && !isPremium;

                return (
                  <div 
                    key={test.id} 
                    className="bg-white rounded-[12px] shadow-sm border border-neutral-200 flex flex-col justify-between overflow-hidden group hover:shadow-lvl1 transition-all"
                  >
                    
                    {/* Upper decorative and badges section */}
                    <div className="p-5 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-brand-primary/10 text-brand-primary font-bold px-2.5 py-0.5 rounded-full">
                          {test.category}
                        </span>

                        {isLocked ? (
                          <span className="bg-neutral-100 border border-neutral-200 text-neutral-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1 line-height-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Premium</span>
                          </span>
                        ) : test.isFree ? (
                          <span className="bg-brand-success/10 text-brand-success text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                            FREE MOCK
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5 fill-amber-500 text-amber-600" />
                            <span>Unlocked</span>
                          </span>
                        )}
                      </div>

                      {/* Card Title */}
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">
                          {test.title}
                        </h3>
                        <h4 className="text-xs text-neutral-500 font-medium tracking-normal mt-1 block leading-relaxed" dir="ltr">
                          {test.titleGuj}
                        </h4>
                      </div>

                      {/* Diagnostics list */}
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-neutral-500 bg-brand-background rounded-lg p-2 border border-neutral-100">
                        <div>
                          <span className="block text-[8px] text-neutral-400 font-bold uppercase">Questions</span>
                          <strong className="text-neutral-700 font-bold">{test.questions.length}</strong>
                        </div>
                        <div>
                          <span className="block text-[8px] text-neutral-400 font-bold uppercase">Duration</span>
                          <strong className="text-neutral-700 font-bold">{test.durationMinutes} mins</strong>
                        </div>
                        <div>
                          <span className="block text-[8px] text-neutral-400 font-bold uppercase">Difficulty</span>
                          <strong className="text-neutral-700 font-bold">{test.difficulty}</strong>
                        </div>
                      </div>

                    </div>

                    {/* Footer Trigger buttons */}
                    <div className="bg-neutral-50 border-t border-neutral-100 px-5 py-3.5 flex items-center justify-between">
                      
                      {alreadyTried ? (
                        <div className="text-[10px] text-brand-success font-bold flex items-center gap-1 select-none">
                          <CheckCircle2 className="w-4 h-4 text-brand-success" />
                          <span>Last Score: {alreadyTried.score}/{test.totalMarks}</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-neutral-400 font-semibold uppercase">
                          No attempts recorded
                        </div>
                      )}

                      {isLocked ? (
                        <button
                          onClick={() => setShowPremiumModal(true)}
                          className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Unlock Premium</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTest(test)}
                          className="bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold py-1.5 px-4.5 rounded-[6px] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <span>Start Mock</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Empty stats listing indicator */}
            {filteredTests.length === 0 && (
              <div className="bg-white rounded-xl border border-neutral-200 py-12 px-6 text-center shadow-xs">
                <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-neutral-700">No Mock Tests Match Your Search Criteria</h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1 leading-normal">
                  Try tweaking your category filtering or search keywords.
                </p>
                <button
                  onClick={() => { setSearchText(''); setSelectedCategory('All Exams'); setSubjectFilter('All Subjects'); }}
                  className="bg-brand-background text-brand-primary text-xs font-bold mt-4 px-4 py-2 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* RECRUITMENT CALENDAR AND PROCESS HIGHLIGHTS FOR SAURASHTRA & GUJARAT EXAMS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
              
              {/* GSSSB NEWS BULLETIN LIST CARD */}
              <div className="lg:col-span-2 bg-white rounded-[12px] border border-neutral-200 p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-neutral-900 border-b border-neutral-100 pb-3 mb-4 flex items-center gap-2">
                  <BellDot className="w-5 h-5 text-brand-primary" />
                  <span>State Recruitment Bulletins Calendar</span>
                </h3>

                <div className="space-y-4">
                  {MOCK_JOB_ALERTS.map(job => (
                    <div 
                      key={job.id}
                      className="p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[#1A73E8] flex-shrink-0 flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] bg-neutral-200 text-neutral-600 font-semibold px-2 py-0.5 rounded">
                            {job.dept}
                          </span>
                          <span className="text-[10px] text-red-500 font-bold">
                            Ends: {job.endDate}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-neutral-800 line-clamp-1 mt-1.5">
                          {job.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">
                          Advertisement No: <strong className="text-neutral-500 font-semibold">{job.advertisementNo}</strong> • Total Posts: <strong className="text-neutral-600 font-bold">{job.totalPosts} vacancies</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedJob(job)}
                        className="text-xs font-bold text-brand-primary border border-brand-primary/10 hover:bg-brand-primary/5 px-3 py-1.5 rounded"
                      >
                        Syllabus
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SAURASHTRA STUDY COMPANION SUMMARY CARD */}
              <div className="bg-white rounded-[12px] border border-neutral-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 border-b border-neutral-100 pb-2 mb-3">
                    Exam Preparation Checklist
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                    The road to clearing Gujarat Administrative Services (GPSC Class 1-2) or Clerical Exams requires daily practice.
                  </p>

                  <ul className="space-y-3 mt-4 text-xs font-semibold text-neutral-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-success mt-0.5 flex-shrink-0" />
                      <span>Attempt 1 Free History Mock Drill weekly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-success mt-0.5 flex-shrink-0" />
                      <span>Verify Sandhi and Samas grammar secrets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-success mt-0.5 flex-shrink-0" />
                      <span>Maintain a daily running standard regime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-success mt-0.5 flex-shrink-0" />
                      <span>Review mistakes via Stats Analysis board</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-3.5 border border-neutral-200 text-xs text-neutral-500 mt-6 flex items-center justify-between">
                  <span>Upgrade states:</span>
                  <strong className="text-brand-primary">{isPremium ? "Unlocked Unlimited Mode" : "Basic Free Preview Mode"}</strong>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: VIDEO LECTURES HUB */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            
            {activeCourse ? (
              <VideoPlayer 
                course={activeCourse} 
                onClose={() => setActiveCourse(null)} 
              />
            ) : (
              /* Course exploration listing frame */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const isLocked = !course.isFree && !isPremium;

                  return (
                    <div 
                      key={course.id}
                      className="bg-white rounded-[12px] border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lvl1 transition-all flex flex-col justify-between"
                    >
                      {/* Thumbnail container */}
                      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
                        <img 
                          src={course.thumbnailUrl} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 bg-neutral-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {course.subject}
                        </span>

                        {isLocked && (
                          <div className="absolute inset-0 bg-neutral-900/70 flex flex-col items-center justify-center text-white text-xs p-4">
                            <Lock className="w-8 h-8 text-white mb-2" />
                            <span className="font-bold">OJAS Premium Required</span>
                          </div>
                        )}
                      </div>

                      {/* Course description body */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-sm font-bold text-neutral-800 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-neutral-500" dir="ltr">
                          {course.titleGuj}
                        </p>

                        <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-t border-neutral-100 pt-3">
                          <span className="flex items-center gap-1 text-xs">
                            <User className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{course.instructor}</span>
                          </span>
                          <span className="inline-block text-[10px] bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full uppercase">
                            {course.lessons.length} video lectures
                          </span>
                        </div>
                      </div>

                      {/* Play Action footer button */}
                      <div className="bg-neutral-50 px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between">
                        <div className="text-xs text-neutral-400 font-medium">
                          ★ {course.rating} Rating
                        </div>

                        {isLocked ? (
                          <button
                            onClick={() => setShowPremiumModal(true)}
                            className="bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Lock className="w-3 h-3 text-white" />
                            <span>Unlock Lectures</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveCourse(course)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current text-white" />
                            <span>Start Lessons</span>
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: SYLLABUS TICKER */}
        {activeTab === 'syllabus' && (
          <SyllabusManager />
        )}

        {/* TAB 4: INTERACTIVE GEMINI CHAT Strategic AI assistant */}
        {activeTab === 'ai-tutor' && (
          <AISmartTutor />
        )}

        {/* TAB 5: STATS PERFORMANCE ANALYSIS HISTORICAL VIEW */}
        {activeTab === 'analytics' && (
          <AnalyticsCharts 
            attempts={completeAttempts}
            onClearHistory={handleClearHistory}
            onSelectTestById={(id) => {
              const matchingTest = SAMPLE_TESTS.find(t => t.id === id);
              if (matchingTest) {
                setActiveTest(matchingTest);
              }
            }}
          />
        )}

        {/* TAB 6: STATE RANKINGS PANEL */}
        {activeTab === 'rankings' && (
          <div className="bg-white rounded-[12px] border border-neutral-200 p-6 shadow-sm max-w-3xl mx-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-primary" />
                  <span>State Competitive Leaderboards</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Real-time rank list of candidates practicing weekly mocks on OJAS
                </p>
              </div>

              <span className="text-[10px] bg-neutral-100 font-bold px-2 py-0.5 rounded text-neutral-500 uppercase">
                Active Weekly Cycle
              </span>
            </div>

            {/* Display candidate ranking rows */}
            <div className="space-y-3">
              {MOCK_LEADERBOARD.map((usr) => (
                <div 
                  key={usr.rank}
                  className="bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200 p-3.5 rounded-lg flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    
                    {/* Medal rank representation */}
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      usr.rank === 1 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : usr.rank === 2 
                          ? 'bg-neutral-200 text-neutral-800' 
                          : usr.rank === 3 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      #{usr.rank}
                    </span>

                    {/* Avatar representation image config */}
                    <img 
                      src={usr.avatar} 
                      alt={usr.name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-300 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">
                        {usr.name}
                      </h4>
                      <span className="inline-block text-[9px] bg-brand-primary/5 text-brand-primary font-semibold px-1.5 py-0.5 rounded mt-0.5">
                        {usr.badge}
                      </span>
                    </div>

                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-neutral-800">
                      {usr.score} Score pts
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 font-medium">
                      {usr.testsGiven} practice mock drills completed
                    </div>
                  </div>

                </div>
              ))}

              {/* Simulated Current User Row showing comparative score */}
              <div className="bg-brand-primary/5 border border-brand-primary/30 p-4 rounded-lg flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-xs">
                    #27
                  </span>
                  
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
                    PR
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-brand-primary flex items-center gap-1.5">
                      <span>You (Candidate Aspirant)</span>
                      <Sparkles className="w-3.5 h-3.5 text-brand-warning fill-amber-300" />
                    </h4>
                    <span className="text-[9px] text-neutral-500 font-medium">
                      Status: Active Preparations • {totalUserXP} XP Points
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-neutral-800">
                    {completeAttempts.length > 0 ? `${completeAttempts[0].score} pts` : "0 pts"}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase block">
                    Last Practice Mark
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-xs text-neutral-500 font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="block font-bold text-neutral-800">OJAS Test Preparation Portal © 2026</span>
            <span className="text-neutral-400 text-[11px] font-medium block mt-1">
              Authorized civil service and clerical practice resource hub. Support Noto Sans Gujarati.
            </span>
          </div>

          <div className="flex gap-4">
            <button className="hover:text-brand-primary">Recruitment Rules</button>
            <button className="hover:text-brand-primary">Official Syllabus GSSSB / GPSC</button>
            <button className="hover:text-brand-primary">Contact Helpdesk</button>
          </div>
        </div>
      </footer>

      {/* ⚠️ MOCK MOCK ACTIVE EXAM WORKSPACE MODAL OVERLAY */}
      {activeTest && (
        <ExamEngine 
          test={activeTest}
          onClose={() => setActiveTest(null)}
          onSaveAttempt={handleSaveAttempt}
        />
      )}

      {/* 💳 INVOICE MODAL: SIMULATED PAYMENT UPGRADE SCREEN */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[12px] p-6 max-w-md w-full shadow-xl border border-neutral-300 font-sans">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-1.5">
                <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>Unlock OJAS Premium Pack</span>
              </h3>
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {premiumSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-brand-success/10 text-brand-success rounded-full flex items-center justify-center mx-auto border border-brand-success/15 animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-lg font-bold text-neutral-800">Upgrade Complete!</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-normal">
                  Premium mock tests, video masterclasses, and PDF lecture notes have been successfully unlocked!
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpgradePremium} className="space-y-4">
                
                {/* Benefits List */}
                <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-3.5 space-y-2.5 text-xs text-amber-900">
                  <span className="font-bold block text-amber-950">Active Premium Benefits:</span>
                  <div className="space-y-1.5 leading-relaxed font-semibold text-[11px] text-amber-800">
                    <div>• Instant unlocked access to all GPSC & Police mock drills.</div>
                    <div>• Unlimited streaming of premium video lectures + PDF downloads.</div>
                    <div>• Exclusive mock solutions explanations.</div>
                    <div>• Premium visual dashboard rank + 500 bonus XP points!</div>
                  </div>
                </div>

                {/* Simulated Payment Inputs */}
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase block">
                    Simulated Invoice Amount
                  </label>
                  <div className="bg-neutral-100 p-2.5 rounded border border-neutral-200 font-bold text-sm text-neutral-850 flex justify-between">
                    <span>OJAS Premium Exam Season Pass</span>
                    <span className="text-[#1A73E8]">₹299 (Simulated Payment)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase block">
                    Card Number (Simulation)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={simulatedCardNumber}
                    onChange={(e) => setSimulatedCardNumber(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-[8px] px-3 py-2 text-xs focus:ring-1 focus:ring-brand-primary"
                  />
                  <p className="text-[9px] text-neutral-400 font-medium">Any simulated test characters conform to guidelines.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase block">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate Name"
                    value={simulatedCardHolder}
                    onChange={(e) => setSimulatedCardHolder(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-[8px] px-3 py-2 text-xs focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold py-3 rounded-[8px] transition-all flex items-center justify-center gap-1.5 shadow-md mt-6 cursor-pointer"
                >
                  <Crown className="w-4 h-4 fill-white" />
                  <span>Pay & Upgrade Instantly</span>
                </button>

              </form>
            )}

          </div>
        </div>
      )}

      {/* 📰 JOB EXAM ADV DETAIL DIALOG POPUP */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[12px] p-6 max-w-md w-full shadow-xl border border-neutral-300 font-sans space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] bg-brand-primary/10 text-brand-primary font-bold px-2 py-0.5 rounded">
                  {selectedJob.dept}
                </span>
                <h3 className="text-sm font-bold text-neutral-900 mt-1.5">
                  {selectedJob.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-400 cursor-pointer flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* General parameters */}
            <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-3 rounded-lg border border-neutral-100 text-xs">
              <div>
                <strong className="block text-neutral-400 font-semibold uppercase text-[9px]">Advertisement No</strong>
                <span className="font-bold text-neutral-700">{selectedJob.advertisementNo}</span>
              </div>
              <div>
                <strong className="block text-neutral-400 font-semibold uppercase text-[9px]">Total Vacancies</strong>
                <span className="font-bold text-neutral-700">{selectedJob.totalPosts} vacancies</span>
              </div>
              <div>
                <strong className="block text-neutral-400 font-semibold uppercase text-[9px]">Apply Start</strong>
                <span className="font-bold text-neutral-700">{selectedJob.startDate}</span>
              </div>
              <div>
                <strong className="block text-neutral-400 font-semibold uppercase text-[9px]">Final Date To Apply</strong>
                <span className="font-bold text-neutral-700">{selectedJob.endDate}</span>
              </div>
            </div>

            {/* Syllabus Topics Compliance check */}
            <div className="space-y-2">
              <strong className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                Official Syllabus Highlights:
              </strong>
              
              <div className="space-y-1.5 text-xs text-neutral-700 font-semibold pl-1.5 max-h-[160px] overflow-y-auto">
                {selectedJob.syllabusTopics.map((topic, keyIndex) => (
                  <div key={keyIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1A73E8] mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action simulation buttons */}
            <div className="flex gap-3 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-2 px-4 rounded-[8px]"
              >
                Dismiss Details
              </button>
              <button
                onClick={() => {
                  alert(`Directing to OJAS recruitment registration portal simulator for Adv No ${selectedJob.advertisementNo}. Applications are currently active.`);
                  setSelectedJob(null);
                }}
                className="flex-1 bg-[#1A73E8] hover:bg-brand-primary-dark text-white text-xs font-bold py-2 px-4 rounded-[8px] shadow-xs"
              >
                Apply Online
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
