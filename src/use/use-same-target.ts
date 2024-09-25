import { NOOP } from '../constants';

export interface IUseSameTargetReturn {
  onClick: (e?: MouseEvent) => void,
  onMousedown: (e?: MouseEvent) => void,
  onMouseup: (e?: MouseEvent) => void
}

/**
 * 使用相同目标的鼠标事件处理函数
 *
 * 该钩子函数提供了一种方法，用于确定 mousedown 和 mouseup 事件是否发生在同一个目标上
 * 这在处理诸如点击事件时，需要确保 mousedown 和 mouseup 事件是在同一个元素上发生的，这样可以避免触发不必要的事件处理
 *
 * @param handleClick 可选参数，一个鼠标点击事件的处理函数如果没有提供，钩子将返回一组空操作函数
 * @returns 返回一个对象，包含三个事件处理函数 onClick, onMousedown, onMouseup
 */
export function useSameTarget(handleClick?: (e?: MouseEvent) => void): IUseSameTargetReturn {
  // 如果没有提供 handleClick 函数，返回一组空操作函数
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }

  // 用于标记 mousedown 和 mouseup 事件是否发生在同一个目标上
  let mousedownTarget = false;
  let mouseupTarget = false;

  /**
   * 处理点击事件的函数
   * 当 mousedown 和 mouseup 都发生在同一个目标上时，调用提供的 handleClick 函数
   * 并重置 mousedownTarget 和 mouseupTarget 标记
   * @param e MouseEvent 对象
   */
  const onClick = (e?: MouseEvent) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };

  /**
   * 处理 mousedown 事件的函数
   * 标记当前 mousedown 事件的目标是否与当前目标相同
   * @param e MouseEvent 对象
   */
  const onMousedown = (e?: MouseEvent) => {
    mousedownTarget = e?.target === e?.currentTarget;
  };

  /**
   * 处理 mouseup 事件的函数
   * 标记当前 mouseup 事件的目标是否与当前目标相同
   * @param e MouseEvent 对象
   */
  const onMouseup = (e?: MouseEvent) => {
    mouseupTarget = e?.target === e?.currentTarget;
  };

  // 返回一组用于处理 mousedown, mouseup 和 click 事件的函数
  return { onClick, onMousedown, onMouseup };
}
