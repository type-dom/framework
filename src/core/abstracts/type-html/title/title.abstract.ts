import { TypeHtml } from '../type-html.abstract';
import { ITypeTitle, TitleProps } from './title.interface';

export abstract class TypeTitle<Props extends TitleProps = TitleProps> extends TypeHtml<Props> implements ITypeTitle {
  dom: HTMLTitleElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('title');
  }
}
