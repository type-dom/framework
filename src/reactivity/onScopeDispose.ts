/**
 * 在当前的 effect scope 上注册一个销毁回调函数
 *
 * **作用**：
 * - 当 effect scope 被停止时，会自动执行注册的清理回调
 * - 用于清理副作用，如定时器、事件监听器、订阅等
 * - 防止内存泄漏
 *
 * **使用场景**：
 * 1. 清理定时器：clearInterval, clearTimeout
 * 2. 移除事件监听器：removeEventListener
 * 3. 取消订阅：subscription.unsubscribe()
 * 4. 断开网络连接：websocket.close()
 * 5. 清理 DOM 引用
 *
 * @param fn - 要注册的清理回调函数
 * @param failSilently - 是否静默失败（没有 active scope 时不报警告）
 * @returns void
 *
 * @example
 * ```typescript
 * // 示例 1: 清理定时器
 * effectScope(() => {
 *   const timer = setInterval(() => {
 *     console.log(count.get());
 *   }, 1000);
 *
 *   onScopeDispose(() => {
 *     clearInterval(timer);
 *     console.log('定时器已清理');
 *   });
 * });
 *
 * @example
 * ```typescript
 * // 示例 2: 移除事件监听
 * effectScope(() => {
 *   const handleClick = () => console.log('clicked');
 *   document.addEventListener('click', handleClick);
 *
 *   onScopeDispose(() => {
 *     document.removeEventListener('click', handleClick);
 *   });
 * });
 *
 * @example
 * ```typescript
 * // 示例 3: 取消订阅
 * effectScope(() => {
 *   const subscription = someObservable.subscribe(value => {
 *     console.log(value);
 *   });
 *
 *   onScopeDispose(() => {
 *     subscription.unsubscribe();
 *   });
 * });
 *
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#onscopedispose}
 */
import { getActiveSub } from '@type-dom/signals';
export function onScopeDispose(fn: () => void, failSilently = false): void {
  const activeSub = getActiveSub();
  if (activeSub !== undefined) {
    // 初始化 cleanups 数组（如果不存在）
    if (!(activeSub as any).cleanups) {
      (activeSub as any).cleanups = [];
    }
    // 将清理函数添加到当前 scope 的清理列表中
    (activeSub as any).cleanups.push(fn);
  } else if (!failSilently) {
    // 如果没有活跃的 scope 且不是静默模式，发出警告
    console.warn(
      `onScopeDispose() 被调用时没有活跃的 effect scope ` +
      `与之关联。这通常意味着在 setup() 或 effectScope() 外部调用了 onScopeDispose。`
    );
  }
}
