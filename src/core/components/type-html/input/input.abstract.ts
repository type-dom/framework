import { InputHTMLAttributes } from '../../../../dom/modules/attribute';
import { ToMaybeRefs } from '../../../../reactivity';
import { TypeHtml } from '../type-html.abstract';
import { ITypeInput, TypeInputProps } from './input.interface';

export abstract class TypeInput<A extends ToMaybeRefs<InputHTMLAttributes> = ToMaybeRefs<InputHTMLAttributes>> extends TypeHtml<HTMLInputElement, A> implements ITypeInput {
  props: TypeInputProps;
  dom?: HTMLInputElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'input'
    })
  }
}
