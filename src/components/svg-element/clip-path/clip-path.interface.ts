import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';

// import { IXmlAttributes } from 'ofd-file/src/abstracts/xml-element/xml-element.interface';
export interface ISvgClipPath extends ITypeSvg {
  nodeName: 'clipPath';
  className: 'SvgClipPath';
  childNodes: ITypeSvg[];
}

