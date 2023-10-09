import { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import { ITypeAttribute, ITypeProperty } from '../../../type-element/type-element.interface';
import { IStyle } from '../../../style/style.interface';

/**
 */
export interface ISvgStopAttribute extends ITypeAttribute {
  offset: string, // 0%  100%
  stopColor: string,
}
export interface ISvgStopProperty extends ITypeProperty {
  styleObj: Partial<IStyle>,
  attrObj: ISvgStopAttribute,
}
export interface ISvgStop extends ITypeSvg {
  nodeName: 'stop';
  className: 'SvgStop';
  propObj: ISvgStopProperty;
  childNodes: [];
}
