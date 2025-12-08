import { defaultProps } from '../../../helpers/defaultProps';
import { TypeHtml } from '../type-html.abstract';
import { ITypeS, SProps } from './s.interface';

export abstract class TypeS<Props extends SProps = SProps> extends TypeHtml<Props> implements ITypeS {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 's'
    } as Props));
    this.dom = document.createElement('s');
  }
}
