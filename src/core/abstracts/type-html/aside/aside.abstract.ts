import { TypeHtml } from '../type-html.abstract';
import { ITypeAside, AsideProps } from './aside.interface';

export abstract class TypeAside<Props extends AsideProps = AsideProps> extends TypeHtml<Props> implements ITypeAside {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('aside');
  }
}
