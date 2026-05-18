import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const TRACKS = [
  { id: 1, title: 'NULL_POINTER_EXCEPTION.wav', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '3:42' },
  { id: 2, title: 'SEGFAULT_LULLABY.mp3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '4:15' },
  { id: 3, title: 'CORE_DUMP_BEATS.ogg', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '2:58' },
];

export default function MusicPlayer() {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = TRACKS[currentTrackIdx];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIdx]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-full rounded-none font-pixel text-2xl pt-4">
      <audio
        ref={audioRef}
        src={track.url}
        onEnded={handleNext}
      />

      <div className="flex flex-col gap-6 flex-1">
        {TRACKS.map((t, i) => (
          <div key={t.id} className={`flex items-center gap-4 group cursor-pointer transition-none p-2 border-2 ${currentTrackIdx === i ? 'bg-[#ff00ff] text-black border-black shadow-[4px_4px_0_#00f3ff]' : 'border-transparent text-[#e0e0e0] hover:bg-[#00f3ff] hover:text-black hover:border-black'}`} onClick={() => { setCurrentTrackIdx(i); setIsPlaying(true); }}>
             <span className="text-3xl">{(i + 1).toString().padStart(2, '0')}</span>
             <div className="flex flex-col w-full">
               <span className="font-bold truncate">{t.title}</span>
               <span className={`text-xl uppercase ${currentTrackIdx === i ? 'text-black' : 'text-[#00f3ff] group-hover:text-black'}`}>SIZE: {t.duration}MB</span>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t-4 border-[#00f3ff] pt-6 flex flex-col gap-4 bg-[#050505] p-4 shadow-[inset_0_0_20px_#ff00ff]">
          <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#00f3ff] border-4 border-[#ff00ff] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                  <div className="w-8 h-8 border-4 border-black rounded-none absolute mix-blend-difference opacity-80 animate-[spin_3s_linear_infinite]"></div>
                  {isPlaying ? (
                      <div className="flex gap-[4px] items-end h-8 mx-auto opacity-100 z-10 w-10">
                          <span className="w-2 bg-black rounded-none animate-[ping_1s_infinite] h-[40%]"></span>
                          <span className="w-2 bg-black rounded-none animate-[ping_1.2s_infinite] h-[80%]"></span>
                          <span className="w-2 bg-black rounded-none animate-[ping_0.8s_infinite] h-[60%]"></span>
                      </div>
                  ) : <div className="text-black z-10 text-3xl font-display">X_X</div>}
              </div>
              <div className="overflow-hidden w-full">
                  <div className="text-2xl font-bold truncate text-[#e0e0e0]">{track.title}</div>
                  <div className="text-xl uppercase text-[#ff00ff] glitch-anim-slow">{isPlaying ? 'STREAMING...' : 'BUFFER_EMPTY'}</div>
              </div>
          </div>

          <div className="flex items-center gap-4 justify-between mt-2">
            <button
              onClick={handlePrev}
              className="text-[#00f3ff] hover:text-[#e0e0e0] hover:bg-[#ff00ff] transition-none cursor-pointer bg-[#111] p-2 border-4 border-[#00f3ff] hover:border-black shadow-[4px_4px_0_#ff00ff]"
              title="Previous Track"
            >
              <SkipBack size={24} fill="currentColor" />
            </button>
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 flex items-center justify-center rounded-none bg-[#ff00ff] text-black hover:bg-[#00f3ff] border-4 border-[#00f3ff] hover:border-[#ff00ff] cursor-pointer shadow-[4px_4px_0_#00f3ff] hover:shadow-[4px_4px_0_#ff00ff]"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
            </button>
            <button
              onClick={handleNext}
              className="text-[#00f3ff] hover:text-[#e0e0e0] hover:bg-[#ff00ff] transition-none cursor-pointer bg-[#111] p-2 border-4 border-[#00f3ff] hover:border-black shadow-[4px_4px_0_#ff00ff]"
              title="Next Track"
            >
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>
      </div>
    </div>
  );
}
