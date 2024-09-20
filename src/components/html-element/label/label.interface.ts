import type { ITextNode } from '../../../core/text-node/text-node.interface';
import type { ITypeHtml } from '../../../core/type-html/type-html.interface';
import type { IInput } from '../input/input.interface';

export interface ILabel extends ITypeHtml {
  nodeName: 'label';
  className: 'Label';
  childNodes: (IInput | ITextNode)[];
}
