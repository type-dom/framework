import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';
import { ITypeAttribute } from '../../../core/attribute/attribute.interface';


// import { IXmlAttributes } from 'ofd-file/src/abstracts/xml-element/xml-element.interface';
export interface ISvgClipPath extends ITypeSvg {
  nodeName: 'clipPath';
  className: 'SvgClipPath';
  childNodes: ITypeSvg[];
}

export interface IClipRule extends ITypeAttribute {
  clipRule: 'nonzero' | 'evenodd' | 'inherit'; // Default value nonzero
}
