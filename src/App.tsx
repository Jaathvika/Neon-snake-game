import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="h-screen w-full bg-[#050505] text-[#00f3ff] font-pixel flex flex-col overflow-hidden select-none border-8 border-[#ff00ff] relative">
      <div className="absolute inset-0 noise-bg mix-blend-screen"></div>

      <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-10 pt-8 pb-4 border-b-4 border-[#00f3ff] bg-black z-10">
        <div className="flex flex-col relative">
          <span className="text-[#ff00ff] text-xl font-bold tracking-[0.2em] mb-1 glitch-anim-slow uppercase">SYS.INIT // OVERRIDE_PROTOCOL_0x44</span>
          <h1 className="text-4xl md:text-5xl font-display text-[#e0e0e0] uppercase tearing drop-shadow-[4px_4px_0_#ff00ff]">
            GLITCH_<span className="text-[#00f3ff]">SNAKE.EXE</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden relative z-10">
        <aside className="hidden md:flex col-span-3 border-r-4 border-[#00f3ff] p-8 flex-col pb-0 flex-shrink-0 bg-[#000000]">
           <div className="text-xl tracking-widest text-[#ff00ff] mb-6 flex items-center justify-center gap-2 font-display bg-[#00f3ff] text-black px-2 py-1 shadow-[4px_4px_0_#ff00ff]">
             AUDIO_SUBROUTINE
           </div>
           <MusicPlayer />
        </aside>

        <section className="col-span-1 md:col-span-6 bg-[#000] relative flex items-center justify-center border-r-4 border-[#00f3ff] overflow-hidden shadow-[inset_0_0_50px_rgba(255,0,255,0.2)]">
           <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00f3ff 2px, #00f3ff 4px)', backgroundSize: '100% 4px' }}></div>
           <div className="z-10 w-full h-full flex justify-center items-center overflow-auto p-4 flex-col">
              <SnakeGame />
           </div>
        </section>

        <aside className="hidden md:flex col-span-3 p-8 flex-col justify-between bg-[#0a0a0a]">
           <div>
             <div className="text-lg md:text-xl text-center uppercase tracking-widest text-[#00f3ff] mb-6 font-display bg-[#ff00ff] text-black px-2 py-1 shadow-[4px_4px_0_#00f3ff]">DATA_STREAM</div>
             <div className="flex items-end gap-1 mb-8 h-24 opacity-80 w-full glitch-anim">
               <div className="flex-1 bg-[#00f3ff]" style={{height: '40%'}}></div>
               <div className="flex-1 bg-[#ff00ff]" style={{height: '70%'}}></div>
               <div className="flex-1 bg-[#00f3ff]" style={{height: '50%'}}></div>
               <div className="flex-1 bg-[#e0e0e0]" style={{height: '90%'}}></div>
               <div className="flex-1 bg-[#00f3ff]" style={{height: '60%'}}></div>
               <div className="flex-1 bg-[#ff00ff]" style={{height: '85%'}}></div>
               <div className="flex-1 bg-[#00f3ff]" style={{height: '30%'}}></div>
             </div>
             
             <div className="space-y-6 text-2xl">
               <div>
                 <div className="text-[#ff00ff] uppercase tracking-widest mb-1 underline decoration-[#00f3ff]">SYS_DIAGNOSTICS</div>
                 <div className="text-[#00f3ff]">CPU: ERROR | LAT: ERR_TIMEOUT</div>
               </div>
               <div>
                 <div className="text-[#ff00ff] uppercase tracking-widest mb-1 underline decoration-[#00f3ff]">SESSION_ID</div>
                 <div className="text-[#00f3ff] glitch-anim-slow uppercase">0xDEAD_BEEF</div>
               </div>
             </div>
           </div>

           <div className="p-4 bg-[#ff00ff] text-black border-4 border-[#00f3ff] shadow-[4px_4px_0_#00f3ff]">
             <div className="text-xl font-display uppercase tracking-widest mb-2 animate-pulse">WARNING // ANOMALY</div>
             <div className="text-2xl leading-tight font-bold">
               CONSUME MAGENTA NODES. AVOID CYAN BOUNDARIES.
               SYSTEM COMPROMISE IMMINENT.
             </div>
           </div>
        </aside>
      </main>
    </div>
  );
}
