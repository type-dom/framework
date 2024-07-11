import { TypeElement } from '../core/type-element/type-element.abstract';

/**
 * 定义了一个泛型接口IEvent，用于表示事件处理函数。
 *
 * @param {K} K - 继承自Event的事件类型。默认为Event。
 * @param {T} T - 继承自TypeElement的元素类型。默认为TypeElement。
 * @returns {void} - 该函数没有返回值。
 */
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

type ITransitionEvent<T extends TypeElement = TypeElement> = (
  element: T
) => void;

/**
 * 定义了过渡阶段的事件接口。
 *
 * 这个接口包括了进入（enter）、离开（leave）和出现（appear）三个阶段的各个时刻的事件。
 * 每个阶段都有before、after和cancelled（取消）四个时刻，供用户在不同的时刻插入自定义逻辑。
 */
export interface ITransitionConfig {
  name?: string,
  // 在进入阶段之前触发的事件
  beforeEnter?: ITransitionEvent,
  // 在进入阶段完成时触发的事件
  enter?: ITransitionEvent,
  // 在进入阶段之后触发的事件
  afterEnter?: ITransitionEvent,
  // 在进入阶段被取消时触发的事件
  enterCancelled?: ITransitionEvent,
  // 在离开阶段之前触发的事件
  beforeLeave?: ITransitionEvent,
  // 在离开阶段完成时触发的事件
  leave?: ITransitionEvent,
  // 在离开阶段之后触发的事件
  afterLeave?: ITransitionEvent,
  // 在离开阶段被取消时触发的事件
  leaveCancelled?: ITransitionEvent,
  // 在出现阶段之前触发的事件
  beforeAppear?: ITransitionEvent,
  // 在出现阶段完成时触发的事件
  appear?: ITransitionEvent,
  // 在出现阶段之后触发的事件
  afterAppear?: ITransitionEvent,
  // 在出现阶段被取消时触发的事件
  appearCancelled?: ITransitionEvent,
}
