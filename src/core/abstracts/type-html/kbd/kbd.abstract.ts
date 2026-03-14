import { TypeHtml } from '../type-html.abstract';
import { ITypeKbd, KbdProps } from './kbd.interface';

export abstract class TypeKbd<Props extends KbdProps = KbdProps> extends TypeHtml<Props> implements ITypeKbd {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('kbd');
  }
}
