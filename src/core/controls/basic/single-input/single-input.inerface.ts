import { ITypeDiv } from '../../../../../type-dom/type-element/type-html/div/div.interface';
import { InputItem } from '../../../../components/form/form-item/input-item/input-item.class';

export interface ISingleInputControl extends ITypeDiv {
  nodeName: 'div',
  className: 'SingleInputControl',
  childNodes: InputItem[],
}
