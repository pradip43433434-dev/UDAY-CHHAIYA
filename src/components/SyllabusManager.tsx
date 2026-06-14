import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Circle, Award } from 'lucide-react';

interface SyllabusTopic {
  id: string;
  name: string;
  nameGuj: string;
  subject: string;
}

const INITIAL_SYLLABUS: SyllabusTopic[] = [
  { id: "s1", name: "Indus Valley Civilisation (Dholavira, Lothal)", nameGuj: "હડપ્પીય સભ્યતા (ધોળાવીરા, લોથલ)", subject: "Gujarat History & Culture" },
  { id: "s2", name: "Solanki Golden Era & Architecture of Patan", nameGuj: "સોલંકી સુવર્ણ યુગ અને સ્થાપત્યકલા", subject: "Gujarat History & Culture" },
  { id: "s3", name: "Famous Fairs & Folk Dances (Tarnetar, Garba)", nameGuj: "ગુજરાતના મેળાઓ અને લોકનૃત્યો", subject: "Gujarat History & Culture" },
  { id: "s4", name: "Samas & Alankar Identification", nameGuj: "સમાસ, અલંકાર અને છંદ ઓળખ", subject: "Gujarati Grammar & Lit" },
  { id: "s5", name: "Sandy, Jodani & Virudharthi Shabdo", nameGuj: "સંધિ જોડણી અને વિરોધી શબ્દો", subject: "Gujarati Grammar & Lit" },
  { id: "s6", name: "Fundamental Rights & State Policies (DPSP)", nameGuj: "ભૂમિકા અને મૂળભૂત અધિકારો (બંધારણ)", subject: "Indian Polity & Constitution" },
  { id: "s7", name: "Panchayati Raj System in Gujarat", nameGuj: "ગુજરાતમાં પંચાયતી રાજ વ્યવસ્થા", subject: "Indian Polity & Constitution" },
  { id: "s8", name: "Number Series, Coding-Decoding Speedwork", nameGuj: "સંખ્યા શ્રેણી, કોડિંગ-ડીકોડિંગ ઉકેલો", subject: "General Mental Ability" },
  { id: "s9", name: "Venn Diagrams & Blood Relations", nameGuj: "વેન આકૃતિઓ અને લોહીના સંબંધો", subject: "General Mental Ability" },
  { id: "s10", name: "Vitamins Diseases & Chemical Formulas", nameGuj: "વિટામિન્સના રોગો અને રાસાયણિક સૂત્રો", subject: "General Science & Tech" }
];

export default function SyllabusManager() {
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ojas_completed_syllabus');
    return saved ? JSON.parse(saved) : ["s1", "s4", "s8"];
  });

  const [activeTab, setActiveTab] = useState<string>("All Subjects");

  useEffect(() => {
    localStorage.setItem('ojas_completed_syllabus', JSON.stringify(completedIds));
  }, [completedIds]);

  const toggleTopic = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const subjects = ["All Subjects", ...Array.from(new Set(INITIAL_SYLLABUS.map(t => t.subject)))];
  
  const filteredTopics = activeTab === "All Subjects" 
    ? INITIAL_SYLLABUS 
    : INITIAL_SYLLABUS.filter(t => t.subject === activeTab);

  const totalCount = INITIAL_SYLLABUS.length;
  const completedCount = completedIds.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div id="syllabus-manager-card" className="bg-white rounded-[12px] p-6 shadow-sm border border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-primary" />
            <span>Syllabus Compliance Tracker</span>
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Track your course preparation topic-by-topic for GPSC / GSSSB exams
          </p>
        </div>

        {/* Progress gauge */}
        <div className="flex items-center gap-3 bg-brand-background px-4 py-2 rounded-lg border border-neutral-100">
          <Award className="w-8 h-8 text-brand-warning" />
          <div>
            <div className="text-xs text-neutral-500 font-medium">COMPLETED STAGE</div>
            <div className="text-lg font-bold text-neutral-800">
              {percentage}% <span className="text-xs text-neutral-400 font-normal">({completedCount}/{totalCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Outer progress bar */}
      <div className="w-full bg-neutral-100 h-2.5 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-brand-success h-full transition-all duration-500 ease-out rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin border-b border-neutral-100 mb-4">
        {subjects.map(subj => (
          <button
            key={subj}
            onClick={() => setActiveTab(subj)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
              activeTab === subj 
                ? 'bg-brand-primary text-white shadow-sm' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {subj === "All Subjects" ? "All Subjects" : subj.split(" & ")[0]}
          </button>
        ))}
      </div>

      {/* Topics list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
        {filteredTopics.map(topic => {
          const isDone = completedIds.includes(topic.id);
          return (
            <div
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all hover:bg-neutral-50 ${
                isDone 
                  ? 'border-brand-success/30 bg-brand-success/5' 
                  : 'border-neutral-100 bg-white'
              }`}
            >
              <button className="mt-0.5 flex-shrink-0 text-neutral-400 hover:text-brand-success transition-colors">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-brand-success" />
                ) : (
                  <Circle className="w-5 h-5 text-neutral-300" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isDone ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                  {topic.name}
                </p>
                <p className={`text-xs mt-0.5 truncate ${isDone ? 'text-neutral-300' : 'text-neutral-500 font-medium'}`} dir="ltr">
                  {topic.nameGuj}
                </p>
                <span className="inline-block text-[10px] bg-neutral-100 font-semibold px-2 py-0.5 rounded text-neutral-500 mt-1.5">
                  {topic.subject}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
