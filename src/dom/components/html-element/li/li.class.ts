import { TypeLI } from '../../../../core/components/type-html/li/li.abstract';
import { LIProps } from '../../../../core/components/type-html/li/li.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ILI } from './li.interface';

export class LI extends TypeLI implements ILI {
  className: 'LI';
  // override childNodes: (TypeElement | TextNode)[];

  override isBasic = true;

  constructor(params: LIProps = {}) {
    super(params);
    this.className = 'LI';
    // this.childNodes = [];
    // this.style.addObj({
    //   // todo: 应该在具体组件中配置样式
    //   width: '100px',
    //   textAlign: 'center',
    //   padding: '6px 14px',
    //   borderRadius: '4px 4px 0px 0px',
    //   borderBottom: 'none',
    //   boxSizing: 'border-box',
    // });
    // addAttrName(this, 'list-item');
    // console.warn('then transformSlot . ');
    transformSlot(this, params.slot);
  }
}
