import React, { useState, useRef, useEffect } from 'react';
import { useTimeout,usePersistFn } from 'ahooks';

const useMyTimeout = (fn: () => void, delay: number | null | undefined) => {
  const fnRef = usePersistFn(fn);
  useEffect(() => {
    if (delay === null || delay === undefined) return 
    console.log('useeffect')
    const timer = setTimeout(() => {
      console.log(1111)
      fnRef();
    }, delay)
    // 当fnRef delay变化时 useEffect重新执行，首先会执行return的回调函数
    return () => {
      console.log('销毁...')
      clearTimeout(timer)
    }
  }, [fnRef, delay])
}

export default () => {
  const [state, setState] = useState(1);
  // useTimeout(() => {
  //   setState(state + 1);
  // }, 3000);
  console.log('render....')
  useMyTimeout(() => {
    setState(state + 1)
  }, 2000)
  return (
    <div>
      <p style={{ marginTop: 16 }}> {state} </p>
    </div>
  );
};
