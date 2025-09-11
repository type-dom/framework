import { TypeDiv } from '../../../../core/components/type-html/div/div.abstract';
import { TypeDivProps } from '../../../../core/components/type-html/div/div.interface';
import {transformSlot} from "../../../../core/helpers/transformSlot";
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  override isBasic = true;

  constructor(params: TypeDivProps = {}) {
    super();
    // console.warn('Div constructor . ');
    this.className = 'Div';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
