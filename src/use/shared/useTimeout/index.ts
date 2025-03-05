import { tryOnScopeDispose } from '../tryOnScopeDispose';

export function useTimeout() {
  let timeoutHandle: number;

  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout();
    timeoutHandle = window.setTimeout(fn, delay);
  };
  const cancelTimeout = () => window.clearTimeout(timeoutHandle);
  // 使用 tryOnScopeDispose 注册 cancelTimeout，确保在组件或作用域销毁时清除定时器。
  tryOnScopeDispose(() => cancelTimeout())

  return {
    registerTimeout,
    cancelTimeout
  };
}
