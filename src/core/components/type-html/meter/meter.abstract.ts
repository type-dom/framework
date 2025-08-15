import { TypeHtml } from '../type-html.abstract';
import { ITypeMeter, TypeMeterProps } from './meter.interface';

export abstract class TypeMeter extends TypeHtml implements ITypeMeter {
  props: TypeMeterProps;
  dom?: HTMLMeterElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'meter'
    })
  }
}
