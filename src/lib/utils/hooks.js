import { useState, useEffect, useLayoutEffect, useRef } from 'react';

// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
const canUseDOM =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

/**
 * A hook that resolves to useEffect on the server and useLayoutEffect on the client
 */
export const useIsomorphicLayoutEffect = canUseDOM
  ? useLayoutEffect
  : useEffect;


// Memoized stateful toggle function
export function useToggle(initialState) {
  const [value, setState] = useState(initialState);

  return {
    value,
    toggle: useCallback(() => setState((state) => !state), []),
    setTrue: useCallback(() => setState(true), []),
    setFalse: useCallback(() => setState(false), []),
  };
}

// Subscribe to a given value and invoke a callback when the value changes
export function useOnValueChange(value, onChange) {
  const tracked = useRef(value);
  useEffect(() => {
    const oldValue = tracked.current;
    if (value !== tracked.current) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [value, onChange]);
}

import { useEffect, useState } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

export function useServerProps(data) {
  return JSON.parse(JSON.stringify(data));
}