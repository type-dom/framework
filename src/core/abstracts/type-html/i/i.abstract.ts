import { TypeHtml } from '../type-html.abstract';
import { ITypeI, IProps } from './i.interface';

export abstract class TypeI<Props extends IProps = IProps> extends TypeHtml<Props> implements ITypeI {
  dom: HTMLElement;

  constructor(params: Props = {} as Props) {
    super(params);
    this.dom = document.createElement('i');
  }
}
