import { TypeHtml } from '../type-html.abstract';
import { ITypeTemplate, TypeTemplateProps } from './template.interface';

export abstract class TypeTemplate extends TypeHtml implements ITypeTemplate {
  props: TypeTemplateProps;
  dom?: HTMLTemplateElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'template'
    })
  }
}
