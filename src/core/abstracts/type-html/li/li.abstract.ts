import { TypeHtml } from '../type-html.abstract';
import { ITypeLI, LIProps } from './li.interface';

/**
 * 列表项 list item
 */
export abstract class TypeLI<Props extends LIProps = LIProps> extends TypeHtml<Props> implements ITypeLI {
  dom: HTMLLIElement;

  constructor(params: Props = {} as Props) {
    super(params);
    this.dom = document.createElement('li');
  }
}
