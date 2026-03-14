import { TypeHtml } from '../type-html.abstract';
import { ITypeOption, OptionProps } from './option.interface';

export abstract class TypeOption<Props extends OptionProps = OptionProps> extends TypeHtml<Props> implements ITypeOption {
  dom: HTMLOptionElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('option');
  }
}
