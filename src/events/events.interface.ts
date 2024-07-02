import { TypeElement } from '../core/type-element/type-element.abstract';

type IEvent<K extends Event = Event, T extends TypeElement = TypeElement> = (
  evt?: K,
  element?: T
) => void;

/**
 * IEvents 接口定义了事件处理的行为。
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
