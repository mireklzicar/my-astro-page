import { createSignal, createEffect, onMount } from 'solid-js';

interface CounterProps {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
  label?: string;
  client?: boolean;
}

export default function Counter(props: CounterProps) {
  const {
    initialValue = 0,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    label = 'Counter',
    client = true
  } = props;

  const [count, setCount] = createSignal(initialValue);
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    setMounted(true);
  });

  const increment = () => {
    setCount(prev => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(initialValue);
  };

  createEffect(() => {
    if (mounted()) {
      console.log(`Counter value: ${count()}`);
    }
  });

  return (
    <div class="counter-container p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 my-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-medium">{label}</h3>
        <span class="counter-value px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
          {count()}
        </span>
      </div>
      <div class="flex space-x-2">
        <button
          type="button"
          onClick={decrement}
          disabled={count() <= min}
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrement"
        >
          -
        </button>
        <button
          type="button"
          onClick={increment}
          disabled={count() >= max}
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increment"
        >
          +
        </button>
        <button
          type="button"
          onClick={reset}
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 ml-auto"
          aria-label="Reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
