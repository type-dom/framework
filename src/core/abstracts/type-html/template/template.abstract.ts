import { TypeHtml } from '../type-html.abstract';
import { ITypeTemplate, TemplateProps } from './template.interface';

export abstract class TypeTemplate<Props extends TemplateProps = TemplateProps> extends TypeHtml<Props> implements ITypeTemplate {
  dom: HTMLTemplateElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('template');
  }
}
