import React, { useState } from 'react';
import { Course, VideoLesson } from '../types';
import { 
  Play, BookOpen, Star, FileText, CheckCircle2, User, Clock, 
  ArrowLeft, Download, RefreshCw, Volume2, ShieldAlert
} from 'lucide-react';

interface VideoPlayerProps {
  course: Course;
  onClose: () => void;
}

export default function VideoPlayer({ course, onClose }: VideoPlayerProps) {
  const [activeLesson, setActiveLesson] = useState<VideoLesson>(course.lessons[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const [isLockedAlert, setIsLockedAlert] = useState<boolean>(false);

  const startLessonPlay = (lesson: VideoLesson) => {
    if (!lesson.isFree && !course.isFree) {
      setIsLockedAlert(true);
      return;
    }
    setActiveLesson(lesson);
    setIsPlaying(true);
  };

  const handleDownloadNotes = (lessonId: string) => {
    if (downloadProgress[lessonId] !== undefined) return;
    
    // Simulate active downloading progress ticks
    setDownloadProgress(prev => ({ ...prev, [lessonId]: 0 }));
    
    let currentPerc = 0;
    const interval = setInterval(() => {
      currentPerc += 20;
      setDownloadProgress(prev => ({ ...prev, [lessonId]: currentPerc }));
      
      if (currentPerc >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  return (
    <div id="video-lessons-workspace" className="space-y-6 font-sans">
      
      {/* Back button header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-600 bg-white border border-neutral-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-[10px] bg-brand-primary/10 text-brand-primary font-bold px-2 py-0.5 rounded-full uppercase">
            {course.subject}
          </span>
          <h2 className="text-xl font-bold text-neutral-900 mt-0.5">
            {course.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT / MAIN PANEL: Active video player screen */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Custom Video media container screen */}
          <div className="relative aspect-video w-full bg-neutral-950 rounded-[12px] overflow-hidden shadow-md flex flex-col justify-between p-4 group">
            
            {/* Overlay if not actively playing */}
            {!isPlaying ? (
              <div className="absolute inset-0 bg-neutral-900/80 flex flex-col items-center justify-center p-6 text-center">
                <span className="inline-block text-[10px] bg-brand-success text-white font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  {activeLesson.isFree ? 'Free Preview Available' : 'Premium Lesson'}
                </span>
                
                <button
                  onClick={() => startLessonPlay(activeLesson)}
                  className="w-16 h-16 bg-[#1A73E8] text-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-brand-primary/30"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
                
                <h4 className="text-white font-bold text-base mt-4 line-clamp-1 max-w-md">
                  {activeLesson.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Instructor: {course.instructor} • Duration: {activeLesson.duration}
                </p>
              </div>
            ) : (
              /* ACTIVE HTML VIDEO FOR MOCK SIMULATION */
              <div className="absolute inset-0 flex flex-col justify-end bg-black">
                <video 
                  className="w-full h-full object-cover"
                  src={activeLesson.videoUrlSimulated}
                  autoPlay
                  controls
                  loop
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated Custom controller header bar */}
                <div className="absolute top-4 left-4 right-4 bg-neutral-900/75 text-white px-3 py-1.5 rounded-md text-xs flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Stream Quality: 720p HD</span>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Live Connection Active</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Active Lesson details */}
          <div className="bg-white p-5 rounded-[12px] border border-neutral-200 shadow-sm">
            <h3 className="text-base font-bold text-neutral-900">
              {activeLesson.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-3 border-b border-neutral-100 pb-3">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-neutral-400" />
                <strong>{course.instructor}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>{activeLesson.duration} duration</span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <strong>{course.rating} class rating</strong>
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-neutral-700 uppercase mb-1">Lesson Syllabus Focus</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
                This comprehensive session directly covers competitive exam concepts, solving previous year questions, shortcut math tricks, and vocabulary builders. We highly recommend downloading the PDF checklist guides located below.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Lessons Playlist Index */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-[12px] border border-neutral-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Lessons & Study Materials
              </h4>
              <span className="text-[10px] bg-neutral-100 font-semibold text-neutral-600 px-2 py-0.5 rounded">
                {course.lessons.length} Chapters
              </span>
            </div>

            {/* Playlist rows */}
            <div className="space-y-2.5">
              {course.lessons.map((lesson, index) => {
                const isActive = activeLesson.id === lesson.id;
                const progress = downloadProgress[lesson.id];

                return (
                  <div 
                    key={lesson.id} 
                    className={`p-3 rounded-lg border transition-all ${
                      isActive 
                        ? 'border-brand-primary/40 bg-brand-primary/5 shadow-xs' 
                        : 'border-neutral-100 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    {/* Chapter title header link */}
                    <div className="flex items-start justify-between gap-2">
                      <div 
                        onClick={() => startLessonPlay(lesson)}
                        className="flex-1 cursor-pointer"
                      >
                        <span className="block text-[11px] text-neutral-400 font-bold uppercase">
                          Chapter 0{index + 1}
                        </span>
                        <h5 className={`text-xs font-semibold mt-0.5 leading-snug line-clamp-2 ${isActive ? 'text-brand-primary' : 'text-neutral-800'}`}>
                          {lesson.title}
                        </h5>
                        <span className="inline-block text-[10px] text-neutral-500 font-medium mt-1">
                          {lesson.duration} • {lesson.isFree || course.isFree ? 'Free Preview' : '🔒 Premium'}
                        </span>
                      </div>

                      {/* Small inline play icon */}
                      <button 
                        onClick={() => startLessonPlay(lesson)}
                        className={`w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive 
                            ? 'bg-brand-primary text-white' 
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Download notes button trigger */}
                    <div className="border-t border-neutral-100 mt-2.5 pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500 font-medium flex items-center gap-1 select-none">
                        <FileText className="w-3 h-3 text-neutral-400" />
                        <span>Chapter Notes (PDF)</span>
                      </span>

                      {progress === undefined ? (
                        <button
                          onClick={() => handleDownloadNotes(lesson.id)}
                          className="text-[10px] text-brand-primary hover:text-brand-primary-dark font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Get PDF</span>
                        </button>
                      ) : progress < 100 ? (
                        <div className="flex items-center gap-1 text-[10px] text-brand-warning font-bold animate-pulse">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>{progress}% Downloading</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-brand-success font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Saved</span>
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked Content Popup Modal alert instructions */}
          {isLockedAlert && (
            <div className="bg-amber-100 border border-amber-300 rounded-[12px] p-4 flex gap-3 text-xs text-amber-900">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-700 mt-0.5" />
              <div>
                <h5 className="font-bold">Premium Course Restricted</h5>
                <p className="mt-1 leading-normal text-[11px] text-amber-800">
                  This chapter is locked. Upgrade to the OJAS Premium Package inside the Home panel to instantly unlock unlimited practice tests + full video masterclasses.
                </p>
                <button 
                  onClick={() => setIsLockedAlert(false)}
                  className="mt-2 text-[10px] bg-amber-700 text-white font-bold px-2 py-1 rounded hover:bg-amber-800 transition-colors"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
