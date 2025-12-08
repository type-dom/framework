import { TypeHtml } from '../type-html.abstract';
import type { ITypeVar, VarProps } from './var.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeVar<Props extends VarProps = VarProps> extends TypeHtml<Props> implements ITypeVar {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'var'
    } as Props));
    this.dom = document.createElement('var');
  }
}
