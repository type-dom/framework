/**
 * 批量添加事件监听器
 * @param emits 包含事件名称与监听器的映射对象
 */
import { AnyFn, convertEventName, isArray, isOn, toHandlerKey } from '@type-dom/utils';
import { patchEvent } from '../../dom/modules/events';
import { EmitsOptions } from '../componentEmits';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { NodeName } from "../enums";
import { IEvent, IEvents } from "./event-emitter.interface";

export const addEmits = (node: TypeNode, emits?: EmitsOptions) => {
  // 遍历事件映射，为每个事件名称添加监听器
  if (emits) {
    node.props.emits = emits;
    // 遍历事件映射，为每个事件名称添加监听器
    if (isArray(emits)) {
      emits.forEach((eventName) => {
        addEmit(node, eventName, null);
      });
    } else {
      // Object.entries(emits).forEach(([eventName, listener]) => {
      //   addEmit(node, eventName, listener);
      // });
      for (const eventName in emits) {
        addEmit(node, eventName, emits[eventName]);
      }
    }
  }
}

/**
 * 只考虑组件自身的事件。
 * 添加事件监听器
 * @throws 如果监听器不是函数，抛出错误
 * @returns 返回node，允许链式调用
 * @param node 绑定的节点
 * @param event  单个事件或多个事件, 以空格分割的事件名称
 * @param listener
 * @param type
 */
// export const on = (node: TypeNode, event: string | string[], listener?: AnyFn, type: 'emit' | 'event' = 'event') => {
//   // 确保监听器是一个函数
//   // if (!listener) {
//   //   return;
//   // }
//   // if (typeof listener !== 'function') {
//   //   throw new Error('Listener must be a function');
//   // }
//   if (isArray(event)) {
//     event.forEach(e => on(node, e, listener, type));
//   } else {
//     // 如果事件名称不存在于映射中，则创建新Map
//     if (type === 'event') {
//       if (!node.eventObservers[event]) {
//         node.eventObservers[event] = new Map(); // todo WeakMap  ----> 兼容性问题
//       }
//       const eventHandler = (evt?: Event) => {
//         // node.off(event, listener); // 移除订阅者, listen only once time;
//         listener?.(evt, node);
//       };
//       node.eventObservers[event].set(listener, eventHandler);
//     } else if (type === 'emit') {
//       // if (!node.emitsOptions[event]) {
//       //   node.emitsOptions[event] = new Map();
//       // }
//       // // const numListeners = node.observers[event].get(listener!) || 0;
//       // // // 将监听器添加到对应事件的Map中
//       // const numListeners = node.emitsOptions[event].get(listener) || 0;
//       // // 将监听器添加到对应事件的Map中
//       // node.emitsOptions[event].set(listener, numListeners + 1);
//     } else {
//       throw new Error('type must be "emit" or "event"');
//     }
//   }
// }

// 只考虑组件自身的事件。
/**
 *
 * @param node
 * @param event on Capitalize
 * @param listener
 */
export function addEvent(node: TypeNode, event: string, listener: AnyFn) {
  if (!node.eventListeners) node.eventListeners = {};
  if (isOn(event)) {
    node.eventListeners[convertEventName(event)] = listener;
  } else {
    node.eventListeners[event] = listener;
  }
  if (!isOn(event)) {
    // console.warn('event is ', event);
    event = toHandlerKey(event);
  }
  if (!node.eventObservers[event]) {
    node.eventObservers[event] = new Map(); // todo WeakMap  ----> 兼容性问题
  }
  const eventHandler = (evt?: Event) => {
    // node.off(event, listener); // 移除订阅者, listen only once time;
    listener?.(evt, node);
  };
  node.eventObservers[event].set(listener, eventHandler);
}

export function addEmit(node: TypeNode, event: string, listener: AnyFn | null) {
  if (!node.emitsOptions) {
    node.emitsOptions = {};
  }
  node.emitsOptions[event] = listener;
  // if (!node.emitsOptions[event]) {
  //   node.emitsOptions[event] = null;
  // }
  // if (listener === undefined) {
  //   return;
  // }
  // const numListeners = node.observers[event].get(listener!) || 0;
  // // 将监听器添加到对应事件的Map中
  // const numListeners = node.emitsOptions[event].get(listener) || 0;
  // // 将监听器添加到对应事件的Map中
  // node.emitsOptions[event].set(listener, numListeners + 1);
}
/**
 * 添加一次性事件监听器，事件触发后自动移除监听器
 * @param node
 * @param eventName 事件名称
 * @param listener 事件监听器，一个函数
 * @returns 返回node，允许链式调用
 */
// export function once(node: TypeNode, eventName: string, listener: AnyFn) {
//   // 创建一个包装后的监听器，触发后会自动移除自身
//   const wrappedListener = (...args: any[]) => {
//     off(node, eventName, wrappedListener);
//     listener(...args);
//   };
//   // 将包装后的监听器添加到事件中
//   on(node, eventName, wrappedListener);
//   return node;
// }

