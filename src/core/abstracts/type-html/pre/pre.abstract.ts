import { TypeHtml } from '../type-html.abstract';
import { ITypePre, PreProps } from './pre.interface';

export abstract class TypePre<Props extends PreProps = PreProps> extends TypeHtml<Props> implements ITypePre {
  dom: HTMLPreElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('pre');
  }
}
