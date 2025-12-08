import { InputHTMLAttributes } from '../../../../dom/modules/attribute';
import { ToMaybeRefs } from '../../../../reactivity';
import { TypeHtml } from '../type-html.abstract';
import { ITypeInput, InputProps } from './input.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeInput<Props extends InputProps = InputProps, A extends ToMaybeRefs<InputHTMLAttributes> = ToMaybeRefs<InputHTMLAttributes>>
  extends TypeHtml<Props, A, HTMLInputElement> implements ITypeInput {
  dom: HTMLInputElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'input'
    } as Props));
    this.dom = document.createElement('input');
  }
}
