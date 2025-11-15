export function createStore<T>(initState: T) {
  let state: T = initState;

  const get = () => state;
  const set = (newState: T) => {
    state = newState;
    callbacks.forEach((callback) => callback());
  };
  const callbacks: Set<() => void> = new Set();
  const subscribe = (callback: () => void) => {
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  };

  return {
    get,
    set,
    subscribe,
  };
}