/**
 * Remove event listener
 * removes all callback when callback not specified
 * 移除事件监听器
 * @param node
 * @param event
 * @param listener 要移除的事件监听器
 * @param _type
 * @returns 返回node，允许链式调用
 */
export function off(node: TypeNode, event?: string | string[], listener?: AnyFn, _type: 'emit' | 'event' = 'event') {
  if (!event) {
    clearEvents(node);
    return;
  }

  // array of events
  if (isArray(event)) {
    event.forEach(e => off(node, e, listener, _type));
    return;
  }
  if (!node.eventObservers[event]) {
    return;
  }
  if (!listener) {
    if (node.dom) {
      // 不是 fragment组件
      for (const observer of node.eventObservers[event]) {
        // console.log(`observer : ${observer.name}`);
        if (node.dom)
          node.dom.removeEventListener(
            event as keyof GlobalEventHandlersEventMap,
            observer[1]
          );
      }
    }
    delete node.eventObservers[event];
    return;
  }
  // 移除订阅者
  if (node.dom) {
    // 不是 fragment组件
    const eventHandler = node.eventObservers[event].get(listener);
    if (!eventHandler) return;
    node.dom.removeEventListener(
      event as keyof GlobalEventHandlersEventMap,
      eventHandler
    );
  }
  node.eventObservers[event].delete(listener);
}

/**
 * 检查是否存在指定事件的监听器
 * @param node
 * @param eventName 事件名称
 * @returns 如果存在监听器，返回true；否则返回false
 */
export function hasListeners(node: TypeNode, eventName: string) {
  // 检查事件名称是否存在监听器数组，并且数组长度大于0
  return Boolean(
    node.eventObservers[eventName] &&
    node.eventObservers[eventName].size > 0
  );
}

/**
 * 添加事件集合
 * Fragment 不可使用；
 */
export function addEvents(node: TypeNode, events?: Partial<IEvents>) {
  if (node.dom.nodeName === NodeName.FRAGMENT || !events) {
    console.error('node is fragment or events is undefined . ');
    return;
  }
  for (const key in events) {
    const eventFun = events[key as keyof IEvents];
    if (eventFun) {
      addEvent(node, key, eventFun);
    }
  }
}

/**
 * 设置一些事件监听器，添加到dom上
 * Fragment 不可以使用。
 * @param node
 * @param events
 */
export function setEvents(node: TypeNode, events: Partial<IEvents>) {
  if (node.dom.nodeName === NodeName.FRAGMENT) {
    console.error('fragment cannot add events . ');
    return;
  }
  for (const key in events) {
    const eventFun = events[key as keyof IEvents];
    if (eventFun) {
      setEvent(node, key, eventFun as IEvent);
    }
  }
}

// 添加一个事件监听器，并添加到dom上
// todo
// 绑定触摸开始事件，并设置 passive 选项, 优化， 如何传第三个参数监听；
//   element.addEventListener('touchstart', handleTouchStart, { passive: true });
export function setEvent<T extends Event>(node: TypeNode, key: string, handleEvent: IEvent<T>) {
  addEvent(node, key, handleEvent)
  if (node.dom)
    node.dom.addEventListener(
      key as keyof GlobalEventHandlersEventMap,
      node.eventObservers[key].get(handleEvent)!
    );
}

// 清除移除所有事件监听器
export function clearEvents(node: TypeNode): void {
  // for (const key in node.eventObservers) {
  //   node.off(key);
  // }
  for (const key in node.emitsOptions) {
    // 移除该事件的所有监听器； 移除了 emit方法就没有触发的回调了。
    off(node, key);
  }
}

/**
 * 初始化事件钩子
 * setConfig 时，dom可能还没有创建；
 * 这里是不区分是 addEmits or addEvents方式添加的监听器的；那么为什么还要区分 addEmits or addEvents？
 * todo 如果是自定义事件是怎么监听的？还是不促发？
 * todo 与 setEvents是否重复
 */
export function listenEvents(node: TypeNode): void {
  // node.clearEvents(); // todo 为啥要移除
  if (!node.dom) {
    return;
  }
  if (node.eventObservers) {
    // dom 监听事件要挂载到真实dom上。
    // if (node.dom instanceof HTMLButtonElement) {
    //   console.warn('node.eventObservers is ', node.eventObservers);
    // }
    for (const key in node.eventObservers) {
      const cloned = node.eventObservers[key as `on${string}`];
      cloned.forEach((observer) => {
        if (node.dom) {
          patchEvent(node.dom as Element, key as `on${string}`, null, observer, node);
          // node.dom.removeEventListener(key, observer); // 防止重复监听
          // node.dom.addEventListener(
          //   key as keyof GlobalEventHandlersEventMap,
          //   observer
          // );
          // // todo error import .
          // // removeEventListener(node.dom as Element, key, observer);
          // // addEventListener(node.dom as Element, key, observer);
        }
      });
    }
  }
}
