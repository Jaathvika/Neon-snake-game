import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from '../lib/useInterval';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const GAME_SPEED = 120;

const randomPosition = (): Point => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>(randomPosition());
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const createFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = randomPosition();
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, []);

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    createFood(INITIAL_SNAKE);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        handleGameOver();
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        createFood(newSnake);
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, createFood]);

  useInterval(moveSnake, isGameOver || isPaused ? null : GAME_SPEED);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      const key = e.key.toLowerCase();

      setDirection((prevDir) => {
        if ((key === 'arrowup' || key === 'w') && prevDir !== 'DOWN') return 'UP';
        if ((key === 'arrowdown' || key === 's') && prevDir !== 'UP') return 'DOWN';
        if ((key === 'arrowleft' || key === 'a') && prevDir !== 'RIGHT') return 'LEFT';
        if ((key === 'arrowright' || key === 'd') && prevDir !== 'LEFT') return 'RIGHT';
        return prevDir;
      });

      if (key === ' ' || e.key === 'Escape') {
         if (!isGameOver) {
             setIsPaused((p) => !p);
         }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver]);

  return (
    <div className="flex flex-col items-center gap-6 font-pixel">
      <div className="flex justify-between items-end w-full max-w-[400px] mb-2 border-b-4 border-[#ff00ff] pb-2">
         <div className="font-mono flex flex-col">
            <span className="text-2xl tracking-widest text-[#00f3ff] uppercase mb-1 drop-shadow-[2px_2px_0_#ff00ff]">NEURAL_LINK</span>
            <h2 className="text-3xl md:text-4xl font-display text-[#ff00ff] uppercase tearing">ERR_OVERRIDE</h2>
         </div>
         <div className="text-right flex flex-col">
            <span className="text-2xl uppercase tracking-widest text-[#00f3ff] mb-1">MEM_ALLOCATED</span>
            <span className="text-4xl leading-none text-[#e0e0e0] drop-shadow-[2px_2px_0_#ff00ff]">
              {score.toString().padStart(4, '0')}
            </span>
         </div>
      </div>

      <div className="relative p-2 bg-black shadow-[8px_8px_0_#ff00ff]">
         {/* Neon Glow Behind Grid */}
         <div className="absolute inset-0 bg-[#00f3ff]/20 blur-md rounded-none -z-10 glitch-anim"></div>

         <div
           className="bg-[#000] border-4 border-[#00f3ff] relative overflow-hidden rounded-none"
           style={{
             width: `${GRID_SIZE * 20}px`,
             height: `${GRID_SIZE * 20}px`,
             display: 'grid',
             gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
             gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
           }}
         >
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

           {/* Render Snake */}
           {snake.map((segment, index) => {
              const isHead = index === 0;
              return (
                 <div
                    key={`${segment.x}-${segment.y}-${index}`}
                    className={`z-10 rounded-none border border-black ${
                       isHead
                          ? 'bg-[#e0e0e0] shadow-[0_0_10px_#ff00ff]' // white head
                          : 'bg-[#00f3ff]'
                    }`}
                    style={{
                       gridColumnStart: segment.x + 1,
                       gridRowStart: segment.y + 1,
                       margin: '1px'
                    }}
                 />
              )
           })}

           {/* Render Food */}
           <div
             className="bg-[#ff00ff] border border-white rounded-none z-10 shadow-[0_0_15px_#ff00ff] animate-pulse"
             style={{
               gridColumnStart: food.x + 1,
               gridRowStart: food.y + 1,
               margin: '2px'
             }}
           />

            {/* Overlays */}
            {isGameOver && (
              <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#00f3ff_10px,#00f3ff_20px)]"></div>
                <h2 className="text-3xl font-display text-[#e0e0e0] drop-shadow-[4px_4px_0_#ff00ff] mb-4 text-center px-4 glitch-anim relative z-30 uppercase leading-snug">FATAL_ERROR<br/>0xDEADBEEF</h2>
                <p className="text-[#00f3ff] text-2xl mb-8 tracking-wider relative z-30 bg-black px-2 py-1 shadow-[2px_2px_0_#ff00ff]">BYTES_CONSUMED: <span className="text-[#ff00ff] font-bold">{score}</span></p>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-[#ff00ff] border-4 border-[#00f3ff] text-black font-display font-bold text-sm tracking-widest hover:bg-[#00f3ff] hover:border-[#ff00ff] transition-colors cursor-pointer z-30 relative uppercase shadow-[4px_4px_0_#00f3ff] hover:shadow-[4px_4px_0_#ff00ff]"
                >
                  REBOOT_SYS()
                </button>
              </div>
            )}

            {isPaused && !isGameOver && (
              <div className="absolute inset-0 z-20 bg-[#00f3ff]/20 flex items-center justify-center backdrop-blur-sm">
                <h2 className="text-2xl text-black bg-[#ff00ff] px-4 py-2 font-display animate-pulse uppercase border-4 border-black relative z-30">-- SUSPENDED --</h2>
              </div>
            )}
         </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          <kbd className="px-4 py-2 bg-[#ff00ff] border-b-4 border-r-4 border-black text-black font-display text-lg">W</kbd>
          <kbd className="px-4 py-2 bg-[#ff00ff] border-b-4 border-r-4 border-black text-black font-display text-lg">A</kbd>
          <kbd className="px-4 py-2 bg-[#ff00ff] border-b-4 border-r-4 border-black text-black font-display text-lg">S</kbd>
          <kbd className="px-4 py-2 bg-[#ff00ff] border-b-4 border-r-4 border-black text-black font-display text-lg">D</kbd>
        </div>
        <div className="text-2xl uppercase tracking-widest text-[#ff00ff] font-bold shadow-[2px_2px_0_#00f3ff] bg-black px-2 mt-2">
           [SPACE] TO HALT
        </div>
      </div>
    </div>
  );
}
