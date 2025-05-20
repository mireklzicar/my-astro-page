import { createSignal, onMount, onCleanup } from 'solid-js';
import type { Component } from 'solid-js';

interface ConfettiProps {
  buttonText?: string;
  buttonClass?: string;
}

const Confetti: Component<ConfettiProps> = (props) => {
  const {
    buttonText = 'Celebrate!',
    buttonClass = 'px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105'
  } = props;

  const [confettiLoaded, setConfettiLoaded] = createSignal(false);
  const [confettiModule, setConfettiModule] = createSignal<any>(null);
  const [isBrowser, setIsBrowser] = createSignal(false);

  onMount(() => {
    // Check if we're in the browser
    setIsBrowser(typeof window !== 'undefined');
    
    if (typeof window !== 'undefined') {
      // Only load confetti in the browser
      import('canvas-confetti')
        .then(module => {
          setConfettiModule(module.default);
          setConfettiLoaded(true);
        })
        .catch(error => {
          console.error('Failed to load confetti:', error);
        });
    }
  });

  const fireConfetti = () => {
    if (!isBrowser() || !confettiLoaded() || !confettiModule()) return;
    
    const confetti = confettiModule();
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    // Create a canvas for the confetti if it doesn't exist
    const canvasId = 'confetti-canvas';
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = canvasId;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    // Firework effect
    const firework = () => {
      const timeLeft = end - Date.now();
      
      if (timeLeft <= 0) {
        // Remove the canvas when animation is complete
        setTimeout(() => {
          if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        }, 2000);
        return;
      }
      
      // Random colors
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      
      // Launch multiple confetti bursts
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
      });
      
      // Schedule next burst
      requestAnimationFrame(firework);
    };

    // Start the firework animation
    firework();
  };

  onCleanup(() => {
    // Clean up any canvas elements when component unmounts
    if (isBrowser()) {
      const canvas = document.getElementById('confetti-canvas');
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  });

  return (
    <button
      type="button"
      onClick={fireConfetti}
      class={buttonClass}
      disabled={!confettiLoaded()}
    >
      {buttonText}
    </button>
  );
};

export default Confetti;