import { TypeHtml } from '../type-html.abstract';
import { ITypeStrong, StrongProps } from './strong.interface';

export abstract class TypeStrong<Props extends StrongProps = StrongProps> extends TypeHtml<Props> implements ITypeStrong {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('strong');
  }
}
