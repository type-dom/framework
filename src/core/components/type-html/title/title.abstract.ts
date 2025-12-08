import { TypeHtml } from '../type-html.abstract';
import { ITypeTitle, TitleProps } from './title.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeTitle<Props extends TitleProps = TitleProps> extends TypeHtml<Props> implements ITypeTitle {
  dom: HTMLTitleElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'title'
    } as Props));
    this.dom = document.createElement('title');
  }
}
