import { ITextNode } from '../../../text-node/text-node.interface';
import { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { IInput } from '../input/input.interface';
export interface ILabel extends ITypeHtml {
  nodeName: 'label',
  className: 'Label',
  childNodes: (IInput | ITextNode)[],
}
