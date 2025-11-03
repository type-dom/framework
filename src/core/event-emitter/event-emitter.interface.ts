import { AnyFn } from '@type-dom/utils';
import { TypeElement } from '../type-element/type-element.abstract';

// export interface IEventEmitter {
//   on(event: string, listener: AnyFn): void;
//   off(event: string, listener: AnyFn): void;
//   emit(event: string, ...args: any[]): void;
// }

/**
 * 定义了一个泛型接口IEvent，用于表示事件处理函数。
 *
 * @param T - 继承自Event的事件类型。默认为 Event。
 * @returns {void} - 该函数没有返回值。
 */
export type IEvent<E extends (Event | string) = Event, T extends TypeElement = TypeElement> = (evt?: E, element?: T) => void | boolean | number | Promise<any>;

/**
 * IEvents 接口定义了事件处理的行为。这里定义的时dom元素的事件处理函数。
 *
 * 对应 GlobalEventHandlersEventMap
 */
export interface IEvents {
  // clipboard events
  copy: IEvent<ClipboardEvent>
  cut: IEvent<ClipboardEvent>
  paste: IEvent<ClipboardEvent>

  // composition events
  compositionend: IEvent<CompositionEvent>
  compositionstart: IEvent<CompositionEvent>
  compositionupdate: IEvent<CompositionEvent>

  // drag drop events
  drag: IEvent<DragEvent>
  dragend: IEvent<DragEvent>
  dragenter: IEvent<DragEvent>
  dragexit: IEvent<DragEvent>
  dragleave: IEvent<DragEvent>
  dragover: IEvent<DragEvent>
  dragstart: IEvent<DragEvent>
  drop: IEvent<DragEvent>

  // focus events
  focus: IEvent<FocusEvent>
  focusin: IEvent<FocusEvent>
  focusout: IEvent<FocusEvent>
  blur: IEvent<FocusEvent>

  // form events
  change: IEvent<Event>
  beforeinput: IEvent<Event>
  input: IEvent<Event>
  reset: IEvent<Event>
  submit: IEvent<Event>
  invalid: IEvent<Event>

  // image events
  load: IEvent<Event>
  error: IEvent<Event>

  // keyboard events
  keydown: IEvent<KeyboardEvent>
  keypress: IEvent<KeyboardEvent>
  keyup: IEvent<KeyboardEvent>

  // mouse events
  auxclick: IEvent<MouseEvent>
  click: IEvent<MouseEvent>
  contextmenu: IEvent<MouseEvent>
  dblclick: IEvent<MouseEvent>
  mousedown: IEvent<MouseEvent>
  mouseenter: IEvent<MouseEvent>
  mouseleave: IEvent<MouseEvent>
  mousemove: IEvent<MouseEvent>
  mouseout: IEvent<MouseEvent>
  mouseover: IEvent<MouseEvent>
  mouseup: IEvent<MouseEvent>

  // media events
  abort: IEvent<Event>
  canplay: IEvent<Event>
  canplaythrough: IEvent<Event>
  durationchange: IEvent<Event>
  emptied: IEvent<Event>
  encrypted: IEvent<Event>
  ended: IEvent<Event>
  loadeddata: IEvent<Event>
  loadedmetadata: IEvent<Event>
  loadstart: IEvent<Event>
  pause: IEvent<Event>
  play: IEvent<Event>
  playing: IEvent<Event>
  progress: IEvent<Event>
  ratechange: IEvent<Event>
  seeked: IEvent<Event>
  seeking: IEvent<Event>
  stalled: IEvent<Event>
  suspend: IEvent<Event>
  timeupdate: IEvent<Event>
  volumechange: IEvent<Event>
  waiting: IEvent<Event>

  // selection events
  select: IEvent<Event>

  // scroll events
  scroll: IEvent<Event>
  scrollend: IEvent<Event>

  // touch events
  touchcancel: IEvent<TouchEvent>
  touchend: IEvent<TouchEvent>
  touchmove: IEvent<TouchEvent>
  touchstart: IEvent<TouchEvent>

  // pointer events
  pointerdown: IEvent<PointerEvent>
  pointermove: IEvent<PointerEvent>
  pointerup: IEvent<PointerEvent>
  pointercancel: IEvent<PointerEvent>
  pointerenter: IEvent<PointerEvent>
  pointerleave: IEvent<PointerEvent>
  pointerover: IEvent<PointerEvent>
  pointerout: IEvent<PointerEvent>

  // wheel events
  wheel: IEvent<WheelEvent>

  // animation events
  animationstart: IEvent<AnimationEvent>
  animationend: IEvent<AnimationEvent>
  animationiteration: IEvent<AnimationEvent>

