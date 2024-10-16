import { AnyFn } from '../../interface';
import { TypeElement } from '../type-element/type-element.abstract';

/**
 * 定义了一个泛型接口IEvent，用于表示事件处理函数。
 *
 * @param T - 继承自Event的事件类型。默认为 Event。
 * @returns {void} - 该函数没有返回值。
 */
export type IEvent<T extends Event = Event, K extends TypeElement = TypeElement> = (evt?: T, element?: K) => void;

/**
 * IEvents 接口定义了事件处理的行为。这里定义的时dom元素的事件处理函数。
 *
 * 对应 GlobalEventHandlersEventMap
 */
export interface IEvents<K extends TypeElement = TypeElement> {
  abort: IEvent<UIEvent>;
  blur: IEvent<FocusEvent>;
  cancel: IEvent;
  canplay: IEvent;
  canplaythrough: IEvent;
  change: IEvent; // newValue = evt.target.value
  click: IEvent<MouseEvent, K>;
  close: IEvent;
  compositionstart: IEvent<CompositionEvent, K>;
  compositionupdate: IEvent<CompositionEvent, K>;
  compositionend: IEvent<CompositionEvent, K>;
  contextmenu: IEvent<MouseEvent>;
  copy: IEvent<ClipboardEvent>;
  cut: IEvent<ClipboardEvent>;
  dblclick: IEvent<MouseEvent>;
  drag: IEvent<DragEvent>;
  dragend: IEvent<DragEvent>;
  dragenter: IEvent<DragEvent>;
  // dragexit: IEvent;
  dragleave: IEvent<DragEvent>;
  dragover: IEvent<DragEvent>;
  dragstart: IEvent<DragEvent>;
  drop: IEvent<DragEvent>;
  durationchange: IEvent;
  emptied: IEvent;
  ended: IEvent;
  error: IEvent<ErrorEvent>;
  focus: IEvent<FocusEvent>;
  focusin: IEvent<FocusEvent>;
  focusout: IEvent<FocusEvent>;
  formdata: IEvent<FormDataEvent>;
  gotpointercapture: IEvent<PointerEvent>;
  input: IEvent<InputEvent>;
  // inputenter: (evt?: InputEvent, element?: TypeElement) => void;
  invalid: IEvent;
  keydown: IEvent<KeyboardEvent, K>;
  keyup: IEvent<KeyboardEvent, K>;
  keypress: IEvent<KeyboardEvent, K>;
  // keypressenter: IEvent;
  load: IEvent;
  loadeddata: IEvent;
  loadedmetadata: IEvent;
  loadstart: IEvent;
  lostpointercapture: IEvent<PointerEvent>;
  mousedown: IEvent<MouseEvent>;
  mouseenter: IEvent<MouseEvent>;
  mouseleave: IEvent<MouseEvent>;
  mousemove: IEvent<MouseEvent>;
  mouseout: IEvent;
  mouseover: IEvent<MouseEvent>;
  mouseup: IEvent<MouseEvent>;
  mousewheel: IEvent<WheelEvent>;
  // mspointerdown: IEvent;
  // mspointermove: IEvent;
  // mspointerup: IEvent;
  paste: IEvent<ClipboardEvent>;
  pause: IEvent;
  play: IEvent;
  playing: IEvent;
  pointercancel: IEvent<PointerEvent>;
  pointerdown: IEvent<PointerEvent>;
  pointerenter: IEvent<PointerEvent>;
  pointerleave: IEvent<PointerEvent>;
  pointermove: IEvent<PointerEvent>;
  pointerout: IEvent<PointerEvent>;
  pointerover: IEvent<PointerEvent>;
  pointerup: IEvent<PointerEvent>;
  progress: IEvent<ProgressEvent>;
  resize: IEvent<UIEvent>;
  scroll: IEvent;
  select: IEvent<UIEvent>;
  selectionchange: IEvent;
  submit: IEvent<SubmitEvent>;
  touchcancel: IEvent<TouchEvent>;
  touchend: IEvent<TouchEvent>;
  touchmove: IEvent<TouchEvent>;
  touchstart: IEvent<TouchEvent>;
  // touchevent: IEvent;
  wheel: IEvent<WheelEvent>;
}

export interface IEmits {
  [key: string]: AnyFn;
}
