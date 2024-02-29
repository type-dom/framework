import type { ITextNode } from '../../../text-node/text-node.interface';
import type { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import type { IInput } from '../input/input.interface';
export interface ILabel extends ITypeHtml {
  nodeName: 'label',
  className: 'Label',
  childNodes: (IInput | ITextNode)[],
}
