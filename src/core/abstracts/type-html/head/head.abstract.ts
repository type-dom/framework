import { unref } from '../../../../reactivity/ref';
import { TypeHtml } from '../type-html.abstract';
import { ITypeHead, HeadProps } from './head.interface';

export abstract class TypeHead<Props extends HeadProps = HeadProps> extends TypeHtml<Props> implements ITypeHead {
  dom: HTMLHeadingElement;
  // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  constructor(params: Props = {} as Props ) {
    super(params);
    this.dom = document.createElement(unref(params.tag) ?? 'h1') as HTMLHeadingElement;
  }
}
