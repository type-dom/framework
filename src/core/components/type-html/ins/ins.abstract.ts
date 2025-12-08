import { TypeHtml } from '../type-html.abstract';
import { ITypeIns, InsProps } from './ins.interface';

export abstract class TypeIns<Props extends InsProps = InsProps> extends TypeHtml<Props> implements ITypeIns {
  dom: HTMLModElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'ins'
    } as Props);
    this.dom = document.createElement('ins');
  }
}
