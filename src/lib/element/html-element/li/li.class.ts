import { TypeElement } from '../../../type-element/type-element.abstract';
import { TypeLI } from '../../../type-element/type-html/li/li.abstract';
import { TextNode } from '../../../text-node/text-node.class';
import { ITypeConfig } from '../../../config.interface';
import type { ILI } from './li.interface';

export class LI extends TypeLI implements ILI {
  className: 'LI';
  declare childNodes: (TypeElement | TextNode)[];

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'LI';
    this.childNodes = [];
    this.propObj = {
      styleObj: { // todo: 应该在具体组件中配置样式
        width: '100px',
        textAlign: 'center',
        padding: '6px 14px',
        borderRadius: '4px 4px 0px 0px',
        borderBottom: 'none',
        boxSizing: 'border-box',
      },
      attrObj: {
        name: 'list-item'
      }
    };
    this.setConfig(config);
  }
}
