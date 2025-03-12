import { TypeHtml } from '../type-html.abstract';
import type { ITypeSection, TypeSectionProps } from './section.interface';

export abstract class TypeSection extends TypeHtml implements ITypeSection {
  props: TypeSectionProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'section'
    })
  }
}
