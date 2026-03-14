import { TypeHtml } from '../type-html.abstract';
import { ITypeMain, MainProps } from './main.interface';

export abstract class TypeMain<Props extends MainProps = MainProps> extends TypeHtml<Props> implements ITypeMain {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('main');
  }
}
