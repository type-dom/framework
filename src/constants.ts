// 顺序会影响加载
// todo 如果SingleInputControl不在最前面的话，会报错。Uncaught ReferenceError: Cannot access 'WebBasicControl' before initialization
//    原因应该是在tableDataCell中创建了。
import { SingleInputControl } from './core/controls/basic/single-input/single-input.class';
import { MultilineInputControl } from './core/controls/basic/multiline-input/multiline-input.class';
import { AttachmentControl } from './core/controls/basic/attachment/attachment.class';
import { DateControl } from './core/controls/basic/date/date.class';
import { NumericalControl } from './core/controls/basic/numerical/numerical.class';
import { SelectControl } from './core/controls/basic/select/select.class';
import { TimeControl } from './core/controls/basic/time/time.class';
import { TextControl } from './core/controls/basic/text/text.class';
import { RadioControl } from './core/controls/basic/radio/radio.class';
import { CheckboxControl } from './core/controls/basic/checkbox/checkbox.class';
import { TableControl } from './core/controls/complex/table/table.class';
import { ConnectionControl } from './core/controls/complex/connection/connection.class';
import { InputItem } from './components/form/form-item/input-item/input-item.class';
import { RadioItem } from './components/form/form-item/radio-item/radio-item.class';
import { TextareaItem } from './components/form/form-item/textarea-item/textarea-item.class';
import { SelectItem } from './components/form/form-item/select-item/select-item.class';
import { CheckboxItem } from './components/form/form-item/checkbox-item/checkbox-item.class';
import { TableItem } from './components/form/form-item/table-item/table-item.class';
import { ControlClass } from './core/controls/web-control.interface';

// 一英寸等于25.4mm dpi (dot per inch)输出分辨率
function getDPI() {
  const arrDPI = [];
  const screen = window.screen as Record<string, any>;
  if (!screen.deviceXDPI) {
    // ie 9
    arrDPI[0] = screen.deviceXDPI;
    arrDPI[1] = screen.deviceYDPI;
  } else {
    // chrome firefox
    const tmpNode = document.createElement('div') as HTMLDivElement;
    tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
    document.body.appendChild(tmpNode);
    arrDPI[0] = tmpNode.offsetWidth;
    arrDPI[1] = tmpNode.offsetHeight;
    tmpNode.parentNode?.removeChild(tmpNode);
  }
  return arrDPI;
}

const dpi = getDPI();
// console.log('dpi is ', dpi);
// console.log('dpr is ', window.devicePixelRatio);

// 单位换算率
export const inch2twipRatio = 1440;
export const inch2cmRatio = 2.54;
export const inch2mmRatio = inch2cmRatio * 10; // 25.4
export const inch2ptRatio = 72;
export const mm2twipRatio = Math.round(inch2twipRatio / inch2mmRatio * 100) / 100; // 56.69
// console.log('mm2twipRation is ', mm2twipRatio);
export const mm2ptRatio = Math.round(inch2ptRatio / inch2mmRatio * 100) / 100; // 2.83
// console.log('mm2ptRatio is ', mm2ptRatio);
// window.devicePixelRatio dpr是设备像素比，dpi是每英寸的点数，不一样的
export const mm2pxRatio = Math.round(dpi[0] / inch2mmRatio * 100) / 100; // 3.78
// console.log('mm2pxRatio is ', mm2pxRatio);

export const pt2twipRatio = inch2twipRatio / inch2ptRatio; // 20
export const pt2pxRatio = Math.round(dpi[0] / inch2ptRatio * 10000) / 10000; // 1.3333
// console.log('pt2pxRatio is ', pt2pxRatio);
export const px2ptRatio = inch2ptRatio / dpi[0]; // 0.75
// console.log('px2ptRatio is ', px2ptRatio);

// 1 twip = 1440 tpi / 96 dpi = 15 pixels
// 默认分辨率(96dpi)下，缇/567=厘米，像素/37.795=厘米

export const EMPTY_OBJECT = Object.seal({});

export const isWindows = /win(dows|32|64)/i.test(navigator.userAgent);
export const isMac = /mac os/i.test(navigator.userAgent);

// 注： 打包后类名会变化
export const ControlItemClassMap = {
  CheckboxItem,
  InputItem,
  RadioItem,
  SelectItem,
  TextareaItem,
  TableItem,
};

// 控件类的映射
export const ControlClassMap: Record<string, ControlClass> = {
  // 将所有的控件类加到map中
  AttachmentControl,
  CheckboxControl,
  DateControl,
  MultilineInputControl,
  NumericalControl,
  RadioControl,
  SelectControl,
  SingleInputControl,
  TextControl,
  TimeControl,
  ConnectionControl,
  TableControl,
};