  // transition events
  transitionend: IEvent<TransitionEvent>
  transitionstart: IEvent<TransitionEvent>




  cancel: IEvent;
  close: IEvent;
  // dragexit: IEvent;
  formdata: IEvent<FormDataEvent>;
  gotpointercapture: IEvent<PointerEvent>;
  // inputenter: (evt?: InputEvent, element?: TypeElement) => void;
  // keypressenter: IEvent;

  lostpointercapture: IEvent<PointerEvent>;
  mousewheel: IEvent<WheelEvent>;
  // mspointerdown: IEvent;
  // mspointermove: IEvent;
  // mspointerup: IEvent;

  resize: IEvent<UIEvent>;
  selectionchange: IEvent;
  [key: string]: IEvent<any, any>;
}

export interface Events {
  // clipboard events
  onCopy: ClipboardEvent
  onCut: ClipboardEvent
  onPaste: ClipboardEvent

  // composition events
  onCompositionend: CompositionEvent
  onCompositionstart: CompositionEvent
  onCompositionupdate: CompositionEvent

  // drag drop events
  onDrag: DragEvent
  onDragend: DragEvent
  onDragenter: DragEvent
  onDragexit: DragEvent
  onDragleave: DragEvent
  onDragover: DragEvent
  onDragstart: DragEvent
  onDrop: DragEvent

  // focus events
  onFocus: FocusEvent
  onFocusin: FocusEvent
  onFocusout: FocusEvent
  onBlur: FocusEvent

  // form events
  onChange: Event
  onBeforeinput: Event
  onInput: Event
  onReset: Event
  onSubmit: Event
  onInvalid: Event

  // image events
  onLoad: Event
  onError: Event

  // keyboard events
  onKeydown: KeyboardEvent
  onKeypress: KeyboardEvent
  onKeyup: KeyboardEvent

  // mouse events
  onAuxclick: MouseEvent
  onClick: MouseEvent
  onContextmenu: MouseEvent
  onDblclick: MouseEvent
  onMousedown: MouseEvent
  onMouseenter: MouseEvent
  onMouseleave: MouseEvent
  onMousemove: MouseEvent
  onMouseout: MouseEvent
  onMouseover: MouseEvent
  onMouseup: MouseEvent

  // media events
  onAbort: Event
  onCanplay: Event
  onCanplaythrough: Event
  onDurationchange: Event
  onEmptied: Event
  onEncrypted: Event
  onEnded: Event
  onLoadeddata: Event
  onLoadedmetadata: Event
  onLoadstart: Event
  onPause: Event
  onPlay: Event
  onPlaying: Event
  onProgress: Event
  onRatechange: Event
  onSeeked: Event
  onSeeking: Event
  onStalled: Event
  onSuspend: Event
  onTimeupdate: Event
  onVolumechange: Event
  onWaiting: Event

  // selection events
  onSelect: Event

  // scroll events
  onScroll: Event
  onScrollend: Event

  // touch events
  onTouchcancel: TouchEvent
  onTouchend: TouchEvent
  onTouchmove: TouchEvent
  onTouchstart: TouchEvent

  // pointer events
  onPointerdown: PointerEvent
  onPointermove: PointerEvent
  onPointerup: PointerEvent
  onPointercancel: PointerEvent
  onPointerenter: PointerEvent
  onPointerleave: PointerEvent
  onPointerover: PointerEvent
  onPointerout: PointerEvent

  // wheel events
  onWheel: WheelEvent

  // animation events
  onAnimationstart: AnimationEvent
  onAnimationend: AnimationEvent
  onAnimationiteration: AnimationEvent

  // transition events
  onTransitionend: TransitionEvent
  onTransitionstart: TransitionEvent
}

export type EventEmits<E extends IEvents> = {
  [K in `on${keyof IEvents}`]?: (payload: E[K]) => void;
}
// EventHandlers<Events>
export type EventHandlers<E> = {
  [K in keyof E]?: E[K] extends (...args: any[]) => any
    ? E[K]
    : (payload: E[K]) => void
}

// export type IEmits = EventHandlers<AnyFn>

export interface IEmits extends EventHandlers<AnyFn> {
  // mouseenter?: (evt: MouseEvent) => void; // todo 与events合并；
  // mouseleave?: (evt: MouseEvent) => void;
  // focus?: (evt: FocusEvent) => void;
  // blur?: (evt: FocusEvent) => void;
  // close?: (...args: any[]) => void;
  [key: string]: AnyFn | undefined;
  // [K in keyof E]: E extends Events
  //   ? E[K]
  //   : AnyFn
}

export type ObjectEmitsOptions = Record<
  string,
  ((...args: any[]) => any) | null
>

export type EmitsOptions = ObjectEmitsOptions | string[]
