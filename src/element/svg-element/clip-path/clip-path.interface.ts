import { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
import { IXmlAttributes } from 'ofd-file/src/abstracts/xml-element/xml-element.interface';
export interface ISvgClipPath extends ITypeSvg {
  nodeName: 'clipPath',
  className: 'SvgClipPath',
  childNodes: ITypeSvg[]
}

export interface IClipRule extends IXmlAttributes {
  clipRule: 'nonzero' | 'evenodd' | 'inherit', // Default value	nonzero
}
