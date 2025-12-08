import { defaultProps } from '../../../helpers/defaultProps';
import { TypeHtml } from '../type-html.abstract';
import { ITypeI, IProps } from './i.interface';

export abstract class TypeI<Props extends IProps = IProps> extends TypeHtml<Props> implements ITypeI {
  dom: HTMLElement;

  constructor(params: Props = {} as Props) {
    super(defaultProps(params, {
      nodeName: 'i' // todo error ？？？？？
    } as Props));
    this.dom = document.createElement('i');
  }
}
