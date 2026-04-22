import { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const MOVE_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) break;
    }
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const gameLoop = useCallback((time: number) => {
    if (time - lastMoveTimeRef.current > MOVE_SPEED) {
      moveSnake();
      lastMoveTimeRef.current = time;
    }
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameLoop]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-full flex justify-between items-end mb-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-neon-cyan opacity-80">
             <Trophy className="w-4 h-4" />
             <span className="font-mono text-[10px] uppercase tracking-widest leading-none">High Score</span>
          </div>
          <div className="font-mono text-3xl font-bold tracking-tighter text-white">
            {highScore.toString().padStart(4, '0')}
          </div>
        </div>
        <div className="text-right space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Current Score</span>
          <div className="font-mono text-5xl font-bold tracking-tighter text-neon-pink">
            {score.toString().padStart(4, '0')}
          </div>
        </div>
      </div>

      <div className="relative aspect-square w-full max-w-md bg-black/40 rounded-lg border-2 border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10 pointer-events-none">
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => (
             <div key={i} className="border-[0.5px] border-white/20" />
          ))}
        </div>

        {/* Snake & Food */}
        <div className="absolute inset-0">
          {snake.map((segment, i) => (
             <div 
               key={i}
               style={{ 
                 left: `${(segment.x / GRID_SIZE) * 100}%`, 
                 top: `${(segment.y / GRID_SIZE) * 100}%`,
                 width: `${100 / GRID_SIZE}%`,
                 height: `${100 / GRID_SIZE}%`
               }}
               className={`absolute p-[1px] transition-all duration-100`}
             >
                <div className={`w-full h-full rounded-[2px] ${i === 0 ? 'bg-neon-cyan shadow-[0_0_10px_#00ffff]' : 'bg-neon-cyan/60'}`} />
             </div>
          ))}
          <div 
            style={{ 
              left: `${(food.x / GRID_SIZE) * 100}%`, 
              top: `${(food.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`
            }}
            className="absolute p-[2px] animate-pulse"
          >
             <div className="w-full h-full rounded-full bg-neon-pink shadow-[0_0_10px_#ff00ff]" />
          </div>
        </div>

        {/* Overlays */}
        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in duration-300">
            {isGameOver ? (
              <>
                <div className="space-y-1">
                  <h3 className="text-4xl font-bold text-neon-pink tracking-tight">SYSTEM CRITICAL</h3>
                  <p className="text-white/60 font-mono text-sm">SNAKE COLLISION DETECTED</p>
                </div>
                <button 
                  onClick={resetGame}
                  className="group flex items-center space-x-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan px-8 py-3 rounded-full hover:bg-neon-cyan hover:text-black transition-all"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-bold tracking-tight uppercase">Restart Core</span>
                </button>
              </>
            ) : (
              <>
                <div className="space-y-1">
                   <h3 className="text-4xl font-bold text-neon-cyan tracking-tight">PAUSED</h3>
                   <p className="text-white/60 font-mono text-xs uppercase tracking-[0.3em]">Press SPACE to sync</p>
                </div>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold tracking-tight uppercase hover:bg-neon-cyan transition-colors"
                >
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {/* Snake Gamer Label */}
        <div className="absolute -right-12 bottom-12 hidden lg:flex border-2 border-neon-cyan bg-[#050505] px-6 py-4 shadow-[0_0_15px_rgba(0,255,255,0.4)] z-10 rotate-[-2deg]">
           <span className="text-neon-cyan font-bold tracking-tighter text-xl whitespace-nowrap">SNAKE GAMER</span>
        </div>
      </div>

      <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
        <span>Grid: 20x20</span>
        <span>Controls: Arrow Keys</span>
      </div>
    </div>
  );
}
