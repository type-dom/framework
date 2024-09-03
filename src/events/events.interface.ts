import { TypeElement } from '../core/type-element/type-element.abstract';
import { AnyFn } from '../interface';

/**
 * 定义了一个泛型接口IEvent，用于表示事件处理函数。
 *
 * @param {K} K - 继承自Event的事件类型。默认为Event。
 * @param {T} T - 继承自TypeElement的元素类型。默认为TypeElement。
 * @returns {void} - 该函数没有返回值。
 */
export type IEvent<K extends Event = Event, T extends TypeElement = TypeElement> = (
  evt?: K,
  element?: T,
  target?: Node
) => void;

/**
 * IEvents 接口定义了事件处理的行为。这里定义的时dom元素的事件处理函数。
 */
export interface IEvents {
  abort: IEvent;
  blur: IEvent;
  change: IEvent; // newValue = evt.target.value
  click: IEvent;
  // canplay: IEvent;
  // canplaythrough: IEvent;
  compositionstart: IEvent;
  compositionupdate: IEvent;
  compositionend: IEvent;
  // durationchange: IEvent;
  // emptied: IEvent;
  // ended: IEvent;
  focus: IEvent;
  dblclick: IEvent;
  // contextmenu: IEvent;
  drag: IEvent;
  dragend: IEvent;
  dragenter: IEvent;
  // dragexit: IEvent;
  dragleave: IEvent;
  dragover: IEvent;
  dragstart: IEvent;
  drop: IEvent;
  input: IEvent;
  // inputenter: (evt?: InputEvent, element?: TypeElement) => void;
  // invalid: IEvent;
  keydown: IEvent;
  keyup: IEvent;
  keypress: IEvent;
  // keypressenter: IEvent;
  load: IEvent;
  // loadeddata: IEvent;
  // loadedmetadata: IEvent;
  // loadstart: IEvent;
  mousedown: IEvent;
  mouseenter: IEvent;
  mouseleave: IEvent;
  mousemove: IEvent;
  mouseout: IEvent;
  mouseover: IEvent;
  mouseup: IEvent;
  mousewheel: IEvent;
  // mspointerdown: IEvent;
  // mspointermove: IEvent;
  // mspointerup: IEvent;
  // pointerdown: IEvent;
  // pointermove: IEvent;
  // pointerup: IEvent;
  // pointercancel: IEvent;
  // pointerover: IEvent;
  // pointerout: IEvent;
  // pointerenter: IEvent;
  // pointerleave: IEvent;
  select: IEvent;
  touchcancel: IEvent;
  touchend: IEvent;
  touchmove: IEvent;
  touchstart: IEvent;
  // touchevent: IEvent;
  // wheel: IEvent;
  scroll: IEvent;
}

export interface IEmits {
  [key: string]: AnyFn;
}
