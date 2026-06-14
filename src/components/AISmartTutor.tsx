import React, { useState } from 'react';
import { Bot, HelpCircle, Send, Sparkles, RefreshCw, AlertCircle, BookOpen, User, BookCheck } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

const PRESET_TOPICS = [
  { label: "Dholavira archaeological findings", prompt: "Explain the archeological findings and drainage systems at Dholavira in Gujarat." },
  { label: "GPSC state polity strategy", prompt: "Give me a detailed preparation checklist for GPSC Polity & Constitution subjects." },
  { label: "Gujarati Samas shortcuts", prompt: "List 5 shortcut rules for identifying different Samas types in Gujarati grammar." },
  { label: "Math key scoring chapters", prompt: "What are the most scoring arithmetic topics for GSSSB CCE Clerk tests?" }
];

export default function AISmartTutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      sender: 'assistant', 
      text: "Namaste! I am your OJAS AI Strategic Study Assistant. I am specifically trained to help you clear GPSC, GSSSB CCE, Police Force, and Talati exams. Ask me anything about Gujarat's history, grammar, exam dates, or preparation strategies!" 
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');

  const triggerChat = async (promptText: string) => {
    if (!promptText.trim() || loading) return;

    const newMsgs = [...messages, { sender: 'user', text: promptText } as ChatMessage];
    setMessages(newMsgs);
    setInputVal('');
    setLoading(true);

    // Dynamic ticking message list
    const steps = [
      "Consulting OJAS syllabus databases...",
      "Analyzing historic GSSSB/GPSC question templates...",
      "Polishing structure and Gujarati alignments...",
      "Generating strategic study roadmap..."
    ];
    let stepCycle = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepCycle = (stepCycle + 1) % steps.length;
      setLoadingStep(steps[stepCycle]);
    }, 1200);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error("Unable to fetch strategy guide.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'assistant', text: data.reply }]);
    } catch (err) {
      clearInterval(stepInterval);
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'assistant', 
          text: "⚠️ Host environment key was not found or server is restarting. We simulated this study answer for you:\n\n**Gujarat Solanki Dynasty Summary**:\n- **Founder**: Mulraj I instituted this era in Patan in 942 AD.\n- **Golden Age**: Reached peak power under **Siddharaj Jaisinh** and **Kumarapala**.\n- **Signature Relics**: Rani Ki Vav (Stepwell) in Patan & Modhera Sun Temple.\n\n*Tip: Configure your Gemini key in the Settings > Secrets configuration panel to start a direct interactive chat conversation!*" 
        }
      ]);
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      triggerChat(inputVal);
    }
  };

  return (
    <div id="ai-smart-tutor-container" className="bg-white rounded-[12px] p-6 shadow-sm border border-neutral-200 flex flex-col gap-5 min-h-[480px]">
      
      {/* Bot introduction flag */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center border border-brand-primary/10">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
              <span>OJAS AI Strategic Tutor</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-warning fill-amber-300" />
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Powered by Gemini-3.5-Flash • Ask queries in Gujarati / English
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-brand-success/15 text-brand-success font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Live Assistant
        </span>
      </div>

      {/* Preset fast prompt pills */}
      <div className="space-y-1.5">
        <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
          Suggested Strategic Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_TOPICS.map((topic, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => triggerChat(topic.prompt)}
              className="text-[11px] border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 font-bold px-2.5 py-1.5 rounded-full transition-colors cursor-pointer disabled:opacity-50"
            >
              🚀 {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat log output */}
      <div className="flex-1 bg-neutral-50/80 rounded-[12px] border border-neutral-200 p-4 max-h-[350px] overflow-y-auto space-y-4">
        {messages.map((msg, index) => {
          const isAI = msg.sender === 'assistant';
          return (
            <div key={index} className={`flex gap-3 items-start ${isAI ? 'justify-start' : 'justify-end'}`}>
              
              {isAI && (
                <div className="w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                  AI
                </div>
              )}

              <div className={`p-4 rounded-xl text-xs leading-relaxed max-w-xl ${
                isAI 
                  ? 'bg-white text-neutral-800 border border-neutral-200 shadow-xs' 
                  : 'bg-brand-primary text-white font-medium'
              }`}>
                {/* Parse key headings in AI messages easily */}
                <div className="whitespace-pre-line prose max-w-none">
                  {msg.text}
                </div>
              </div>

              {!isAI && (
                <div className="w-7 h-7 bg-neutral-200 text-neutral-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  U
                </div>
              )}

            </div>
          );
        })}

        {/* Loading screen ticking advice */}
        {loading && (
          <div className="flex gap-3 items-center text-neutral-500 text-xs font-bold py-2 bg-white px-4 border border-brand-primary/10 rounded-lg animate-pulse max-w-sm">
            <RefreshCw className="w-4 h-4 animate-spin text-brand-primary" />
            <span>{loadingStep}</span>
          </div>
        )}
      </div>

      {/* Input panel block */}
      <div className="flex gap-2.5 border-t border-neutral-100 pt-3">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
          placeholder="Ask about Dholavira, history, grammar, reasoning rules, or study strategy tips..."
          className="flex-1 bg-white border border-neutral-200 rounded-[8px] px-4 py-2 text-xs focus:ring-1 focus:ring-brand-primary focus:border-brand-primary focus:outline-hidden disabled:bg-neutral-100"
        />
        <button
          onClick={() => triggerChat(inputVal)}
          disabled={loading || !inputVal.trim()}
          className="bg-brand-primary hover:bg-brand-primary-dark text-white p-2.5 rounded-[8px] transition-colors flex items-center justify-center flex-shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
