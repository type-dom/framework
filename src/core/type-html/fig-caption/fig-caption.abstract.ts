import { TypeHtml } from '../type-html.abstract';
import { ITypeFigCaption, TypeFigCaptionProps } from './fig-caption.interface';

export abstract class TypeFigCaption extends TypeHtml implements ITypeFigCaption {
  props: TypeFigCaptionProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'figcaption'
    })
  }
}
